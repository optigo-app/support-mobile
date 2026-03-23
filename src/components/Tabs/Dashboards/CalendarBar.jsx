import React, { useState, useMemo } from "react";
import { Box, Typography, IconButton, Paper, Menu, MenuItem, Fade, ButtonBase, Chip } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos, ExpandMore, FilterList, Check } from "@mui/icons-material";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getYear, setMonth, isToday } from "date-fns";

// --- Google Material Palette ---
const COLORS = {
  primary: "#1a73e8", // Google Blue
  text: "#3c4043", // Dark Gray
  subtext: "#70757a", // Light Gray
  bg: "#ffffff", // White
  bgHover: "#f1f3f4", // Light Gray Hover

  // Event Categories
  tickets: "#ea4335", // Google Red
  calls: "#34a853", // Google Green
  orders: "#4285f4", // Google Blue
  training: "#fbbc04", // Google Yellow
};

const FILTERS = ["All", "Tickets", "Calls", "Orders", "Training"];

const GoogleStyleCalendar = ({ events = [], initialDate = new Date() }) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 'grid' = Calendar View, 'months' = Month Selector
  const [viewMode, setViewMode] = useState("grid");

  // Filter Logic
  const [activeFilter, setActiveFilter] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);

  const currentYear = getYear(new Date());

  // --- Handlers ---
  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    if (getYear(newDate) === currentYear) setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    if (getYear(newDate) === currentYear) setCurrentDate(newDate);
  };

  const handleMonthSelect = (monthIndex) => {
    const newDate = setMonth(currentDate, monthIndex);
    setCurrentDate(newDate);
    setViewMode("grid");
  };

  const openFilter = (e) => setAnchorEl(e.currentTarget);
  const closeFilter = (val) => {
    if (val) setActiveFilter(val);
    setAnchorEl(null);
  };

  // --- Data Logic ---
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentDate]);

  const getEventsForDay = (day) => {
    return events.filter((event) => {
      const matchDate = isSameDay(new Date(event.date), day);
      if (!matchDate) return false;
      if (activeFilter === "All") return true;
      return event.type.toLowerCase() === activeFilter.toLowerCase();
    });
  };

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const monthsList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <Box sx={{ width: "100%", mb: 5, mt: 5, px: { xs: 1.5, sm: 3, md: 4 }, overflow: "hidden" }}>
      {/* Section title */}
      <Typography
        sx={{
          fontSize: { xs: 15, sm: 16 },
          fontWeight: 700,
          color: "#1a1a1a",
          mb: { xs: 2, sm: 3 },
          letterSpacing: "-0.01em",
        }}
      >
        Your Tasks
      </Typography>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          //   maxWidth: 360,
          borderRadius: 6,
          bgcolor: COLORS.bg,
          overflow: "hidden",
          p: 2.5,
        }}
      >
        {/* --- Header Row --- */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          {/* Month/Year Clickable */}
          <ButtonBase
            onClick={() => setViewMode(viewMode === "grid" ? "months" : "grid")}
            sx={{
              borderRadius: 2,
              px: 1,
              py: 0.5,
              transition: "background 0.2s",
              "&:hover": { bgcolor: COLORS.bgHover },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.text, fontSize: "1.1rem" }}>
              {format(currentDate, "MMMM yyyy")}
            </Typography>
            <ExpandMore
              sx={{
                ml: 0.5,
                color: COLORS.subtext,
                transform: viewMode === "months" ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </ButtonBase>

          {/* Filter Chip */}
          <Chip
            icon={<FilterList sx={{ fontSize: 16 }} />}
            label={activeFilter}
            onClick={openFilter}
            sx={{
              height: 32,
              bgcolor: activeFilter === "All" ? COLORS.bgHover : "#e8f0fe",
              color: activeFilter === "All" ? COLORS.text : COLORS.primary,
              fontWeight: 500,
              border: `1px solid ${COLORS.bgHover}`,
              "& .MuiChip-icon": { color: activeFilter === "All" ? COLORS.subtext : COLORS.primary },
            }}
          />
        </Box>

        {/* --- Filter Menu --- */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => closeFilter(null)}
          TransitionComponent={Fade}
          PaperProps={{
            elevation: 3,
            sx: { borderRadius: 3, mt: 1, minWidth: 140 },
          }}
        >
          {FILTERS.map((item) => (
            <MenuItem key={item} onClick={() => closeFilter(item)} selected={activeFilter === item} sx={{ fontSize: "0.9rem", gap: 1.5 }}>
              {activeFilter === item && <Check sx={{ fontSize: 16, color: COLORS.primary }} />}
              <Box sx={{ ml: activeFilter === item ? 0 : 3.5 }}>{item}</Box>
            </MenuItem>
          ))}
        </Menu>

        {/* --- Main View Area --- */}
        <Box sx={{ minHeight: 310 }}>
          {/* VIEW 1: Calendar Grid */}
          {viewMode === "grid" && (
            <Fade in={true}>
              <Box>
                {/* Navigation & Weekdays Combined Header */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <IconButton onClick={handlePrevMonth} disabled={format(currentDate, "M") === "1"} size="small">
                    <ArrowBackIosNew sx={{ fontSize: 14, color: COLORS.subtext }} />
                  </IconButton>

                  <Box sx={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
                    {weekDays.map((day, i) => (
                      <Typography key={i} align="center" sx={{ fontSize: "0.75rem", fontWeight: 600, color: COLORS.subtext }}>
                        {day}
                      </Typography>
                    ))}
                  </Box>

                  <IconButton onClick={handleNextMonth} disabled={format(currentDate, "M") === "12"} size="small">
                    <ArrowForwardIos sx={{ fontSize: 14, color: COLORS.subtext }} />
                  </IconButton>
                </Box>

                {/* Days Grid */}
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: 0.5 }}>
                  {calendarDays.map((day, index) => {
                    const isSelected = isSameDay(day, selectedDate);
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    const isTodayDate = isToday(day);
                    const dayEvents = getEventsForDay(day);
                    const hasEvents = dayEvents.length > 0;

                    return (
                      <Box
                        key={index}
                        onClick={() => setSelectedDate(day)}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          cursor: "pointer",
                          opacity: isCurrentMonth ? 1 : 0.3,
                          position: "relative",
                          py: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            // Selection & Today Logic
                            bgcolor: isSelected ? COLORS.primary : isTodayDate ? "#e8f0fe" : "transparent",
                            color: isSelected ? "white" : isTodayDate ? COLORS.primary : COLORS.text,
                            fontWeight: isSelected || isTodayDate ? 600 : 400,
                            fontSize: "0.9rem",
                            mb: 0.5,
                            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          {format(day, "d")}
                        </Box>

                        {/* Event Indicators (Dots) */}
                        <Box sx={{ display: "flex", gap: 0.4, height: 4, alignItems: "center" }}>
                          {hasEvents &&
                            dayEvents.slice(0, 3).map((evt, i) => (
                              <Box
                                key={i}
                                sx={{
                                  width: 4,
                                  height: 4,
                                  borderRadius: "50%",
                                  bgcolor: COLORS[evt.type.toLowerCase()] || COLORS.subtext,
                                }}
                              />
                            ))}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Fade>
          )}

          {/* VIEW 2: Month Selector */}
          {viewMode === "months" && (
            <Fade in={true}>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.5, pt: 2 }}>
                {monthsList.map((month, index) => {
                  const isCurrentMonth = index === parseInt(format(currentDate, "M")) - 1;
                  return (
                    <ButtonBase
                      key={month}
                      onClick={() => handleMonthSelect(index)}
                      sx={{
                        py: 2,
                        borderRadius: 4,
                        bgcolor: isCurrentMonth ? "#e8f0fe" : "transparent",
                        color: isCurrentMonth ? COLORS.primary : COLORS.text,
                        fontWeight: isCurrentMonth ? 700 : 500,
                        border: isCurrentMonth ? `1px solid ${COLORS.primary}` : "1px solid transparent",
                        "&:hover": { bgcolor: COLORS.bgHover },
                      }}
                    >
                      {month}
                    </ButtonBase>
                  );
                })}
              </Box>
            </Fade>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

// --- Example Usage ---
export default function App() {
  const currentYear = new Date().getFullYear();

  const sampleEvents = [
    { date: new Date(currentYear, 0, 9), type: "calls" },
    { date: new Date(currentYear, 0, 9), type: "tickets" },
    { date: new Date(currentYear, 0, 14), type: "training" },
    { date: new Date(currentYear, 0, 23), type: "orders" },
    { date: new Date(currentYear, 0, 23), type: "calls" },
    { date: new Date(currentYear, 0, 25), type: "tickets" },
    // A date for "Today" visualization
    { date: new Date(), type: "calls" },
  ];

  return <GoogleStyleCalendar events={sampleEvents} />;
}
