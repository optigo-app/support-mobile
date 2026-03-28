import React, { useState, useMemo, useRef, useEffect, useCallback } from "react"; // ADDED useEffect
import { Box, Typography, Avatar, Chip, ListItemButton, List, Stack, CircularProgress } from "@mui/material"; // ADDED CircularProgress
import { SchoolRounded, TimerRounded, AssignmentTurnedInRounded, PendingActionsRounded } from "@mui/icons-material";

import { EmailScrollArea } from "../../ui/ScrollArea";
import TicketFilterDrawer from "../../ui/TicketFilterDrawer";
import GmailStyleHeader from "../../ui/Header";
import TrainingDetailsDrawer from "./details";
import { TRAINING_FILTER_DEFINITIONS } from "../../../utils/FiltersOptions";
import { useDynamicFilters } from "../../../hooks/useDynamicFilters";
import { useTraining } from "../../../contexts/TrainingProvider";
import { todayDate, yesterdayDate, thisMonthStart, thisMonthEnd, thisWeekStart, thisWeekEnd, formatRobustDate } from "../../../utils/dateFormatter";
import { FullPageRating } from "./../../ui/RatingModal";

const COLORS = {
  successBg: "rgba(58, 248, 126, 0.08)",
  successText: "#0f8c3a",
  pendingBg: "rgba(74, 102, 255, 0.08)",
  pendingText: "#4A66FF",
  warningBg: "rgba(255, 153, 102, 0.08)",
  warningText: "#FF9966",
  neutralBg: "rgba(0, 0, 0, 0.06)",
  neutralText: "#555",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  border: "rgba(0,0,0,0.06)",
  subtitle: "#494949ff",
};

function getAvatarGradient(name) {
  const gradients = ["linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)", "linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)", "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)"];
  const index = name ? name.length % gradients.length : 0;
  return gradients[index];
}

function getStatusStyle(status) {
  const normalized = status?.toLowerCase() || "";
  if (normalized === "completed") {
    return { bg: COLORS.successBg, color: COLORS.successText, icon: <AssignmentTurnedInRounded sx={{ fontSize: 12 }} /> };
  } else if (normalized === "pending" || normalized === "in progress") {
    return { bg: COLORS.pendingBg, color: COLORS.pendingText, icon: <PendingActionsRounded sx={{ fontSize: 12 }} /> };
  } else if (normalized === "overdue") {
    return { bg: COLORS.warningBg, color: COLORS.warningText, icon: <TimerRounded sx={{ fontSize: 12 }} /> };
  }
  return { bg: COLORS.neutralBg, color: COLORS.neutralText, icon: <SchoolRounded sx={{ fontSize: 12 }} /> };
}

const TrainingLogsApp = () => {
  const { filterDefinitions, selectedFilters, totalFilters, toggleFilter, clearAllFilters } = useDynamicFilters(TRAINING_FILTER_DEFINITIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(null);

  const [anchorElSort, setAnchorElSort] = useState(false);
  const [open, setOpen] = useState(false);
  const [trainingData, setTrainingData] = useState(null);

  const scrollRef = useRef(null);
  const isFirstRender = useRef(true);

  const { AddFeedBack, Traininglist, loadMore, hasMore, filters, updateFilters, isFetching, refreshTrainingData } = useTraining();

  const options = useMemo(
    () => [
      { label: "all", Filter: "", StartDate: "", EndDate: "" },

      // Status Filters (Filter is empty string)
      { label: "Completed", Filter: "", StartDate: "", EndDate: "", value: "Completed" },
      { label: "Pending", Filter: "", StartDate: "", EndDate: "", value: "Pending" },
      { label: "Cancelled", Filter: "", StartDate: "", EndDate: "", value: "Cancelled" },

      // Date Filters
      { label: "today", Filter: "date", StartDate: todayDate, EndDate: todayDate },
      { label: "yesterday", Filter: "date", StartDate: yesterdayDate, EndDate: yesterdayDate },
      { label: "month", Filter: "date", StartDate: thisMonthStart, EndDate: thisMonthEnd },
      { label: "week", Filter: "date", StartDate: thisWeekStart, EndDate: thisWeekEnd },

      // Training Type Filters
      { label: "Ignite", Filter: "trainingType", StartDate: "", EndDate: "", value: "Ignite" },
      { label: "Re Training", Filter: "trainingType", StartDate: "", EndDate: "", value: "Re Training" },
      { label: "New", Filter: "trainingType", StartDate: "", EndDate: "", value: "New" },

      // Training Mode Filters
      { label: "Online", Filter: "trainingMode", StartDate: "", EndDate: "", value: "Online" },
      { label: "Offline", Filter: "trainingMode", StartDate: "", EndDate: "", value: "Offline" },
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

  const visibleLogs = Traininglist;

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

  const handleOpenDrawer = (log) => {
    setTrainingData(log);
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
    setTrainingData(null);
  };

  const HandleRatingSubmit = async (trainingId, rating, remark) => {
    try {
      const res = await AddFeedBack({
        id: trainingId,
        comment: remark,
        rating: rating,
      });
      if (res) {
        setIsRatingModalOpen(null);
        setOpen(false);
        setTrainingData(null);
      }
    } catch (error) {
      console.log("🚀 ~ HandleRatingSubmit ~ error:", error);
    }
  };

  const activeFilterLabel = useMemo(() => {
    const match = options.find((opt) => {
      if (opt.Filter === "date") {
        return (
          filters.StartDate === opt.StartDate &&
          filters.EndDate === opt.EndDate
        );
      }
      if (opt.Filter === "trainingType") {
        return filters.TrainingType === opt.value;
      }
      if (opt.Filter === "trainingMode") {
        return filters.TrainingMode === opt.value;
      }
      if (opt.value && !opt.Filter) {
        return filters.Status === opt.value || filters.statusId === opt.value;
      }
      if (opt.label === "all") {
        return (
          !filters.TrainingType &&
          !filters.TrainingMode &&
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
    const targetState = {
      StartDate: StartDate || "",
      EndDate: EndDate || "",
      Filter: Filter === "date" ? "date" : "",
      Status: "",
      TrainingType: "",
      TrainingMode: "",
      statusId: "",
    };

    if (label === "all") {
    } else if (Filter === "trainingType") {
      targetState.TrainingType = value;
    } else if (Filter === "trainingMode") {
      targetState.TrainingMode = value;
    } else if (value && !Filter) {
      targetState.Status = value;
      targetState.statusId = value;
    }
    updateFilters(targetState);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", overflow: "hidden", bgcolor: "#f0f2f5", height: "100%" }}>
      <GmailStyleHeader
        FilteringOptions={options}
        onFilterChange={handleHeaderFilterChange}
        activeFilter={activeFilterLabel}
        anchorElSort={anchorElSort}
        setAnchorElSort={setAnchorElSort}
        searchQuery={searchQuery}
        onSearch={(e) => setSearchQuery(e.target.value)}
        title="My Training"
        count={visibleLogs?.length}
        onRefresh={refreshTrainingData}
        isRefreshing={isFetching}
      />

      <EmailScrollArea ref={scrollRef}>
        {visibleLogs?.length === 0 && !isFetching ? (
          <Box sx={{ p: 5, textAlign: "center", color: COLORS.textSecondary }}>
            <Typography variant="body2">No training records found</Typography>
          </Box>
        ) : (
          <List disablePadding>
            {visibleLogs?.map((log) => {
              const statusStyle = getStatusStyle(log?.Status);
              const formatted = formatRobustDate(log?.EntryDate);

              return (
                <React.Fragment key={log?.SessionID}>
                  <ListItemButton
                    onClick={() => handleOpenDrawer(log)}
                    sx={{
                      py: 1.3,
                      px: 1.7,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.8,
                      borderBottom: "1px solid rgba(0,0,0,0.05)",
                      bgcolor: "#fff",
                      transition: "0.25s",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.03)" },
                    }}
                  >
                    {/* LEFT: Avatar */}
                    <Avatar
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        fontWeight: 700,
                        fontSize: "1rem",
                        background: getAvatarGradient(log?.TrainingBy),
                        color: "#fff",
                        mt: 0.4,
                        flexShrink: 0,
                      }}
                    >
                      {log?.TrainingBy ? log.TrainingBy.charAt(0).toUpperCase() : "T"}
                    </Avatar>

                    {/* RIGHT CONTENT  */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      {/* -------------------------------- */}
                      {/* ROW 1: TrainingBy — Time */}
                      {/* -------------------------------- */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: "0.82rem", sm: "0.88rem" },
                            color: COLORS.subtitle,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            pr: 1,
                            textTransform: "capitalize",
                          }}
                        >
                          {log?.TrainingBy}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            color: COLORS.textSecondary,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatted?.smart} {/* Used DurationTime here, assuming it's the right-side metric */}
                        </Typography>
                      </Box>

                      {/* -------------------------------- */}
                      {/* ROW 2: Title */}
                      {/* -------------------------------- */}
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.92rem",
                          color: COLORS.textPrimary,
                          mt: 0.1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {log?.Title}
                      </Typography>
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
                          padding: "0 !important",

                          "& *": {
                            all: "unset",
                            whiteSpace: "normal",
                            display: "inline",
                          },
                        }}
                        dangerouslySetInnerHTML={{ __html: log?.Details }}
                      />

                      {/* -------------------------------- */}
                      {/* ROW 3: TrainingType + Status + TicketNo */}
                      {/* -------------------------------- */}
                      <Stack
                        flexDirection={"row"}
                        gap={1}
                        flexWrap={"wrap"}
                        sx={{
                          fontSize: "0.80rem",
                          color: COLORS.textSecondary,
                          mt: 0.3,
                          lineHeight: 1.35,
                        }}
                      >
                        {log.TrainingType && (
                          <Chip
                            size="small"
                            label={log.TrainingType}
                            sx={{
                              height: 20,
                              fontSize: "0.70rem",
                              fontWeight: 600,
                              borderRadius: 25,
                            }}
                          />
                        )}
                        {log.Status && (
                          <Chip
                            size="small"
                            label={log.Status}
                            sx={{
                              height: 20,
                              fontSize: "0.70rem",
                              fontWeight: 600,
                              bgcolor: statusStyle.bg,
                              color: statusStyle.color,
                              borderRadius: "6px",
                              px: 1,
                            }}
                          />
                        )}
                        {log.TicketNo && (
                          <Chip
                            size="small"
                            label={log.TicketNo}
                            sx={{
                              height: 20,
                              fontSize: "0.70rem",
                              fontWeight: 600,
                              borderRadius: 25,
                              mr: 1,
                              border: "1px solid #dadce0",
                              bgcolor: "#eef0f3",
                              color: "#333",
                            }}
                          />
                        )}
                      </Stack>
                    </Box>
                  </ListItemButton>
                </React.Fragment>
              );
            })}

            {/* INFINITE SCROLL LOADER (iPhone-style subtle spinner) */}
            {isFetching && (
              <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <CircularProgress size={24} sx={{ color: "#007AFF" }} />
              </Box>
            )}

            {/* End of list message */}
            {!hasMore && visibleLogs?.length > 0 && (
              <Box sx={{ p: 2, textAlign: "center", color: COLORS.textSecondary }}>
                <Typography variant="caption">All training records loaded ({visibleLogs?.length})</Typography>
              </Box>
            )}
          </List>
        )}
      </EmailScrollArea>

      <TicketFilterDrawer onClose={() => setAnchorElSort(false)} open={anchorElSort} title="Filter Training" filterDefinitions={filterDefinitions} selectedFilters={selectedFilters} onToggleFilter={toggleFilter} onClearAll={clearAllFilters} totalFilters={totalFilters} onApply={() => setAnchorElSort(false)} />
      <TrainingDetailsDrawer onRatingOpen={() => setIsRatingModalOpen(trainingData?.SessionID)} trainingData={trainingData} open={open} onClose={handleCloseDrawer} onOpen={handleOpenDrawer} />
      <FullPageRating open={isRatingModalOpen} onClose={() => setIsRatingModalOpen(null)} onConfirm={() => setIsRatingModalOpen(null)} onSubmit={HandleRatingSubmit} Call={false} title="this training" />
    </Box>
  );
};

export default TrainingLogsApp;
