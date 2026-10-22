import { createContext, useCallback, useContext, useState, useEffect, useMemo, useRef } from "react";
import CallLogApi from "../apis/CallLogApiController";
import { useAuth } from "./AuthContext";

const DashboardContext = createContext(null);

export function DashboardProvider(props) {
  const { user } = useAuth();
  const [DashboardAnalytics, setDashboardAnalytics] = useState(() => {
    try {
      const stored = sessionStorage.getItem("MOBILE_DASHBOARD_ANALYTICS");
      return stored ? JSON.parse(stored) : {};
    } catch (_) {
      return {};
    }
  });
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem("MOBILE_DASHBOARD_ANALYTICS");
    } catch (_) {
      return true;
    }
  });

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;
    try {
      const res = await CallLogApi.getDashboardData();
      const list = res?.rd?.[0];
      if (list) {
        setDashboardAnalytics(list);
        sessionStorage.setItem("MOBILE_DASHBOARD_ANALYTICS", JSON.stringify(list));
      }
    } catch (error) {
      console.log("🚀 ~ fetchDashboardData ~ error:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const contextValue = useMemo(
    () => ({
      DashboardAnalytics: DashboardAnalytics || {},
      loading,
      refreshDashboard: fetchDashboardData,
    }),
    [DashboardAnalytics, loading, fetchDashboardData]
  );

  return <DashboardContext.Provider value={contextValue}>{props.children}</DashboardContext.Provider>;
}

export function useDashboard() {
  if (!useContext(DashboardContext)) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return useContext(DashboardContext);
}
