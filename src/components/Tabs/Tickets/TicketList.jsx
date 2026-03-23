import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Box, Typography, Avatar, Chip, ListItemButton, List, Badge, CircularProgress, IconButton } from "@mui/material";
import { MessageRounded as MessageRoundedIcon } from "@mui/icons-material";

// --- Assumed Imports (Shared Components) ---
import { EmailScrollArea } from "../../ui/ScrollArea";
import TicketFilterDrawer from "../../ui/TicketFilterDrawer";
import GmailStyleHeader from "../../ui/Header";
import TicketDetailView from "../Tickets/Details";
import { CloseTicketModal } from "../../ui/CloseTicketModal";
import { FullPageRating } from "../../ui/RatingModal";
import { getStatusStyle, TICKET_FILTER_DEFINITIONS } from "../../../utils/FiltersOptions";
import { useDynamicFilters } from "../../../hooks/useDynamicFilters";
import { useTicket } from "./../../../contexts/useTicket";
import { todayDate, yesterdayDate, thisMonthStart, thisMonthEnd, thisWeekStart, thisWeekEnd, formatRobustDate } from "../../../utils/dateFormatter";
import { DataParser } from "../../../utils/ticketUtils";
import { COLORS } from "../../../utils/Filtering";
import NewUpdatePopup from "../../ui/NewUpdatePopover";

const TicketListApp = () => {
  const { filterDefinitions, selectedFilters, totalFilters, toggleFilter, clearAllFilters } = useDynamicFilters(TICKET_FILTER_DEFINITIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const { tickets, loadMore, hasMore, filters, updateFilters, isFetching, selectedTicket, setSelectedTicket, CloseTicket, AddFeedBackTicket,
    hasNewUpdate,
    refreshCallLogs,
    setHasNewUpdate
  } = useTicket();

  const [anchorElSort, setAnchorElSort] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(null);

  const scrollRef = useRef(null);
  const isFirstRender = useRef(true);

  const options = useMemo(
    () => [
      { label: "all", Filter: "", StartDate: "", EndDate: "", ApiStatus: "" },
      { label: "New", ApiStatus: "New", Filter: "", StartDate: "", EndDate: "" },
      { label: "Closed Ticket", ApiStatus: "Close", Filter: "", StartDate: "", EndDate: "" },
      { label: "Open Ticket", ApiStatus: "Open", Filter: "", StartDate: "", EndDate: "" },
      { label: "today", Filter: "date", StartDate: todayDate, EndDate: todayDate, ApiStatus: "" },
      { label: "yesterday", Filter: "date", StartDate: yesterdayDate, EndDate: yesterdayDate, ApiStatus: "" },
      { label: "month", Filter: "date", StartDate: thisMonthStart, EndDate: thisMonthEnd, ApiStatus: "" },
      { label: "week", Filter: "date", StartDate: thisWeekStart, EndDate: thisWeekEnd, ApiStatus: "" },
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

  const activeFilterLabel = useMemo(() => {
    const match = options.find((opt) => {
      // 1. Check Date & Type match
      const isDateMatch = opt.Filter === filters.Filter && opt.StartDate === filters.StartDate && opt.EndDate === filters.EndDate;

      const isApiStatusMatch = opt.ApiStatus ? filters.ApiStatus === opt.ApiStatus : !filters.ApiStatus;

      return isDateMatch && isApiStatusMatch;
    });

    return match ? match.label : "custom";
  }, [filters, options]);

  const handleHeaderFilterChange = (selectedOption) => {
    const clickedLabel = selectedOption.label;
    const targetState = {
      Filter: selectedOption.Filter || "",
      StartDate: selectedOption.StartDate || "",
      EndDate: selectedOption.EndDate || "",
      ApiStatus: selectedOption.ApiStatus || "", // Binding to ApiStatus
      statusId: "",
    };

    const isCurrentlyActive = activeFilterLabel === clickedLabel;

    if (clickedLabel === "all" || isCurrentlyActive) {
      updateFilters({
        Filter: "",
        StartDate: "",
        EndDate: "",
        ApiStatus: "",
        statusId: "",
      });
    } else {
      updateFilters(targetState);
    }
  };

  const visibleLogs = tickets;

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

  const HandleOpenDetail = (row) => {
    setIsDetailOpen(true);
    setSelectedTicket(row);
  };

  const HandleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedTicket(null);
  };

  const HandleCloseTicket = async () => {
    try {
      const res = await CloseTicket(selectedTicket?.TicketNo);
      if (res) {
        setIsCloseModalOpen(false);
      } else {
        setIsCloseModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleFeedbackTicket = async (id, rating, feedback) => {
    try {
      const res = await AddFeedBackTicket(id, rating, feedback);
      if (res) {
        HandleCloseDetail();
        setIsRatingModalOpen(null);
      } else {
        HandleCloseDetail();
        setIsRatingModalOpen(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", overflow: "hidden", bgcolor: "#fff", height: "100%" }}>
        {/* HEADER */}
        <GmailStyleHeader FilteringOptions={options} onFilterChange={handleHeaderFilterChange} activeFilter={activeFilterLabel} searchQuery={searchQuery} onSearch={(e) => setSearchQuery(e.target.value)} anchorElSort={anchorElSort} setAnchorElSort={setAnchorElSort} title="Tickets" />

        {/* SCROLL AREA */}
        <EmailScrollArea ref={scrollRef}>
          <NewUpdatePopup
            Title={'Ticket'}
            hasNewUpdate={hasNewUpdate} refreshCallLogs={refreshCallLogs} setHasNewUpdate={setHasNewUpdate}
          />
          {visibleLogs?.length === 0 && !isFetching ? (
            <Box sx={{ p: 5, textAlign: "center", color: COLORS.textSecondary }}>
              <Typography variant="body2">No tickets found</Typography>
            </Box>
          ) : (
            <List disablePadding>
              {visibleLogs?.map((row) => {
                const statusStyle = getStatusStyle(row?.Status);
                const formatted = formatRobustDate(row?.CreatedOn);
                const { data, length } = DataParser(row?.comments, true);

                return (
                  <React.Fragment key={row?.TicketId}>
                    <ListItemButton
                      onClick={() => HandleOpenDetail(row)}
                      sx={{
                        py: 1.2,
                        px: 1.3,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                        borderBottom: `1px solid ${COLORS?.border}`,
                        transition: "0.2s",
                        bgcolor: (() => {
                          const s = row?.Status?.toLowerCase() || "";
                          if (s.includes("closed")) return "#FFF4F3";
                          if (s.includes("solved")) return "#EDFAF0";
                          return "#FFFFFF";
                        })(),
                        "&:hover": {
                          bgcolor: (() => {
                            const s = row?.Status?.toLowerCase() || "";
                            if (s.includes("closed")) return "#FFEAE8";
                            if (s.includes("solved")) return "#DDF5E4";
                            return "rgba(0,0,0,0.02)";
                          })(),
                        },
                      }}
                    >
                      {/* Avatar Section */}
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.4, mt: 0.4, position: "relative" }}>
                        <Badge
                          badgeContent={row?.isNewTicket ? 1 : 0}
                          color="primary"
                          anchorOrigin={{ vertical: "top", horizontal: "left" }}
                          variant="dot"
                          sx={{
                            "& .MuiBadge-badge": {
                              top: 5,
                              left: 2,
                              border: (theme) => `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
                              padding: 0.5,
                              borderRadius: 25,
                            },
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 42,
                              height: 42,
                              borderRadius: "50%",
                              fontWeight: 700,
                              fontSize: "1rem",
                              background: `linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)`,
                              color: "#fff",
                              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                            }}
                          >
                            {row?.companyname ? row?.companyname?.charAt(0)?.toUpperCase() : "T"}
                          </Avatar>
                        </Badge>
                      </Box>

                      {/* Content Section */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: { xs: "0.82rem", sm: "0.88rem" },
                              color: COLORS.subtitle,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              pr: 1,
                              textTransform: "capitalize",
                            }}
                          >
                            {row?.subject}
                          </Typography>
                          <Typography sx={{ color: COLORS.textSecondary, fontSize: "0.75rem", whiteSpace: "nowrap" }}>{formatted?.smart}</Typography>
                        </Box>

                        {/* <Typography
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
                          {row?.subject}
                        </Typography> */}

                        <Typography
                          sx={{
                            fontSize: "0.80rem",
                            color: COLORS.textSecondary,
                            mt: 0.2,
                            lineHeight: 1.3,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {data[0]?.message || "No Description"}
                        </Typography>

                        <Box sx={{ mt: 0.6, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                            {row?.Status && (
                              <Chip
                                label={row?.Status}
                                size="small"
                                icon={React.cloneElement(statusStyle.icon, { style: { fontSize: "12px", marginRight: "0px" } })}
                                sx={{
                                  height: 22,
                                  fontSize: "0.70rem",
                                  fontWeight: 600,
                                  bgcolor: statusStyle.bg,
                                  color: statusStyle.color,
                                  borderRadius: "8px",
                                  maxWidth: "100px",
                                  "& .MuiChip-label": {
                                    px: 1,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  },
                                }}
                              />
                            )}
                            <Chip
                              label={row?.TicketNo || "No Ticket"}
                              size="small"
                              sx={{
                                height: 22,
                                fontSize: "0.70rem",
                                fontWeight: 600,
                                borderRadius: "8px",
                                bgcolor: "#eef0f3",
                                color: "#333",
                                border: "1px solid #dadce0",
                                maxWidth: "100px",
                                "& .MuiChip-label": {
                                  px: 1,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                },
                              }}
                            />
                            {row?.CreatedBy && (
                              <Chip
                                label={row?.CreatedBy}
                                size="small"
                                avatar={
                                  <Avatar sx={{ width: 18, height: 18, fontSize: "0.6rem", bgcolor: '#EC4899', color: '#fff' }}>
                                    {row?.CreatedBy?.charAt(0)?.toUpperCase()}
                                  </Avatar>
                                }
                                sx={{
                                  height: 22,
                                  fontSize: "0.70rem",
                                  fontWeight: 600,
                                  bgcolor: '#f3f3f3',
                                  color: '#666',
                                  border: '1px solid #e8e8e8',
                                  maxWidth: "120px",
                                  "& .MuiChip-avatar": {
                                    width: 18,
                                    height: 18,
                                    marginLeft: "2px",
                                    color: '#fff',
                                  },
                                  "& .MuiChip-label": {
                                    paddingLeft: "6px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  },
                                }}
                              />
                            )}
                          </Box>
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: "#f5f5f5",
                              border: "1px solid #ddd",
                              width: 22,
                              height: 22,
                              borderRadius: "8px",
                              position: "relative",
                              "&:hover": { bgcolor: "#eaeaea" },
                            }}
                          >
                            <Badge
                              badgeContent={length || 0}
                              color="primary"
                              sx={{
                                "& .MuiBadge-badge": { fontSize: "0.5rem", height: 12, minWidth: 12, px: 0.3, top: -2, right: -2 },
                              }}
                            >
                              <MessageRoundedIcon sx={{ fontSize: 12, color: "#444" }} />
                            </Badge>
                          </IconButton>
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
                  <Typography variant="caption">All tickets loaded ({visibleLogs?.length})</Typography>
                </Box>
              )}
            </List>
          )}
        </EmailScrollArea>
      </Box>
      <CloseTicketModal selectedTicket={selectedTicket} open={isCloseModalOpen} onClose={() => setIsCloseModalOpen(false)} onConfirm={HandleCloseTicket} />
      <FullPageRating open={isRatingModalOpen} onClose={() => setIsRatingModalOpen(null)} onSubmit={HandleFeedbackTicket} onConfirm={() => setIsRatingModalOpen(null)} />
      <TicketFilterDrawer onClose={() => setAnchorElSort(false)} open={anchorElSort} title="Filter Tickets" filterDefinitions={filterDefinitions} selectedFilters={selectedFilters} onToggleFilter={toggleFilter} onClearAll={clearAllFilters} totalFilters={totalFilters} onApply={() => setAnchorElSort(false)} />
      <TicketDetailView key={selectedTicket?.TicketNo} onCloseRatingOpen={() => setIsRatingModalOpen(selectedTicket?.TicketNo)} onCloseTicketOpen={() => setIsCloseModalOpen(true)} open={isDetailOpen} onClose={HandleCloseDetail} onBack={HandleCloseDetail} data={selectedTicket} />
    </>
  );
};

export default TicketListApp;
