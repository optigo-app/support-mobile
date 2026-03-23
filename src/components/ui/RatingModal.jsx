import React, { useState, useEffect } from "react";
import { Box, Button, Rating, TextField, Typography, Dialog, Slide, IconButton, Fade, AppBar, Toolbar } from "@mui/material";
import { StarRounded, CloseRounded, SentimentVeryDissatisfied, SentimentDissatisfied, SentimentSatisfied, SentimentSatisfiedAlt, SentimentVerySatisfied } from "@mui/icons-material";

// --- Transition: Slide Up (Native iOS feel) ---
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getFeedbackConfig = (value) => {
  switch (value) {
    case 1:
      return { label: "Oh no!", color: "#EF4444", icon: <SentimentVeryDissatisfied sx={{ fontSize: 60 }} /> };
    case 2:
      return { label: "Not good", color: "#F97316", icon: <SentimentDissatisfied sx={{ fontSize: 60 }} /> };
    case 3:
      return { label: "It was okay", color: "#EAB308", icon: <SentimentSatisfied sx={{ fontSize: 60 }} /> };
    case 4:
      return { label: "Good job!", color: "#22C55E", icon: <SentimentSatisfiedAlt sx={{ fontSize: 60 }} /> };
    case 5:
      return { label: "Amazing!", color: "#3B82F6", icon: <SentimentVerySatisfied sx={{ fontSize: 60 }} /> };
    default:
      return { label: "Rate Service", color: "#94A3B8", icon: <StarRounded sx={{ fontSize: 60, opacity: 0.1 }} /> };
  }
};

export function FullPageRating({ open, onClose, onSubmit = () => { }, Call, title }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(-1);
  const [remark, setRemark] = useState("");

  // Reset state on open
  useEffect(() => {
    if (open) {
      setRating(5);
      setRemark("");
      setHover(-1);
    }
  }, [open]);

  const activeRating = hover !== -1 ? hover : rating;
  const config = getFeedbackConfig(activeRating);

  return (
    <Dialog
      fullScreen
      open={Boolean(open)}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          bgcolor: "#FFFFFF",
          borderRadius: "24px",
          backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%)",
          overflow: "hidden", // Prevents scrolling
          width: "90vw",
          maxWidth: 480,
          height: "80vh",
        },
      }}
      sx={{
        zIndex: 9999999999,
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0,0,0,0.3)",
        },
      }}
    >
      {/* 1. Navbar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
        <Toolbar>
          <IconButton edge="start" onClick={onClose} sx={{ color: "#1E293B" }}>
            <CloseRounded sx={{ fontSize: 32 }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={onClose} sx={{ color: "#64748B", fontWeight: 600, fontSize: "1rem", textTransform: "none" }}>
            Skip
          </Button>
        </Toolbar>
      </AppBar>

      {/* 2. Main Container (Fixed Height / No Scroll) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%", // Fill remaining height
          width: "100%",
          px: 3,
          pb: 4,
          overflow: "hidden", // Lock scroll
        }}
      >
        {/* TOP SECTION: Emoji & Title (Flex Grow to push content) */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Animated Emoji */}
          <Fade in={true} key={activeRating} timeout={400}>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                bgcolor: `${config.color}15`,
                color: config.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
                boxShadow: `0 20px 40px -10px ${config.color}30`,
              }}
            >
              {config.icon}
            </Box>
          </Fade>

          <Typography variant="h4" sx={{ fontWeight: 800, color: "#0F172A", mb: 1 }}>
            {config.label}
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748B", textAlign: "center" }}>
            Support for {Call ? <span style={{ fontWeight: 600, color: "#334155" }}>Call</span> : <span style={{ fontWeight: 600, color: "#334155" }}>{title}</span>}
          </Typography>
        </Box>

        {/* MIDDLE SECTION: Star Rating (The Slider) */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Rating
            name="hover-feedback"
            value={rating}
            precision={1}
            onChange={(event, newValue) => setRating(newValue)}
            onChangeActive={(event, newHover) => setHover(newHover)}
            // --- CRITICAL FOR MOBILE SLIDE FEEL ---
            // touch-action: none prevents the page from scrolling when dragging over stars
            sx={{
              touchAction: "none",
              "& .MuiRating-icon": {
                width: 50, // Larger touch target
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              "& .MuiRating-iconFilled": {
                color: config.color === "#94A3B8" ? "#FACC15" : config.color,
                transition: "color 0.2s",
              },
              "& .MuiRating-iconHover": {
                color: config.color,
                transform: "scale(1.2)",
                transition: "transform 0.2s",
              },
            }}
            icon={<StarRounded style={{ fontSize: 50 }} />} // Bigger icons
            emptyIcon={<StarRounded style={{ fontSize: 50, opacity: 0.15 }} />}
          />
        </Box>

        {/* BOTTOM SECTION: Input & Submit */}
        <Box sx={{ width: "100%" }}>
          {/* Comment Box */}
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: "20px",
              p: 0.5,
              mb: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              border: "1px solid #E2E8F0",
            }}
          >
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Any feedback? (Optional)"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: { px: 2, py: 1.5, fontSize: "1rem" },
              }}
            />
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            onClick={() => onSubmit(open, rating, remark)}
            disabled={rating === 0}
            sx={{
              py: 1.5,
              borderRadius: "18px",
              fontSize: "1.1rem",
              fontWeight: 700,
              textTransform: "none",
              color: "#fff",
              background: "#0F172A", // Clean black/dark theme
              boxShadow: rating === 0 ? "none" : "0 8px 25px -5px rgba(15, 23, 42, 0.4)",
              transition: "0.3s",
              "&.Mui-disabled": { color: "#94A3B8" },
              "&:hover": {
                background: "#0F172A",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
