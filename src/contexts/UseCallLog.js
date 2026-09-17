import { createContext, useCallback, useContext, useState, useEffect, useMemo, useRef } from "react";
import { format } from "date-fns";
import CallLogApi from "../apis/CallLogApiController";
import { useAuth } from "../contexts/AuthContext";
import { useSocketEvent } from "../hooks/useSocketListener";
import { commentUpdates$ } from "../rxjs/commentEvents";

const isValidCommentPayload = (data) => {
  if (!data || typeof data !== "object") return false;
  const callId = data.CallLogId ?? data.sr ?? data.callLogId;
  if (!callId || isNaN(Number(callId)) || Number(callId) <= 0) return false;
  if (data.Comments === undefined && data.comment === undefined && data.text === undefined) return false;
  return true;
};

const appendCommentToCall = (callRecord, commentPayload) => {
  if (!callRecord) return callRecord;
  const rawCommentText =
    commentPayload.Comments ?? commentPayload.comment ?? commentPayload.text ?? "";

  const isClient =
    commentPayload.IsClient === 1 ||
    commentPayload.isClient === 1 ||
    commentPayload.isClient === true ||
    commentPayload.IsClient === "1"
      ? 1
      : 0;

  const commentItem = {
    id: commentPayload.id || Date.now(),
    text: rawCommentText,
    comment: rawCommentText,
    time: commentPayload.CreatedDate || commentPayload.time || new Date().toISOString(),
    Name: commentPayload.Name || commentPayload.CreatedByName || (isClient ? "Client" : "Support User"),
    CreatedBy: commentPayload.CreatedBy,
    IsClient: isClient,
    isClient: isClient,
    img: commentPayload.FilePath || commentPayload.img || "",
    FilePath: commentPayload.FilePath || commentPayload.img || "",
  };

  let existing = [];
  if (typeof callRecord.comment === "string") {
    try {
      existing = JSON.parse(callRecord.comment);
    } catch (_) {
      existing = [];
    }
  } else if (Array.isArray(callRecord.comment)) {
    existing = [...callRecord.comment];
  }

  const exists = existing.some((c) => {
    if (commentItem.id && c.id && String(c.id) === String(commentItem.id)) {
      return true;
    }
    const cText = (c.text || c.comment || "").trim();
    const newText = commentItem.text.trim();
    const cFile = (c.FilePath || c.img || "").trim();
    const newFile = (commentItem.FilePath || commentItem.img || "").trim();
    if (cText === newText && cFile === newFile) {
      return true;
    }
    return false;
  });

  if (!exists) {
    existing.push(commentItem);
  }

  return {
    ...callRecord,
    comment: JSON.stringify(existing),
    comments: existing,
  };
};

const CallLogContext = createContext(null);

export function CallLogProvider(props) {
  const { user } = useAuth();
  console.log(user, "user")

  // Data States
  const [callLog, setCallLog] = useState([]);
  const [masterData, setMasterData] = useState(() => {
    const stored = sessionStorage.getItem("MOBILE_MASTER_DATA");
    return stored ? JSON.parse(stored) : { master: null, employees: null };
  });

  // Filter & Pagination States
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({ search: "", statusId: "", Filter: "", StartDate: "", EndDate: "" });
  const [hasNewUpdate, setHasNewUpdate] = useState(false);

  // Loading State
  const [isFetching, setIsFetching] = useState(false);

  // Refs
  const pageRequestRef = useRef(false);
  const abortControllerRef = useRef(null);

  // Constants
  const PAGE_SIZE = 15;

  // Master Data Derivations (kept same as your code)
  const EMPLOYEE_LIST = masterData?.employees || [];
  const COMPANY_LIST = masterData?.master?.rd || [];
  const APPNAME_LIST = masterData?.master?.rd1 || [];
  const STATUS_LIST = masterData?.master?.rd2?.map((val) => ({ value: val?.StatusID, label: val?.Name })) || [];
  const PRIORITY_LIST = masterData?.master?.rd3?.map((val) => ({ value: val?.PriorityID, label: val?.Name })) || [];
  const ESTATUS_LIST = masterData?.master?.rd6?.map((val) => ({ value: val?.StatusID, label: val?.Name })) || [];
  const COMPANY_INFO_MASTER = masterData?.master?.rd7 || [];
  const INTERNAL_STATUS_LIST = "INTERNAL_STATUS";
  const INTERNAL_ESTATUS_LIST = "INTERNAL_ESTATUS";

  const companyOptions = COMPANY_LIST.map((option) => ({ label: option?.ProjectCode, value: option?.ProjectID })) || [];
  const departmentsNames = (EMPLOYEE_LIST && Object.groupBy?.(EMPLOYEE_LIST, (emp) => emp?.designation)) || {};
  const forwardOption = Object.entries(departmentsNames).flatMap(([designation, people]) => people.map((emp) => ({ designation, person: emp?.user, id: `${emp?.DesignaitonId},${emp?.userid}` })));

  const [refreshList, setrefreshList] = useState(false);

  const updateFilters = (updates) => {
    setIsFetching(true);
    setCallLog([]);
    setPage(1);
    setHasMore(true);
    setTotalCount(0); // Reset count immediately so stale total doesn't show during filter
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const refreshCallLogs = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setCallLog([]);
    setTotalCount(0);
    setPage(1);
    setHasMore(true);
    setHasNewUpdate(false);
    setrefreshList((prev) => !prev);
  }, []);


  // ✅ 2. MASTER DATA EFFECT
  useEffect(() => {
    const GetMasterData = async () => {
      try {
        const [master, employees] = await Promise.all([CallLogApi.getMasterData(), CallLogApi.getEmployeeMasterD()]);
        const data = { master, employees: employees?.rd };
        setMasterData(data);
        sessionStorage.setItem("MOBILE_MASTER_DATA", JSON.stringify(data));
      } catch (err) {
        console.error("Error fetching master data:", err.message);
      }
    };
    if (!sessionStorage.getItem("MOBILE_MASTER_DATA")) {
      GetMasterData();
    }
  }, []);

  // ✅ 3. ROBUST FETCHING LOGIC
  useEffect(() => {
    const fetchLogs = async () => {
      if (!user) return;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;

      try {
        setIsFetching(true);

        const data = await CallLogApi.getCallLogs({
          page,
          pageSize: PAGE_SIZE,
          searchTerm: filters.search,
          statusId: filters.statusId,
          signal: newAbortController.signal,
          filter: filters.Filter,
          startDate: filters.StartDate,
          endDate: filters.EndDate,
        });

        const list = data?.rd || [];
        const rawTotal = data?.rd1?.[0] ? Object.values(data.rd1[0])[0] : (data?.rd?.length || 0);
        const total = typeof rawTotal === "number" ? rawTotal : (parseInt(rawTotal, 10) || 0);
        setTotalCount(total);

        setCallLog((prev) => {
          if (page === 1) return list;
          const existingIds = new Set(prev.map((item) => item.sr));
          const uniqueNewItems = list.filter((item) => !existingIds.has(item.sr));

          return [...prev, ...uniqueNewItems];
        });

        setHasMore(list.length === PAGE_SIZE);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
      } finally {
        if (!newAbortController.signal.aborted) {
          setIsFetching(false);
          pageRequestRef.current = false;
        }
      }
    };

    fetchLogs();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page, filters, user, refreshList]);

  const loadMore = () => {
    if (pageRequestRef.current) return;
    if (isFetching || !hasMore) return;

    pageRequestRef.current = true;
    setPage((p) => p + 1);
  };

  // ... (addCall and addFeedback remain the same) ...
  const addCall = useCallback(async (call) => {
    try {
      const data = await CallLogApi.addCall({
        appID: call?.appId || "",
        customerName: call?.customerName || "",
        description: call?.description || "",
        entryDate: call?.date || "",
        projectID: call?.companyName || "",
        CorpId: call?.CorpId || "",
        source: "OptigoCarely",
        filePath: call?.filePath || "",
        comments: call?.comments || "",
        isClient: 1,
      });
      setrefreshList((prev) => !prev);
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addFeedback = useCallback(
    async (callId, feedback, ratingByCustomer, contactMe) => {
      try {
        const cleanCallId = typeof callId === "boolean" ? null : callId;
        const data = await CallLogApi.addFeedback({
          callLogId: cleanCallId,
          feedback,
          ratingByCustomer,
          contactMe,
          createdBy: user?.id,
        });
        setrefreshList((prev) => !prev);
        return data;
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    },
    [user]
  );

  const addComment = useCallback(
    async (callId, comment, filePath) => {
      try {
        const data = await CallLogApi.addCallComments(
          callId,
          comment,
          filePath,
          user?.id
        );
        const updatedRecord = data?.rd?.[0] || data?.rd1?.[0] || data?.Data?.rd?.[0];
        if (updatedRecord) {
          setCallLog((prev) =>
            prev.map((item) =>
              String(item.sr) === String(callId)
                ? { ...item, ...updatedRecord }
                : item
            )
          );
        }
        setrefreshList((prev) => !prev);
        return data;
      } catch (error) {
        console.error("Error adding comment to call log:", error);
        throw error;
      }
    },
    [user?.id]
  );

  console.log(user, "call")

  useSocketEvent("AddCall", (data) => {
    console.log(data, "data")
    if (data?.company === user?.company) {
      setHasNewUpdate(true);
      setrefreshList((prev) => !prev);
    } else {
      return;
    }
  });

    // RxJS subscription for smooth real-time comment updates
  useEffect(() => {
    const sub = commentUpdates$.subscribe((commentData) => {
      if (!isValidCommentPayload(commentData)) return;
      const callId = commentData.CallLogId ?? commentData.sr ?? commentData.callLogId;

      setCallLog((prev) => {
        if (!Array.isArray(prev)) return prev;
        const exists = prev.some(
          (c) => String(c?.sr) === String(callId) || String(c?.id) === String(callId)
        );
        if (!exists) return prev;
        return prev.map((c) =>
          String(c?.sr) === String(callId) || String(c?.id) === String(callId)
            ? { ...appendCommentToCall(c, commentData), hasNewComment: true }
            : c
        );
      });
    });

    return () => sub.unsubscribe();
  }, []);

  useSocketEvent("ADDCOMMENTS", (data) => {
    console.log("ADDCOMMENTS event received in support-mobile:", data);
    if (!isValidCommentPayload(data)) return;
    commentUpdates$.next(data);
  });

  // useSocketEvent("CallComment", (data) => {
  //   console.log("CallComment event received in support-mobile:", data);
  //   setrefreshList((prev) => !prev);
  // });

  useSocketEvent("AcceptCall", (data) => {
    console.log("AcceptCall event received:", data);
    const targetId = data?.sr || data?.CallLogid || data?.id;
    if (targetId) {
      setCallLog((prev) =>
        prev.map((c) =>
          String(c?.sr) === String(targetId)
            ? { ...c, ...data, receivedBy: data?.receivedBy || data?.AssignedEmpName || c?.receivedBy }
            : c
        )
      );
    }
    setHasNewUpdate(true);
    setrefreshList((prev) => !prev);
  });

  useSocketEvent("StartCall", (data) => {
    console.log("StartCall event received:", data);
    const targetId = data?.sr || data?.CallLogid || data?.id;
    if (targetId) {
      setCallLog((prev) =>
        prev.map((c) =>
          String(c?.sr) === String(targetId)
            ? {
                ...c,
                ...data,
                callStart: data?.callStart || new Date().toISOString(),
                Estatus: "Running",
                status: "In Progress",
              }
            : c
        )
      );
    }
    setHasNewUpdate(true);
    setrefreshList((prev) => !prev);
  });

  useSocketEvent("CALLSTART", (data) => {
    console.log("CALLSTART event received:", data);
    setrefreshList((prev) => !prev);
  });

  useSocketEvent("ForwardedCall", (data) => {
    console.log("ForwardedCall event received:", data);
    if (data?.company === user?.company) {
      setHasNewUpdate(true);
      setrefreshList((prev) => !prev);
    }
  });


  useSocketEvent("EndCall", (data) => {
    console.log("EndCall event received:", data);
    const targetId = data?.sr || data?.CallLogid || data?.id;
    if (targetId) {
      setCallLog((prev) =>
        prev.map((c) =>
          String(c?.sr) === String(targetId)
            ? {
                ...c,
                ...data,
                callClosed: data?.callClosed || new Date().toISOString(),
                Estatus: "Completed",
                status: "Solved",
              }
            : c
        )
      );
    }
    setHasNewUpdate(true);
    setrefreshList((prev) => !prev);
  });

  useSocketEvent("CALLEND", (data) => {
    console.log("CALLEND event received:", data);
    setrefreshList((prev) => !prev);
  });



  const clearCallUnread = useCallback((callId) => {
    if (!callId) return;
    setCallLog((prev) =>
      prev.map((c) =>
        String(c.sr) === String(callId) || String(c.id) === String(callId)
          ? { ...c, hasNewComment: false }
          : c
      )
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      callLog,
      setCallLog,
      addCall,
      addComment,
      masterData,
      EMPLOYEE_LIST,
      COMPANY_LIST,
      APPNAME_LIST,
      companyOptions,
      departmentsNames,
      forwardOption,
      STATUS_LIST,
      ESTATUS_LIST,
      PRIORITY_LIST,
      INTERNAL_STATUS_LIST,
      INTERNAL_ESTATUS_LIST,
      COMPANY_INFO_MASTER,
      addFeedback,
      loadMore,
      hasMore,
      filters,
      updateFilters,
      isFetching, // This is now reliable
      refreshCallLogs,
      hasNewUpdate,
      totalCount,
      clearCallUnread,
      commentUpdates$
    }),
    [callLog, masterData, isFetching, hasMore, filters,
      hasNewUpdate,     // ✅ REQUIRED
      refreshCallLogs,  // ✅ also good practice
      setHasNewUpdate,
      addComment,
      totalCount,
      clearCallUnread
    ]
  );

  return <CallLogContext.Provider value={contextValue}>{props.children}</CallLogContext.Provider>;
}

export function useCallLog() {
  if (!useContext(CallLogContext)) {
    throw new Error("useCallLog must be used within a CallLogProvider");
  }
  return useContext(CallLogContext);
}
