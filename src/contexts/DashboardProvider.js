import { createContext, useCallback, useContext, useState, useEffect, useMemo, useRef } from "react";
import CallLogApi from "../apis/CallLogApiController";

const DashboardContext = createContext(null);

export function DashboardProvider(props) {
  const [DashboardAnalytics, setDashboardAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await CallLogApi.getDashboardData();
        const list =  res?.rd[0];
        setDashboardAnalytics(list);
      } catch (error) {
        console.log("🚀 ~ fetchLogs ~ error:", error);
      } finally {
        console.log("finally");
      setLoading(false)
      }
    };

    fetchLogs();
  }, []);

  const contextValue = useMemo(
    () => ({
      DashboardAnalytics,
      loading
    }),
    [DashboardAnalytics]
  );

  return <DashboardContext.Provider value={contextValue}>{props.children}</DashboardContext.Provider>;
}

export function useDashboard() {
  if (!useContext(DashboardContext)) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return useContext(DashboardContext);
}
