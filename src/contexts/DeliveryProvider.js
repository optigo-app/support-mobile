import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import DeliveryAPI from "../apis/DeliveryController";
import { useAuth } from "../contexts/AuthContext";

const DeliveryContext = createContext(null);

export const DeliveryProvider = ({ children }) => {
  const [deliveryData, setDeliveryData] = useState([]);
  const [masterData, setMasterData] = useState(() => {
    const stored = sessionStorage.getItem("SUPPORT_MOBILE_DELIVERY_MASTER_DATA");
    return stored ? JSON.parse(stored) : { customer: null, employees: null };
  });

  const { user } = useAuth();
  
  // Filter & Pagination States
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    statusId: "",
    Filter: "",
    StartDate: "",
    EndDate: "",
    ApprovedStatus: "",
  });

  // Loading State
  const [isFetching, setIsFetching] = useState(false);

  // Refs
  const pageRequestRef = useRef(false);
  const abortControllerRef = useRef(null);

  // Constants
  const PAGE_SIZE = 15;

  const COMPANY_MASTER_LIST =
    masterData?.customer?.map((item) => ({
      label: item?.CustomerCode,
      value: item.Id,
      ...item,
    })) || [];

  const EMPLOYEE_LIST = masterData?.employees?.map((item) => ({
    label: item?.user,
    value: item?.userid,
    DesignationId: item?.DesignaitonId,
    UserId: item?.userid,
    User: item?.user,
    Designation: item?.designation,
  }));

  const EMPLOYEE_GROUP_BY_DESIGNATION = EMPLOYEE_LIST && Object?.groupBy(EMPLOYEE_LIST, ({ Designation }) => Designation);

  const updateFilters = (updates) => {
    setIsFetching(true);
    setDeliveryData([]);
    setPage(1);
    setHasMore(true);
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    const GetMasterData = async () => {
      try {
        const [master, employees] = await Promise.all([DeliveryAPI.getCustomerMaster(), DeliveryAPI.getEmployeeList()]);
        const data = { customer: master?.Data?.rd || [], employees: employees?.Data?.rd || [] };
        setMasterData(data);
        sessionStorage.setItem("SUPPORT_MOBILE_DELIVERY_MASTER_DATA", JSON.stringify(data));
      } catch (err) {
        console.error("Error SUPPORT_MOBILE_DELIVERY_MASTER_DATA -->>> ", err.message);
      }
    };
    if (!sessionStorage.getItem("SUPPORT_MOBILE_DELIVERY_MASTER_DATA")) {
      GetMasterData();
    }
  }, []);

  useEffect(() => {
    const fetchDeliveryData = async () => {
      if (!user) return;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;
      try {
        setIsFetching(true);
        const response = await DeliveryAPI.getDeliveryList({
          Page: page,
          PageSize: PAGE_SIZE,
          ApprovedStatus: filters.ApprovedStatus,
          Status: filters.statusId,
          StartDate: filters.StartDate,
          EndDate: filters.EndDate,
          SearchTerm: filters.search,
        });
        const list = response?.Data?.rd || [];
        setDeliveryData((prev) => {
          if (page === 1) return list;
          const existingIds = new Set(prev.map((item) => item?.SrNo));
          const uniqueNewItems = list.filter((item) => !existingIds.has(item?.SrNo));

          return [...prev, ...uniqueNewItems];
        });

        setHasMore(list.length === PAGE_SIZE);
      } catch (error) {
        console.log(error);
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
    fetchDeliveryData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page, filters, user]);

  const loadMore = () => {
    if (pageRequestRef.current) return;
    if (isFetching || !hasMore) return;

    pageRequestRef.current = true;
    setPage((p) => p + 1);
  };

  const AddFeedBack = async (SrNo, RatingValue, RatingDescription) => {
    try {
      const res = await DeliveryAPI.CreateCustomerRating({
        SrNo: SrNo,
        RatingValue,
        RatingDescription,
        RatingBy: user?.firstname + " " + user?.lastname,
        CorpId: user?.id,
      });
      console.log(res, "FeedBack added successfully!");
    } catch (error) {
      console.log("Error adding feed back:", error);
    }
  };

  const props = {
    deliveryData,
    COMPANY_MASTER_LIST,
    EMPLOYEE_LIST,
    EMPLOYEE_GROUP_BY_DESIGNATION,
    AddFeedBack,
    loadMore,
    hasMore,
    filters,
    updateFilters,
    isFetching, // This is now reliable
  };

  return <DeliveryContext.Provider value={props}>{children}</DeliveryContext.Provider>;
};

export const useDelivery = () => useContext(DeliveryContext);
