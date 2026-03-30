import React from "react";
import { HomeScrollArea } from "../../ui/ScrollArea";
import { Box, Typography, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from "@mui/material";
import { PhoneRounded, ConfirmationNumberRounded, ShoppingCartRounded, SchoolRounded, ChevronRightRounded, Badge } from "@mui/icons-material";
import useCommonStore from "../../../store/CommonStore";
import { Avatar } from "@mui/material";
import { CiSearch as SearchRounded } from "react-icons/ci";
import { Grid } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import PromotionCarousel from "./PromotionCarousel";
import Hello from "./Hello";
import { useAuth } from "../../../contexts/AuthContext";
import { useDashboard } from "../../../contexts/DashboardProvider";
import { useGreeting } from "../../../hooks/useGreeting";
import DashboardSkeleton from "./DashboardSkeleton";

const initials = (user) => {
  return (user?.fullName || "")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

const Dashboard = () => {
  const { setTabId } = useCommonStore();
  const { user } = useAuth();
  const { DashboardAnalytics, loading } = useDashboard();
  const greeting = useGreeting();

  const statsCards = [
    {
      id: 1,
      icon: PhoneRounded,
      value: DashboardAnalytics?.count_of_call,
      label: "Total Call Logs",
      title: "Call Activity",
      bgGradient: "linear-gradient(135deg, #3a3dff 0%, #5f71ff 40%, #2b1aff 100%)",
    },
    {
      id: 2,
      icon: ConfirmationNumberRounded,
      value: DashboardAnalytics?.count_of_ticket,
      label: "Active Tickets",
      title: "Support Desk",
      bgGradient: "linear-gradient(135deg, #ff7a3d 0%, #ff5e62 50%, #d72638 100%)",
    },
    {
      id: 3,
      icon: ShoppingCartRounded,
      value: DashboardAnalytics?.count_of_order,
      label: "Pending Orders",
      title: "Order Tracking",
      bgGradient: "linear-gradient(135deg, #00c6bb 0%, #009f9c 40%, #006d74 100%)",
    },
    {
      id: 4,
      icon: SchoolRounded,
      value: DashboardAnalytics?.count_of_training,
      label: "Training Sessions",
      title: "Your Training",
      bgGradient: "linear-gradient(135deg, #3af87e 0%, #1ecf63 45%, #0f8c3a 100%)",
    },
  ];

  const quickActions = [
    {
      id: 1,
      icon: PhoneRounded,
      title: "CallLog & Request",
      description: `Need help? Leave your request, and we'll call you back shortly.`,
      iconBg: "linear-gradient(135deg, #4c5fff 0%, #263bff 100%)",
      // Deep Electric Indigo (analytics-style)
    },
    {
      id: 2,
      icon: ConfirmationNumberRounded,
      title: "Tickets",
      description: `
      Organized ticket tracking, made simple and effective.`,
      iconBg: "linear-gradient(135deg, #ff8b5f 0%, #ff5a3d 100%)",
      // Warm Sunset Orange — premium and bold
    },
    {
      id: 3,
      icon: ShoppingCartRounded,
      title: "Orders",
      description: `No more guessing, know what’s happening with your orders, right here.`,
      iconBg: "linear-gradient(135deg, #18d2c2 0%, #0ca397 100%)",
      // Deep Aqua Teal — clean and technical
    },
    {
      id: 4,
      icon: SchoolRounded,
      title: "Trainings",
      description: `Stay informed with a full overview of your training journey.`,
      iconBg: "linear-gradient(135deg, #3cd681 0%, #1fa15a 100%)",
      // Deep Mint Emerald — warm and friendly
    },
  ];

  const total = Object.values(DashboardAnalytics).reduce((acc, val) => {
    return acc + (typeof val === "number" ? val : 0);
  }, 0);



  return (
    <>
      <HomeScrollArea sx={{ pb: "0 !important" }} pb={0}>
        <Box sx={{ px: { xs: 1.5, sm: 3, md: 4 }, pt: { xs: 2.5, sm: 3 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: { xs: 2.5, sm: 3 },
            }}
          >
            {/* LEFT: Avatar + Greeting */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }} onClick={() => setTabId(5)}>
              <Avatar
                sx={{
                  width: { xs: 40, sm: 44 },
                  height: { xs: 40, sm: 44 },
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: 0.5,
                  color: "#fff",
                  bgcolor: "transparent",
                  background: "linear-gradient(135deg, #3a3dff 0%, #5f71ff 40%, #2b1aff 100%)",
                  boxShadow: "0 2px 8px rgba(157, 173, 247, 0.25)",
                  textTransform: "uppercase",
                }}
              >
                {initials(user)}
              </Avatar>

              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: 13, sm: 14 },
                    color: "#777",
                  }}
                >
                  {greeting}
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: 18, sm: 20 },
                    fontWeight: 700,
                    color: "#1a1a1a",
                    letterSpacing: "-0.02em",
                    lineHeight: 0.98,
                    textTransform: "capitalize",
                  }}
                >
                  {user?.fullName}
                </Typography>
              </Box>
            </Box>

            {/* RIGHT: Search */}
            {/* <IconButton
              sx={{
                width: { xs: 40, sm: 44 },
                height: { xs: 40, sm: 44 },
                bgcolor: "rgba(102, 126, 234, 0.1)",
              }}
            >
              <SearchRounded sx={{ fontSize: { xs: 20, sm: 22 }, color: "#667eea" }} />
            </IconButton> */}
          </Box>
        </Box>


        {loading ? (
          <DashboardSkeleton hideHeader />
        ) : (
          <>
            <Box sx={{ width: "100%", mt: 0, px: { xs: 1.5, sm: 3, md: 4 } }}>
              <Grid container spacing={2} mt={2} mb={2}>
                {statsCards.map((stat) => {
                  const IconComponent = stat.icon;
                  return (
                    <Grid item xs={6} key={stat.id}>
                      <Card
                        sx={{
                          borderRadius: 4,
                          p: 2,
                          background: "#fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          position: "relative",
                          border: "1px solid rgba(0, 0, 0, 0.06)",
                        }}
                        onClick={() => setTabId(stat.id)}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: stat.bgGradient,
                            width: 32,
                            height: 32,
                          }}
                        >
                          <IconComponent sx={{ fontSize: { xs: 20, sm: 22 }, color: "#fff" }} />
                        </IconButton>

                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#1a1a1a",
                            mb: 2,
                            textTransform: "capitalize",
                          }}
                        >
                          {stat?.title}
                        </Typography>

                        <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a", lineHeight: 1 }}>{stat?.value}</Typography>

                        <Typography sx={{ fontSize: 12, color: "#888", fontWeight: 500, mt: 0.5 }}>{stat?.label}</Typography>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            <PromotionCarousel />

            <Box sx={{ px: { xs: 1.5, sm: 3, md: 4 } }}>
              <Typography
                sx={{
                  fontSize: { xs: 15, sm: 16 },
                  fontWeight: 700,
                  color: "#1a1a1a",
                  mb: { xs: 1.5, sm: 2 },
                  letterSpacing: "-0.01em",
                }}
              >
                Quick Actions
              </Typography>
              <Card
                sx={{
                  borderRadius: { xs: 3, sm: 3 },
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
                  background: "#ffffff",
                  overflow: "hidden",
                }}
              >
                <List sx={{ p: 0 }}>
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <React.Fragment key={action.id}>
                        <ListItem
                          onClick={() => setTabId(action.id)}
                          button
                          sx={{
                            py: { xs: 2, sm: 2.5 },
                            px: { xs: 2, sm: 2.5 },
                            border: "1px solid rgba(245, 246, 255, 0.85)",
                            transition: "all 0.2s",
                            "&:active": {
                              bgcolor: "rgba(102, 126, 234, 0.08)",
                            },
                            "@media (hover: hover)": {
                              "&:hover": {
                                bgcolor: "rgba(102, 126, 234, 0.04)",
                                "& .action-chevron": {
                                  transform: "translateX(4px)",
                                  color: "#667eea",
                                },
                              },
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: { xs: 52, sm: 56 } }}>
                            <Box
                              sx={{
                                width: { xs: 40, sm: 44 },
                                height: { xs: 40, sm: 44 },
                                borderRadius: 15,
                                background: action.iconBg,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              <IconComponent sx={{ fontSize: { xs: 20, sm: 22 }, color: "#fff" }} />
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                sx={{
                                  fontSize: { xs: 14, sm: 15 },
                                  fontWeight: 600,
                                  color: "#1a1a1a",
                                  mb: 0.25,
                                }}
                              >
                                {action.title}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                sx={{
                                  fontSize: { xs: 12, sm: 13 },
                                  color: "#888",
                                  fontWeight: 500,
                                  lineHeight: 1.4,
                                }}
                              >
                                {action.description}
                              </Typography>
                            }
                          />
                          <ChevronRightRounded
                            className="action-chevron"
                            sx={{
                              fontSize: { xs: 22, sm: 24 },
                              color: "#ccc",
                              transition: "all 0.2s",
                            }}
                          />
                        </ListItem>
                        {index < quickActions.length - 1 && (
                          <Box
                            sx={{
                              height: 1,
                              bgcolor: "rgba(0, 0, 0, 0.06)",
                              mx: { xs: 2, sm: 2.5 },
                            }}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </List>
              </Card>
            </Box>

            <Hello />
          </>
        )}
      </HomeScrollArea>
    </>
  );
};

export default Dashboard;
