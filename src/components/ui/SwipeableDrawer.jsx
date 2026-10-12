import React, { useState, useEffect } from "react";
import { Box, SwipeableDrawer } from "@mui/material";
import styled from "@emotion/styled";

const isIOS =
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

const DrawerPaper = styled("div")(() => ({
  backgroundColor: "#FFFFFF",
  boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const Puller = styled(Box)(() => ({
  width: 40,
  height: 5,
  backgroundColor: "#E5E7EB",
  borderRadius: 3,
  position: "absolute",
  top: 10,
  left: "calc(50% - 20px)",
}));

const SwipeableBottomDrawer = ({
  children,
  open,
  onClose,
  bgcolor,
  fullScreen = false,
  scrollable = false,
  hidePuller = false,
  contentSx = {},
}) => {
  const [viewportHeight, setViewportHeight] = useState(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Dynamic visualViewport listener: adjusts height when mobile virtual keyboard opens
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const handleViewportChange = () => {
      const vv = window.visualViewport;
      if (!vv) return;

      const isKb = window.innerHeight - vv.height > 80;
      setKeyboardVisible(isKb);
      setViewportHeight(vv.height);
    };

    const vv = window.visualViewport;
    vv.addEventListener("resize", handleViewportChange);
    vv.addEventListener("scroll", handleViewportChange);

    return () => {
      vv.removeEventListener("resize", handleViewportChange);
      vv.removeEventListener("scroll", handleViewportChange);
    };
  }, []);

  const shouldHidePuller = hidePuller || fullScreen;

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      disableSwipeToOpen
      disableDiscovery={isIOS}
      disableBackdropTransition={!isIOS}
      transitionDuration={250}
      PaperProps={{ component: DrawerPaper }}
      sx={{
        zIndex: 13000000,
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0,0,0,0.4)",
          touchAction: "none",
        },
        "& .MuiDrawer-paper": {
          maxWidth: fullScreen ? "100%" : "600px",
          margin: "0 auto",
          width: "100%",
          height:
            keyboardVisible && viewportHeight
              ? `${viewportHeight}px`
              : fullScreen
              ? "100dvh"
              : "85dvh",
          maxHeight:
            keyboardVisible && viewportHeight
              ? `${viewportHeight}px`
              : fullScreen
              ? "100dvh"
              : "85dvh",
          borderRadius: fullScreen ? "0px" : "24px 24px 0 0",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          transition: keyboardVisible
            ? "none"
            : "height 0.22s cubic-bezier(0.4, 0, 0.2, 1), max-height 0.22s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.22s ease",
        },
      }}
    >
      {/* Handle Area */}
      {!shouldHidePuller && (
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            height: 24,
            flexShrink: 0,
            position: "sticky",
            top: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Puller />
        </Box>
      )}

      {/* Content Container */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          overflow: scrollable ? "auto" : "hidden",
          overflowY: scrollable ? "auto" : "hidden",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          touchAction: scrollable ? "pan-y" : "auto",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          bgcolor: bgcolor || "transparent",
          ...contentSx,
        }}
      >
        {children}
      </Box>
    </SwipeableDrawer>
  );
};

export default SwipeableBottomDrawer;
