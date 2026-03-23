import { createContext, useCallback, useContext, useState, useEffect, useMemo, useRef } from "react";
import { format } from "date-fns";
import CallLogApi from "../apis/CallLogApiController";
import { useAuth } from "../contexts/AuthContext";
import { useSocketEvent } from "../hooks/useSocketListener";

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
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const refreshCallLogs = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setCallLog([]);
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
        source: "client",
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
        const data = await CallLogApi.addFeedback({
          callLogId: callId,
          feedback,
          ratingByCustomer,
          contactMe,
          createdBy: user?.id,
        });
        setrefreshList((prev) => !prev);
        return data;
      } catch (error) { }
    },
    [user]
  );

  useSocketEvent("AddCall", (data) => {
    if (data?.company !== user?.companycode) return;
    setHasNewUpdate(true);
  });

  useSocketEvent("AcceptCall", (data) => {
    if (data?.company !== user?.companycode) return;
    setHasNewUpdate(true);
  });

  useSocketEvent("ForwardedCall", (data) => {
    if (data?.company !== user?.companycode) return;
    setHasNewUpdate(true);
  });



  const contextValue = useMemo(
    () => ({
      callLog,
      setCallLog,
      addCall,
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
      hasNewUpdate
    }),
    [callLog, masterData, isFetching, hasMore, filters,
      hasNewUpdate,     // ✅ REQUIRED
      refreshCallLogs,  // ✅ also good practice
      setHasNewUpdate
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
