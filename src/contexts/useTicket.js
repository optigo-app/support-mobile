import React, { useState, useCallback, useContext, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import TicketApi from "../apis/TicketApiController";
import { useSocketEvent } from "../hooks/useSocketListener";

export const TicketContext = React.createContext();

const PAGE_SIZE = 15;


export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);
  const [TicketMaster, setTicketMaster] = useState(null);
  const [refreshComment, setRefreshComment] = useState(false);
  const [hasNewUpdate, setHasNewUpdate] = useState(false);

  // Filter & Pagination States
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    statusId: "",
    Filter: "",
    StartDate: "",
    EndDate: "",
    ApiStatus: "",
  });

  // Loading State
  const [isFetching, setIsFetching] = useState(false);

  // Refs
  const pageRequestRef = useRef(false);
  const abortControllerRef = useRef(null);

  const CalllogMaster = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("MOBILE_TICKET_MASTER_DATA")) || null;
    } catch {
      return null;
    }
  })();

  const APPNAME_LIST = TicketMaster?.rd?.map((val) => ({ value: val?.AppId, label: val?.AppName })) || [];
  const COMPANY_LIST = TicketMaster?.rd1?.map((val) => ({ value: val?.id, label: val?.companyname })) || [];
  const CATEGORY_LIST = TicketMaster?.rd2?.map((val) => ({ value: val?.CateId, label: val?.categoryname })) || [];
  const STATUS_LIST = TicketMaster?.rd3?.map((val) => ({ value: val?.StatusID, label: val?.Name })) || [];
  const PRIORITY_LIST = TicketMaster?.rd4?.map((val) => ({ value: val?.PriorityID, label: val?.Name })) || [];
  const USERNAME_LIST = CalllogMaster?.employees?.map((val) => ({ value: val?.userid, label: val?.user })) || [];

  const updateFilters = (updates) => {
    setIsFetching(true);
    setTickets([]);
    setPage(1);
    setHasMore(true);
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const ResetFilters = () => {
    window.scrollTo({
      top:0 ,
      behavior:'smooth'
    })
    setFilters({
      search: "",
      statusId: "",
      Filter: "",
      StartDate: "",
      EndDate: "",
    });
    setPage(1);
    setHasMore(true);
    setTickets([]);
  };





  const loadMore = () => {
    if (pageRequestRef.current) return;
    if (isFetching || !hasMore) return;

    pageRequestRef.current = true;
    setPage((p) => p + 1);
  };

  useEffect(() => {
    const GetMasterData = async () => {
      try {
        const master = await TicketApi.getMasterData();
        sessionStorage.setItem("MOBILE_TICKET_MASTER_DATA", JSON.stringify(master));
        setTicketMaster(master);
      } catch (err) {
        console.error("Error fetching master data:", err.message);
      }
    };

    if (!sessionStorage.getItem("MOBILE_TICKET_MASTER_DATA")) {
      GetMasterData();
    } else {
      setTicketMaster(JSON?.parse(sessionStorage.getItem("MOBILE_TICKET_MASTER_DATA")));
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchTicketList = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;

      try {
        setIsFetching(true);
        setLoading(true);
        const response = await TicketApi.getTicketsList({
          statusId: filters?.statusId,
          filter: filters?.Filter,
          startDate: filters?.StartDate,
          endDate: filters?.EndDate,
          searchTerm: filters?.search,
          page: page,
          pagesize: PAGE_SIZE,
          ApiStatus: filters?.ApiStatus,
        });
        console.log(filters, "filters");
        const list = response?.rd || [];
        if (!response?.rd) {
          setError(response?.msg);
          return;
        }

        setTickets((prev) => {
          if (page === 1) return list;
          const existingIds = new Set(prev.map((item) => item.TicketId));
          const uniqueNewItems = list.filter((item) => !existingIds.has(item.TicketId));
          return [...prev, ...uniqueNewItems];
        });
        setHasMore(list.length === PAGE_SIZE);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
        setError(error);
      } finally {
        if (!newAbortController.signal.aborted) {
          setIsFetching(false);
          pageRequestRef.current = false;
        }
        setLoading(false);
      }
    };

    fetchTicketList();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page, filters, user]);

  // Api Done ✅
  const addTicket = useCallback(
    async (ticketData) => {
      try {
        const res = await TicketApi.createTicket({
          createdBy: ticketData?.createdby,
          appId: ticketData?.appname,
          cateId: ticketData?.category,
          custId: ticketData?.custId,
          description: ticketData?.instruction, //
          projectId: ticketData?.projectCode, //
          subject: ticketData?.subject, //
          filePath: ticketData?.attachment !== null ? ticketData?.attachment : "",
          callLogId: ticketData?.CallId || "",
          CorpId: ticketData?.CorpId,
        });
        ResetFilters();
        return res;
      } catch (error) {
        console.log("Error adding ticket:", error);
      }
    },
    [tickets, setTickets]
  );

  // Api Done ✅
  const updateTicket = useCallback(
    async (TicketId, updatedFields) => {
      setLoading(true);
      try {
        const res = await TicketApi.updateTicket({
          ticketNo: TicketId,
          statusId: updatedFields?.Status,
          appId: updatedFields?.appname,
          cateId: updatedFields?.category,
          priorityId: updatedFields?.Priority,
          followUp1: updatedFields?.FollowUp,
          keywords: updatedFields?.tags,
          sendEmail: updatedFields?.sendMail === true ? 1 : 0,
          promiseDate: updatedFields?.PromiseDate,
          createdBy: user?.custid,
          suggested: updatedFields?.suggested,
          star: updatedFields?.Star,
          mainSubject: updatedFields?.MainSubject,
        });
        console.log("Ticket Added in Suggested List successfully!");
      } catch (error) {
        console.log("Error updating ticket:", error);
      }
    },
    [tickets, setTickets]
  );

  // Api Done ✅
  const AddComment = useCallback(
    async (commentData) => {
      try {
        const res = await TicketApi.addComment({
          createdBy: commentData?.customerId,
          comment: commentData?.message ?? "",
          filePath: commentData?.attachment?.preview !== null ? commentData?.attachment?.preview : "https://jeremyqho.com/static/3/bug-process.jpeg",
          callLogId: commentData?.CallId || "",
          isOfficeUseOnly: 0,
          ticketNo: commentData?.TicketNo,
          Role: commentData?.Role,
          CorpId: commentData?.UserId,
        });
        console.log(res, "Comment added successfully!");
        if (res?.rd1[0]) {
          const latest = res.rd1[0];
          setSelectedTicket(prev => ({
            ...prev,
            comments: latest.comments   // update only comments
          }));
        }
        ResetFilters();
      } catch (error) {
        console.log("Error adding comment:", error);
      }
    },
    [tickets, setTickets, selectedTicket]
  );

  // Api Done ✅
  const CloseTicket = useCallback(
    async (TicketNo, openTicket) => {
      try {
        const res = await TicketApi.closeTicket({
          createdBy: user?.custid,
          ticketNo: TicketNo,
          reopen: openTicket,
          CorpId: user?.id,
        });
        const status = res.rd[0]?.stat_msg === "The ticket has been closed successfully.";
        if (res?.rd1[0]) {
          const latest = res.rd1[0];
          setSelectedTicket(prev => ({
            ...prev,
            Status: latest.Status,  // update only comments
            TicketCloseTime: latest?.TicketCloseTime,
            UpdatedAt: latest?.UpdatedAt
          }));
        }
        ResetFilters();
        return status;
      } catch (error) {
        console.log("Error adding comment:", error);
      }
    },
    [tickets, setTickets, selectedTicket]
  );

  const handleRefresh = () => {
    setRefreshComment(!refresh);
  };

  const AddFeedBackTicket = useCallback(
    async (TicketId, RatingValue, RatingDescription) => {
      try {
        const res = await TicketApi.AddFeedBack({
          TicketId,
          RatingValue,
          RatingDescription,
          RatingBy: user?.fullName,
        });

        const data = res?.rd[0]?.stat_msg;
        ResetFilters();
        return data === "Record save successfully.";
      } catch (error) {
        console.log("Error adding feed back:", error);
      }
    },
    [tickets, setTickets, selectedTicket]
  );

  useSocketEvent("CreateTicket", (data) => {
    setHasNewUpdate(true);
  });

  useSocketEvent("TicketComment", (data) => {
    setHasNewUpdate(true);
  });

  useSocketEvent("CloseTicket", (data) => {
    setHasNewUpdate(true);
  });

  useSocketEvent("UpdateTicket", (data) => {
    setHasNewUpdate(true);
  });


  // // 🔹 SOCKET EVENT HANDLERS  ✅
  // useSocketEvent("CreateTicket", (data) => {
  // 	notify(data, "CREATE_TICKET");
  // 	setTickets((prev) => {
  // 		const exists = prev.some((t) => t.TicketNo === data.TicketNo);
  // 		if (exists) return prev;
  // 		return [data, ...prev];
  // 	});
  // });

  // useSocketEvent("TicketComment", (data) => {
  // 	notify(data, "TICKET_COMMENT");
  // 	setTickets((prev) =>
  // 		prev.map((t) =>
  // 			t.TicketNo === data?.TicketNo
  // 				? { ...t, ...data }
  // 				: t
  // 		)
  // 	);
  // 	setSelectedTicket((prev) => {
  // 		if (prev?.TicketNo === data?.TicketNo) {
  // 			return { ...prev, ...data };
  // 		}
  // 		return prev;
  // 	});
  // 	setRefreshComment((prev) => !prev);
  // });


  // useSocketEvent("CloseTicket", (data) => {
  // 	notify(data, "CLOSE_TICKET", user);

  // 	setTickets((prev) =>
  // 		prev.map((t) =>
  // 			t.TicketNo === data.TicketNo
  // 				? { ...t, ...data }
  // 				: t
  // 		)
  // 	);
  // 	setSelectedTicket((prev) => {
  // 		if (prev?.TicketNo === data?.TicketNo) {
  // 			return { ...prev, ...data };
  // 		}
  // 		return prev;
  // 	});
  // });


  // useSocketEvent("UpdateTicket", (data) => {
  // 	notify(data, "UPDATE_TICKET", user);
  // 	setTickets((prev) => {
  // 		const idx = prev.findIndex((t) => t?.TicketNo === data?.TicketNo);
  // 		if (idx === -1) return [data, ...prev];
  // 		const updated = [...prev];
  // 		updated[idx] = { ...prev[idx], ...data };
  // 		const [ticket] = updated.splice(idx, 1);
  // 		return [ticket, ...updated];
  // 	});
  // 	setSelectedTicket((prev) => {
  // 		if (prev?.TicketNo === data?.TicketNo) {
  // 			return { ...prev, ...data };
  // 		}
  // 		return prev;
  // 	});
  // 	setRefreshComment((prev) => !prev);
  // });


  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        updateTicket,
        selectedTicket,
        setSelectedTicket,
        TicketMaster,
        APPNAME_LIST,
        COMPANY_LIST,
        CATEGORY_LIST,
        STATUS_LIST,
        PRIORITY_LIST,
        USERNAME_LIST,
        AddComment,
        CloseTicket,
        loading,
        refreshComment,
        handleRefresh,
        AddFeedBackTicket,
        setRefresh,
        loadMore,
        hasMore,
        filters,
        updateFilters,
        isFetching,
        refreshTickets: ResetFilters,
        setHasNewUpdate
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
};
