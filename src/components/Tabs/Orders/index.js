import React, { useState, useMemo, useRef, useEffect, useCallback } from "react"; // ADDED useEffect
import { Box, Typography, Avatar, Chip, ListItemButton, List, CircularProgress } from "@mui/material"; // ADDED CircularProgress
import { LocalShippingRounded, Inventory2Rounded, CancelRounded, CheckCircleRounded, CreditCardRounded, AttachMoneyRounded } from "@mui/icons-material";
import { EmailScrollArea } from "../../ui/ScrollArea";
import TicketFilterDrawer from "../../ui/TicketFilterDrawer";
import GmailStyleHeader from "../../ui/Header";
import { ORDER_FILTER_DEFINITIONS } from "../../../utils/FiltersOptions";
import { useDynamicFilters } from "../../../hooks/useDynamicFilters";
import { useDelivery } from "../../../contexts/DeliveryProvider";
import { formatRobustDate, todayDate, yesterdayDate, thisMonthStart, thisMonthEnd, thisWeekStart, thisWeekEnd } from "../../../utils/dateFormatter";
import OrderDetailPage from "./detail";
import { FullPageRating } from "../../ui/RatingModal";

const COLORS = {
  textPrimary: "#1A1A1A",
  textSecondary: "#6B7280",
  successBg: "rgba(58, 248, 126, 0.08)",
  successText: "#0f8c3a",
  processBg: "rgba(74, 102, 255, 0.08)",
  processText: "#4A66FF",
  warnBg: "rgba(255, 167, 38, 0.1)",
  warnText: "#F57C00",
  errorBg: "#FFEBEE",
  errorText: "#D32F2F",
  neutralBg: "rgba(0, 0, 0, 0.06)",
  neutralText: "#555",
  border: "rgba(0,0,0,0.06)",
};

function getAvatarGradient(id) {
  const gradients = ["linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", "linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)", "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)", "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)", "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)"];
  const index = parseInt(id, 10) % gradients?.length;
  return gradients[index];
}

function getStatusStyle(status) {
  switch (status) {
    case "Delivered":
      return { bg: COLORS.successBg, color: COLORS.successText, icon: <CheckCircleRounded sx={{ fontSize: 14 }} /> };
    case "Shipped":
      return { bg: COLORS.processBg, color: COLORS.processText, icon: <LocalShippingRounded sx={{ fontSize: 14 }} /> };
    case "Processing":
      return { bg: COLORS.warnBg, color: COLORS.warnText, icon: <Inventory2Rounded sx={{ fontSize: 14 }} /> };
    case "Cancelled":
      return { bg: COLORS.errorBg, color: COLORS.errorText, icon: <CancelRounded sx={{ fontSize: 14 }} /> };
    default:
      return { bg: COLORS.neutralBg, color: COLORS.neutralText, icon: <Inventory2Rounded sx={{ fontSize: 14 }} /> };
  }
}

const OrderDashboardApp = () => {
  const { deliveryData, loadMore, hasMore, isFetching, updateFilters, filters ,AddFeedBack } = useDelivery();
  const { filterDefinitions, selectedFilters, totalFilters, toggleFilter, clearAllFilters } = useDynamicFilters(ORDER_FILTER_DEFINITIONS);
  const [searchQuery, setSearchQuery] = useState("");

  const [anchorElSort, setAnchorElSort] = useState(false);
  const scrollRef = React.useRef(null);
  const isFirstRender = React.useRef(true);
  const [open, setOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const options = useMemo(
    () => [
      { label: "all", Filter: "", StartDate: "", EndDate: "" },

      // Status Filters (Filter is empty string, treated as Main Status)
      { label: "Delivered", Filter: "", StartDate: "", EndDate: "", value: "Delivered" },
      { label: "Pending", Filter: "", StartDate: "", EndDate: "", value: "Pending" },
      { label: "Running", Filter: "", StartDate: "", EndDate: "", value: "Running" },

      // Date Filters
      { label: "today", Filter: "date", StartDate: todayDate, EndDate: todayDate },
      { label: "yesterday", Filter: "date", StartDate: yesterdayDate, EndDate: yesterdayDate },
      { label: "month", Filter: "date", StartDate: thisMonthStart, EndDate: thisMonthEnd },
      { label: "week", Filter: "date", StartDate: thisWeekStart, EndDate: thisWeekEnd },

      // Approval Status Filters (Changed Filter from 'trainingType' to 'approvalStatus')
      { label: "Approval Pending", Filter: "approvalStatus", StartDate: "", EndDate: "", value: "Pending" },
      { label: "Approved", Filter: "approvalStatus", StartDate: "", EndDate: "", value: "Approved" },
      { label: "Rejected", Filter: "approvalStatus", StartDate: "", EndDate: "", value: "Rejected" },
    ],
    []
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      updateFilters({ search: searchQuery });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);


  const visibleLogs = deliveryData;

  // --- INFINITE SCROLL IMPLEMENTATION ---
  const loadMoreOrders = useCallback(() => {
    if (!hasMore || isFetching) return;
    loadMore();
  }, [hasMore, isFetching, loadMore]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    const handleScroll = () => {
      const isNearBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 200;
      if (isNearBottom && hasMore && !isFetching) {
        loadMoreOrders();
      }
    };
    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [loadMoreOrders, hasMore, isFetching]);


  const activeFilterLabel = useMemo(() => {
    const match = options.find((opt) => {

      // 1. Date Match
      if (opt.Filter === "date") {
        return (
          filters.StartDate === opt.StartDate &&
          filters.EndDate === opt.EndDate
        );
      }

      // 2. Approval Status Match
      if (opt.Filter === "approvalStatus") {
        return filters.ApprovedStatus === opt.value;
      }

      // 3. Main Status Match (Value exists, but no Filter key)
      if (opt.value && !opt.Filter) {
        return filters.Status === opt.value || filters.statusId === opt.value;
      }

      // 4. "All" Match
      if (opt.label === "all") {
        return (
          !filters.ApprovedStatus &&
          !filters.Status &&
          !filters.statusId &&
          !filters.StartDate
        );
      }

      return false;
    });

    return match ? match.label : "custom";
  }, [filters, options]);

  const handleHeaderFilterChange = (selectedOption) => {
    const { value, Filter, StartDate, EndDate, label } = selectedOption;

    // 1. Reset all filter keys to empty
    const targetState = {
      StartDate: StartDate || "",
      EndDate: EndDate || "",
      Filter: Filter === "date" ? "date" : "",
      Status: "",        // Main Order Status
      statusId: "",      // Helper for UI/API if needed
      ApprovedStatus: "" // Specific for Approval Logic
    };

    // 2. Assign values based on the specific Filter type
    if (label === "all") {
      // Do nothing, everything is already reset
    }
    else if (Filter === "approvalStatus") {
      targetState.ApprovedStatus = value;
    }
    else if (value && !Filter) {
      targetState.Status = value;
      targetState.statusId = value;
    }
    updateFilters(targetState);
  };

  const handleOpenDrawer = (log) => {
    setSelectedLog(log);
    setOpen(true);
  };
  
  const handleCloseDrawer = () => {
    setOpen(false);
    setSelectedLog(null);
  };

  const HandleRatingSubmit = async (id,rating,remark) => {
   try {
      const res = await AddFeedBack(
        id,
        rating,
        remark
      );
      if (res) {
        setIsRatingModalOpen(false);
      } else {
        setIsRatingModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          bgcolor: "#f0f2f5",
          height: "100%",
        }}
      >
        <GmailStyleHeader
          FilteringOptions={options}
          onFilterChange={handleHeaderFilterChange}
          activeFilter={activeFilterLabel}
          anchorElSort={anchorElSort}
          setAnchorElSort={setAnchorElSort}
          searchQuery={searchQuery}
          onSearch={(e) => setSearchQuery(e.target.value)}
          title="Search Orders" />

        <EmailScrollArea ref={scrollRef}>
          {visibleLogs?.length === 0 && !isFetching ? (
            <Box sx={{ p: 5, textAlign: "center", color: COLORS.textSecondary }}>
              <Typography variant="h6">No orders found</Typography>
              <Typography variant="body2">Clear search or adjust filters</Typography>
            </Box>
          ) : (
            <List disablePadding>
              {visibleLogs?.map((order, i) => {
                const statusStyle = getStatusStyle(order?.status);
                const date = formatRobustDate(order?.Date);
                return (
                  <React.Fragment key={order?.id}>
                    <ListItemButton
                      onClick={() => handleOpenDrawer(order)}
                      sx={{
                        py: 1.3,
                        px: 1.3,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.8,
                        borderBottom: `1px solid ${COLORS.border}`,
                        transition: "0.2s",
                        bgcolor: "#fff",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.03)" },
                      }}
                    >
                      {/* LEFT AVATAR (Fixed) */}
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          mt: 0.4,
                          flexShrink: 0,
                          background: getAvatarGradient(order?.SrNo),
                          color: "#fff",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          lineHeight: 1,
                          fontSize: '0.96rem'
                        }}
                      >
                        {order?.SrNo}
                      </Avatar>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.93rem",
                              color: COLORS.textPrimary,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              pr: 1,
                            }}
                          >
                            {order?.TopicType}
                          </Typography>

                          <Typography
                            sx={{
                              color: COLORS.textSecondary,
                              fontSize: "0.75rem",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {date?.smart}
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.92rem",
                            color: COLORS.textPrimary,
                            mt: 0.1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            textTransform: "capitalize",
                          }}
                        >
                          {order?.Topic}
                        </Typography>
                        {/* ROW 2: Item List Description */}
                        <Typography
                          sx={{
                            fontSize: "0.80rem",
                            color: COLORS.textSecondary,
                            mt: 0.3,
                            lineHeight: 1.35,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {order?.Description}
                        </Typography>

                        {/* ROW 3: Price + Payment Chip + Status Chip */}
                        <Box
                          sx={{
                            mt: 0.6,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          {/* Payment Status */}
                          {!!order?.PaymentStatus && <Chip
                            size="small"
                            label={order?.PaymentStatus}
                            icon={order?.PaymentStatus === "Paid" ? <CheckCircleRounded /> : <CreditCardRounded />}
                            sx={{
                              height: 20,
                              fontSize: "0.65rem",
                              fontWeight: 600,
                              borderRadius: 2,
                              bgcolor: order?.PaymentStatus === "Paid" ? "rgba(52,199,89,0.15)" : "rgba(0,0,0,0.06)",
                              color: order?.PaymentStatus === "Paid" ? "#1e7a3c" : "#666",
                              "& .MuiChip-icon": {
                                fontSize: 12,
                                ml: "3px",
                                color: "inherit",
                              },
                            }}
                          />}

                          {/* Order Status Chip */}
                          {!!order?.Status && <Chip
                            icon={statusStyle.icon}
                            label={order?.Status}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              borderRadius: 25,
                              bgcolor: statusStyle.bg,
                              color: statusStyle.color,
                              "& .MuiChip-icon": {
                                fontSize: 13,
                                ml: "3px",
                                color: statusStyle.color,
                              },
                            }}
                          />}
                        </Box>
                      </Box>
                    </ListItemButton>
                  </React.Fragment>
                );
              })}
              {isFetching && (
                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                  <CircularProgress size={24} sx={{ color: "#007AFF" }} />
                </Box>
              )}
              {!hasMore && visibleLogs?.length > 0 && (
                <Box sx={{ p: 2, textAlign: "center", color: COLORS.textSecondary }}>
                  <Typography variant="caption">All orders loaded ({visibleLogs?.length})</Typography>
                </Box>
              )}
            </List>
          )}
        </EmailScrollArea>
        <TicketFilterDrawer onClose={() => setAnchorElSort(false)} open={anchorElSort} title="Filter Orders" filterDefinitions={filterDefinitions} selectedFilters={selectedFilters} onToggleFilter={toggleFilter} onClearAll={clearAllFilters} totalFilters={totalFilters} onApply={() => setAnchorElSort(false)} />
        <OrderDetailPage
          onCloseRatingOpen={setIsRatingModalOpen}
          open={open} onClose={handleCloseDrawer}
          logData={selectedLog}
        />
        <FullPageRating
         open={isRatingModalOpen}
          onClose={() => setIsRatingModalOpen(null)} onConfirm={() => setIsRatingModalOpen(null)}
          title={"Order No " + selectedLog?.OrderNo}
          onSubmit={HandleRatingSubmit}
        />

      </Box>
    </>
  );
};

export default OrderDashboardApp;
