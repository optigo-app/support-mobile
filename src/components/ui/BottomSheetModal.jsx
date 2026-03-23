import { Dialog, Box, Typography, Button, Rating, TextField, Slide } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { forwardRef, useState } from "react";

// Smooth slide-up animation
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BottomSheetModal({ open, onClose, children, height = "auto" }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth={false} // <-- IMPORTANT
      fullWidth // <-- allows width: 100%
     sx={{
        zIndex: 13000000,
        "& .MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,0.4)" },
        "& .MuiDrawer-paper": {
          maxWidth: "600px",
          margin: "0 auto",
          width: "100%",
          borderRadius: "24px 24px 0 0",
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0,0,0,0.25)",
        },
      }}
      PaperProps={{
        sx: {
          m: 0,
          width: "100% !important", // <-- FORCE full width
          bottom: 0,
          borderRadius:8,
          maxHeight: "80vh",
          background: "#fff",
          boxShadow: "0 -8px 30px rgba(0,0,0,0.15)",
        },
      }}
    >
      {children}
    </Dialog>
  );
}
