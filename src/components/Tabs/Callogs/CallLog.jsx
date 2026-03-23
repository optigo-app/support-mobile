import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Box, Typography, Avatar, Chip, ListItemButton, List, CircularProgress } from "@mui/material";
import { CallReceivedRounded, CallMadeRounded } from "@mui/icons-material";
import { EmailScrollArea } from "../../ui/ScrollArea";
import FilterDrawer from "../../ui/TicketFilterDrawer";
import GmailStyleHeader from "../../ui/Header"; // Ensure path is correct
import CallLogDetailPage from "./Details";
import { CALL_LOG_FILTER_DEFINITIONS } from "../../../utils/FiltersOptions";
import { useDynamicFilters } from "../../../hooks/useDynamicFilters";
import { useCallLog } from "../../../contexts/UseCallLog";
import { formatToISTAmPm, todayDate, yesterdayDate, thisMonthStart, thisMonthEnd, thisWeekStart, thisWeekEnd } from "../../../utils/dateFormatter";
import { getStatusColor, COLORS } from "../../../utils/Filtering";
import { FullPageRating } from "../../ui/RatingModal";
import EmptyLogsState from "../../ui/Fallback";
import NewUpdatePopup from '../../ui/NewUpdatePopover'

const CALL_TYPE_STYLES = {
  "": { bg: "#EFF6FF", color: "#3B82F6", icon: <CallReceivedRounded /> },
  client: { bg: "#F0FDF4", color: "#22C55E", icon: <CallMadeRounded /> },
};

const CallLogsApp = () => {
  const { callLog, addFeedback, loadMore, hasMore, isFetching, updateFilters, filters,
    hasNewUpdate, refreshCallLogs, setHasNewUpdate
  } = useCallLog();

  const [searchQuery, setSearchQuery] = useState("");
  const [anchorElSort, setAnchorElSort] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const scrollRef = useRef(null);

  const { filterDefinitions, selectedFilters, totalFilters, toggleFilter, clearAllFilters } = useDynamicFilters(CALL_LOG_FILTER_DEFINITIONS);
  const isFirstRender = useRef(true);

  const options = useMemo(
    () => [
      { label: "all", Filter: "", StartDate: "", EndDate: "" },
      { label: "Solved", Filter: "", StartDate: "", EndDate: "", value: 5 },
      { label: "Ticket Generated", Filter: "", StartDate: "", EndDate: "", value: 3 },
      { label: "Pending", Filter: "", StartDate: "", EndDate: "", value: 44 },
      { label: "Running", Filter: "", StartDate: "", EndDate: "", value: 45 },
      { label: "today", Filter: "date", StartDate: todayDate, EndDate: todayDate },
      { label: "yesterday", Filter: "date", StartDate: yesterdayDate, EndDate: yesterdayDate },
      { label: "month", Filter: "date", StartDate: thisMonthStart, EndDate: thisMonthEnd },
      { label: "week", Filter: "date", StartDate: thisWeekStart, EndDate: thisWeekEnd },
    ],
    []
  );

  const activeFilterLabel = useMemo(() => {
    const match = options.find((opt) => {
      const isDateMatch = opt.Filter === filters.Filter && opt.StartDate === filters.StartDate && opt.EndDate === filters.EndDate;
      const isStatusMatch = opt.value ? filters.statusId == opt.value : !filters.statusId;

      return isDateMatch && isStatusMatch;
    });

    return match ? match.label : "custom";
  }, [filters, options]);

  const visibleLogs = callLog;

  const loadMoreLogs = useCallback(() => {
    if (!hasMore || isFetching) return;
    loadMore();
  }, [hasMore, isFetching, loadMore]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    const handleScroll = () => {
      const isNearBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 200;
      if (isNearBottom && hasMore && !isFetching) {
        loadMoreLogs();
      }
    };
    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [loadMoreLogs, hasMore, isFetching]);

  // Search Debounce
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

  const handleHeaderFilterChange = (selectedOption) => {
    const clickedLabel = selectedOption.label;

    const targetState = {
      Filter: selectedOption.Filter || "",
      StartDate: selectedOption.StartDate || "",
      EndDate: selectedOption.EndDate || "",
      statusId: selectedOption.value || "",
    };

    const isCurrentlyActive =
      filters.Filter === targetState.Filter &&
      filters.StartDate === targetState.StartDate &&
      filters.EndDate === targetState.EndDate &&
      // Loose equality to handle API returning strings vs numbers
      (targetState.statusId ? filters.statusId == targetState.statusId : !filters.statusId);

    if (clickedLabel === "all" || isCurrentlyActive) {
      updateFilters({
        Filter: "",
        StartDate: "",
        EndDate: "",
        statusId: "", // ✅ Clear statusId
      });
    } else {
      updateFilters(targetState);
    }
  };

  const handleOpenDrawer = (log) => {
    setSelectedLog(log);
    setOpen(true);
  };
  const handleCloseDrawer = () => {
    setOpen(false);
    setSelectedLog(null);
  };

  const HandleRatingSubmit = async (id, feedback, rating) => {
    try {
      const res = await addFeedback(id, feedback, rating);
      if (res?.rd?.[0]?.stat_msg === "The rating has been updated successfully.") {
        setIsRatingModalOpen(false);
        handleCloseDrawer();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", overflow: "hidden", bgcolor: "#fff", height: "100%" }}>
      {/* 5. Pass controlled props to Header */}
      <GmailStyleHeader FilteringOptions={options}
        onFilterChange={handleHeaderFilterChange}
        activeFilter={activeFilterLabel}
        searchQuery={searchQuery}
        onSearch={(e) => setSearchQuery(e.target.value)}
        anchorElSort={anchorElSort} setAnchorElSort={setAnchorElSort}
        title="Call Logs" />

      <NewUpdatePopup
        Title={'Call'}
        hasNewUpdate={hasNewUpdate} refreshCallLogs={refreshCallLogs} setHasNewUpdate={setHasNewUpdate}
      />
      <EmailScrollArea ref={scrollRef}>
        {visibleLogs?.length === 0 && !isFetching ? (
          <EmptyLogsState />
        ) : (
          <List disablePadding>
            {visibleLogs?.map((log) => {
              const typeStyle = CALL_TYPE_STYLES[log?.topicRaisedBy] || CALL_TYPE_STYLES?.client;
              return (
                <ListItemButton
                  key={log.sr}
                  onClick={() => handleOpenDrawer(log)}
                  sx={{
                    py: 1.3,
                    px: 1.3,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.8,
                    borderBottom: `1px solid ${COLORS?.border}`,
                    transition: "0.2s",
                    bgcolor: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.03)" },
                  }}
                >
                  <Avatar sx={{ width: 40, height: 40, bgcolor: typeStyle.bg, color: typeStyle.color, mt: 0.4 }}>{React.cloneElement(typeStyle.icon, { fontSize: "small" })}</Avatar>
                  <Box sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.2 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: COLORS?.subtitle, noWrap: true }}>{log?.description || "No Description"}</Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: COLORS?.textSecondary }}>{formatToISTAmPm(log?.time)}</Typography>
                    </Box>
                    <Typography sx={{ fontSize: "0.80rem", color: COLORS?.textSecondary, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", mb: 0.5 }}>{log?.appname || "No AppName"}</Typography>
                    {log?.Estatus && <Chip label={log?.Estatus} size="small" sx={{ height: 20, fontSize: "0.70rem", fontWeight: 600, bgcolor: getStatusColor(log?.Estatus).bg, color: getStatusColor(log?.Estatus).color }} />}
                    {log?.callBy && (
                      <Chip
                        label={log?.callBy}
                        size="small"
                        avatar={
                          <Avatar sx={{ width: 18, height: 18, fontSize: "0.6rem", bgcolor: '#EC4899', color: '#fff' }}>
                            {log?.callBy?.charAt(0)?.toUpperCase()}
                          </Avatar>
                        }
                        sx={{
                          height: 22,
                          fontSize: "0.70rem",
                          fontWeight: 600,
                          bgcolor: '#f3f3f3',
                          color: '#666',
                          border: '1px solid #e8e8e8',
                          "& .MuiChip-avatar": {
                            width: 18,
                            height: 18,
                            marginLeft: "2px",
                            color: '#fff',
                          },
                          "& .MuiChip-label": {
                            paddingLeft: "6px",
                          },
                        }}
                      />
                    )}
                  </Box>
                </ListItemButton>
              );
            })}
            {isFetching && (
              <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <CircularProgress size={24} />
              </Box>
            )}
            {!hasMore && visibleLogs?.length > 0 && (
              <Box sx={{ p: 2, textAlign: "center", color: COLORS?.textSecondary }}>
                <Typography variant="caption">All logs loaded ({visibleLogs?.length})</Typography>
              </Box>
            )}
          </List>
        )}
      </EmailScrollArea>

      <FilterDrawer onClose={() => setAnchorElSort(false)} open={anchorElSort} title="Filter Logs" filterDefinitions={filterDefinitions} selectedFilters={selectedFilters} onToggleFilter={toggleFilter} onClearAll={clearAllFilters} totalFilters={totalFilters} onApply={() => setAnchorElSort(false)} />

      <CallLogDetailPage onCloseRatingOpen={setIsRatingModalOpen} open={open} onClose={handleCloseDrawer} onBack={handleCloseDrawer} logData={selectedLog} />
      <FullPageRating open={isRatingModalOpen} onClose={() => setIsRatingModalOpen(false)} onConfirm={() => setIsRatingModalOpen(false)} onSubmit={HandleRatingSubmit} Call={true} />
    </Box>
  );
};

export default CallLogsApp;
