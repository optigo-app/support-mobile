import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import TrainingAPI from "../apis/TrainingController";
import { useAuth } from "../contexts/AuthContext";

const TrainingContext = createContext();

export const TrainingProvider = ({ children }) => {
    const [Traininglist, setTraininglist] = useState([]);
    const [masterData, setMasterData] = useState(() => {
        const stored = sessionStorage.getItem("SUPPORT_MOBILE_TRAINING_MASTER");
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
        TrainingType: "",
        TrainingMode: ""
    });

    // Loading State
    const [isFetching, setIsFetching] = useState(false);

    // Refs
    const pageRequestRef = useRef(false);
    const abortControllerRef = useRef(null);

    // Constants
    const PAGE_SIZE = 15;




    const COMPANY_MASTER_LIST =
        masterData.customer?.map((item) => ({
            label: item?.CustomerCode,
            value: item.Id,
            ...item,
        })) || [];
    const EMPLOYEE_LIST = masterData.employees?.map((item) => ({
        label: item?.user,
        value: item?.userid,
        ...item,
    }));

    useEffect(() => {
        const GetMasterData = async () => {
            try {
                const [master, employees] = await Promise.all([TrainingAPI.getCustomerMaster(), TrainingAPI.getEmployeeList()]);
                const data = { customer: master?.Data?.rd || [], employees: employees?.Data?.rd || [] };
                setMasterData(data);
                sessionStorage.setItem("SUPPORT_MOBILE_TRAINING_MASTER", JSON.stringify(data));
            } catch (err) {
                console.error("Error fetching master data:", err.message);
            }
        };
        if (!sessionStorage.getItem("SUPPORT_MOBILE_TRAINING_MASTER")) {
            GetMasterData();
        }
    }, []);

    const updateFilters = (updates) => {
        setIsFetching(true);
        setTraininglist([]);
        setPage(1);
        setHasMore(true);
        setFilters((prev) => ({ ...prev, ...updates }));
    };

    const refreshTrainingData = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        setTraininglist([]);
        setPage(1);
        setHasMore(true);
    }, []);


    useEffect(() => {
        const fetchTraining = async () => {
            if (!user) return;
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const newAbortController = new AbortController();
            abortControllerRef.current = newAbortController;

            try {
                setIsFetching(true);

                const response = await TrainingAPI.listTrainings({
                    Page: page,
                    PageSize: PAGE_SIZE,
                    EndDate: filters.EndDate,
                    StartDate: filters.StartDate,
                    SearchTerm: filters.search,
                    TrainingMode: filters?.TrainingMode,
                    Status: filters?.statusId,
                    TrainingType: filters?.TrainingType
                });
                const list = response.Data.rd || [];
                setTraininglist(
                    (prev) => {
                        if (page === 1) return list;
                        const existingIds = new Set(prev.map((item) => item?.SessionID));
                        const uniqueNewItems = list.filter((item) => !existingIds.has(item?.SessionID));

                        return [...prev, ...uniqueNewItems];
                    }
                );
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
        fetchTraining();

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

    const AddFeedBack = async ({ rating, comment, id }) => {
        try {
            const res = await TrainingAPI.AddRating({
                Rating: rating,
                RatingDesc: comment,
                RatingBy: user?.id,
                SessionID: id,
            });
            const data = res?.Data?.rd[0]?.stat_msg;
            updateFilters();
            return data === "Rating added successfully.";
        } catch (error) {
            console.log("Error adding rating:", error);
        }
    };

    const value = {
        Traininglist,
        COMPANY_MASTER_LIST,
        EMPLOYEE_LIST,
        AddFeedBack,
        loadMore,
        hasMore,
        filters,
        updateFilters,
        isFetching,
        refreshTrainingData,
    };

    return <TrainingContext.Provider value={value}>{children}</TrainingContext.Provider>;
};

export const useTraining = () => useContext(TrainingContext);
