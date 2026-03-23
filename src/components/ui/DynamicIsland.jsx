import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { DashboardRounded, PhoneRounded, ConfirmationNumberRounded, ShoppingCartRounded, SchoolRounded } from "@mui/icons-material";
import { motion } from "framer-motion";

const TABS = [
  { id: 0, label: "Home", icon: <DashboardRounded /> },
  { id: 1, label: "Call", icon: <PhoneRounded /> },
  { id: 2, label: "Tickets", icon: <ConfirmationNumberRounded /> },
  { id: 3, label: "Orders", icon: <ShoppingCartRounded /> },
  { id: 4, label: "Training", icon: <SchoolRounded /> },
];

export default function DynamicIslandNav({ tabId, setTabId }) {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        px: 1,
        py: 1,
        borderRadius: 25,
        display: "flex",
        alignItems: "center",
        bgcolor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
        zIndex: 15000,
      }}
    >
      {TABS.map((tab) => {
        const active = tabId === tab.id;

        return (
          <motion.div
            key={tab.id}
            onClick={() => setTabId(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: 40,
              padding: "4px",
              cursor: "pointer",
              overflow: "hidden",
              gap: 3,
            }}
            animate={{
              backgroundColor: active ? "rgba(102,126,234,0.18)" : "rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <motion.div
              layout
              animate={{
                color: active ? "#4A66FF" : "#666",
              }}
              transition={{ duration: 0.22 }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginLeft: active ? 2 : 0,
              }}
            >
              {tab.icon}
            </motion.div>
            <motion.div
              layout
              animate={{
                width: active ? "auto" : 0,
                opacity: active ? 1 : 0,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#1a1a1a",
                  pr: active ? 1 : 0,
                }}
              >
                {tab.label}
              </Typography>
            </motion.div>
          </motion.div>
        );
      })}
    </Paper>
  );
}
