import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { DashboardRounded, PhoneRounded, ConfirmationNumberRounded, ShoppingCartRounded, SchoolRounded } from "@mui/icons-material";
import { motion } from "framer-motion";

const TABS = [
  { id: 0, label: "Home", icon: <DashboardRounded />, color: "linear-gradient(135deg, #4A66FF 0%, #1D42FF 100%)" },
  { id: 1, label: "Call", icon: <PhoneRounded />, color: "linear-gradient(135deg, #3a3dff 0%, #5f71ff 40%, #2b1aff 100%)" },
  { id: 2, label: "Tickets", icon: <ConfirmationNumberRounded />, color: "linear-gradient(135deg, #ff7a3d 0%, #ff5e62 50%, #d72638 100%)" },
  { id: 3, label: "Orders", icon: <ShoppingCartRounded />, color: "linear-gradient(135deg, #00c6bb 0%, #009f9c 40%, #006d74 100%)" },
  { id: 4, label: "Training", icon: <SchoolRounded />, color: "linear-gradient(135deg, #3af87e 0%, #1ecf63 45%, #0f8c3a 100%)" },
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
        bgcolor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        border: "1px solid rgba(255,255,255,0.3)",
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
              backgroundColor: active ? "rgba(0,0,0,0.03)" : "rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <motion.div
              layout
              animate={{
                background: active ? tab.color : "rgba(0,0,0,0)",
                color: active ? "#ffffff" : "#666",
                boxShadow: active ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
              }}
              transition={{ duration: 0.22 }}
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginLeft: active ? 2 : 0,
              }}
            >
              {React.cloneElement(tab.icon, { sx: { fontSize: 18 } })}
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
                  fontWeight: 700,
                  color: "#1a1a1a",
                  pr: active ? 1.5 : 0,
                  pl: active ? 0.5 : 0,
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

