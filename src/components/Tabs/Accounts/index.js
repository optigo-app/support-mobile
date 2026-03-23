import React, { useState } from "react";
import { Box, Typography, Avatar, List, ListItemButton, ListItemIcon, ListItemText, Divider, Container, Paper, useTheme, useMediaQuery, Chip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight"; // Standard iOS-style chevron
import { HomeScrollArea } from "./../../ui/ScrollArea";
import { useAuth } from "../../../contexts/AuthContext";
import SupportSection from "./MoreHelp";
import AutoDeleteRoundedIcon from '@mui/icons-material/AutoDeleteRounded';
import PolicyRoundedIcon from '@mui/icons-material/PolicyRounded';
import PrivacyPolicySection from "./PrivacyPolicy";
import DeleteAccountSection from "./DeletePolicy";

function stringAvatar(name) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return {
    children: initials,
    sx: {
      bgcolor: "#4E98F7", // A bright, premium blue color
      color: "white",
      fontWeight: "600",
      fontSize: "2rem",
      width: 80,
      height: 80,
    },
  };
}

const MobileProfilePage = () => {
  const { user, HandleLogout, HandleDeleteAccount } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activePanel, setActivePanel] = React.useState(null);



  const mainOptions = [
    {
      icon: <PolicyRoundedIcon />,
      text: "Privacy Policy",
      onClick: () => setActivePanel("privacy"),
    },
    // {
    //   icon: <AutoDeleteRoundedIcon />,
    //   text: "Delete Account",
    //   onClick: () => setActivePanel("delete"),
    // },
  ];

  const secondaryOptions = [
    {
      icon: <HelpOutlineIcon />,
      text: "Help & Support",
      onClick: () => setActivePanel("support"),
    },
    {
      icon: <LogoutIcon />,
      text: "Sign Out",
      color: theme.palette.error.main,
      isLogout: true,
      onClick: HandleLogout,
    },
  ];


  return (
    <>
      <HomeScrollArea bgcolor="#f5f5f7">
        <Box
          sx={{
            // width: isMobile ? "100%" : "375px",
            overflowY: "auto",
            boxShadow: isMobile ? "none" : theme.shadows[10],
            pb: 15,
          }}
        >
          <Container sx={{ padding: theme.spacing(2) }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 4,
                gap: 1,
                bgcolor: "white",
                borderRadius: theme.shape.borderRadius * 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)", // Subtle premium shadow
                mb: 3,
                mt: 2,
              }}
            >
              <Avatar
                {...stringAvatar(user?.fullName)}
                sx={{
                  width: 72,
                  height: 72,
                  fontSize: 26,
                  fontWeight: 600,
                  bgcolor: "primary.light",
                  color: "primary.dark",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  textTransform: "uppercase",
                  color: "#fff",
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  letterSpacing: "-0.3px",
                }}
              >
                {user?.fullName}
              </Typography>

              <Chip
                label={user?.company}
                size="small"
                color="primary"
                sx={{
                  fontWeight: 600,
                  px: 1.2,
                  borderRadius: 15,
                  bgcolor: "primary.main",
                  color: "white",
                  "& .MuiChip-label": {
                    fontSize: "0.80rem",
                    letterSpacing: "0.2px",
                  },
                }}
              />
            </Box>
            <Paper
              elevation={1}
              sx={{
                borderRadius: theme.shape.borderRadius * 2,
                overflow: "hidden",
                mb: 3,
              }}
            >
              <List disablePadding>
                <Typography variant="h6" sx={{ p: 2, pt: 3, fontWeight: 600, color: "text.secondary" }}>
                  Account
                </Typography>
                <Divider />

                {mainOptions.map((item, index) => (
                  <React.Fragment key={item.text}>
                    <ListItemButton
                      onClick={item.onClick}
                      sx={{ py: 1.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {item.text}
                          </Typography>
                        }
                      />
                      <ChevronRightIcon color="action" />
                    </ListItemButton>
                    {/* Separator only if it's not the last item */}
                    {index < mainOptions.length - 1 && <Divider component="li" variant="inset" />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>

            <Paper elevation={1} sx={{ borderRadius: theme.shape.borderRadius * 2, overflow: "hidden" }}>
              <List disablePadding>
                <Typography variant="h6" sx={{ p: 2, pt: 3, fontWeight: 600, color: "text.secondary" }}>
                  Actions
                </Typography>
                <Divider />
                {secondaryOptions.map((item, index) => (
                  <React.Fragment key={item.text}>
                    <ListItemButton onClick={item.onClick} sx={{ py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40, color: item.isLogout ? item.color : "text.secondary" }}>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ fontWeight: 500, color: item.isLogout ? item.color : "text.primary" }}>
                            {item.text}
                          </Typography>
                        }
                      />
                      {!item.isLogout && <ChevronRightIcon color="action" />}
                    </ListItemButton>
                    {index < secondaryOptions.length - 1 && <Divider component="li" variant="inset" />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Container>
        </Box>
      </HomeScrollArea>
      <SupportSection
        key={"support"}
        open={activePanel === "support"}
        onClose={() => setActivePanel(null)}
      />

      <PrivacyPolicySection
        key={"privacy"}
        open={activePanel === "privacy"}
        onClose={() => setActivePanel(null)}
      />

      <DeleteAccountSection
        key={"delete"}
        open={activePanel === "delete"}
        onClose={() => setActivePanel(null)}
        onDelete={HandleDeleteAccount}
      />

    </>
  );
};

export default MobileProfilePage;
