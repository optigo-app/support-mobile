import { useState } from "react";
import { Box, Fab, Zoom, Typography, Backdrop, ClickAwayListener } from "@mui/material";
import { AddRounded, PhoneRounded, AssignmentRounded, NoteAltRounded, CloseRounded } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useCommonStore from "../../store/CommonStore";

const MainFab = styled(Fab)(() => ({
  background: "linear-gradient(135deg, #4A66FF 0%, #2640FF 100%)",
  boxShadow: "0 8px 28px rgba(60,80,255,0.35)",
  color: "#fff",
  width: 58,
  height: 58,
  borderRadius: 45,
  "&:active": {
    transform: "scale(0.94)",
  },
}));

const actions = [
  { label: "New CallBack Request", icon: <PhoneRounded />, color: "#21C875", store_id: "task" },
  { label: "Create Ticket", icon: <AssignmentRounded />, color: "#FF6A3D", store_id: "ticket" },
];

const ActionItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 14,
  transition: "all 0.25s ease",
}));

const CallLogsFabMenu = () => {
  const [open, setOpen] = useState(false);
  const setOpenForm = useCommonStore((s) => s.setOpenForm);

  const HandleNavigation = (action) => {
    setOpen(false);
    setOpenForm(action.store_id);
  };

  return (
    <>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Box sx={{ position: "relative", zIndex: 1500 }}>
          <Backdrop
            open={open}
            onClick={() => setOpen(false)}
            sx={{
              zIndex: 1200,
              bgcolor: "rgba(0,0,0,0.25)",
              backdropFilter: "blur(3px)",
              transition: "all 0.3s ease",
            }}
          />
          <Box
            sx={{
              position: "fixed",
              bottom: 160,
              right: 25,
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "flex-end",
              zIndex: 1300,
              pointerEvents: "none",
            }}
          >
            {actions.map((action, index) => (
              <Zoom in={open} timeout={200 + index * 60} key={action.label} style={{ transformOrigin: "bottom right" }}>
                <ActionItem
                  sx={{
                    pointerEvents: open ? "auto" : "none", // allow only visible actions to receive clicks
                    cursor:'pointer'
                  }}
                     onClick={() => HandleNavigation(action)}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(6px)",
                      borderRadius: 2,
                      px: 1.5,
                      py: 0.5,
                      fontWeight: 600,
                      color: "#1a1a1a",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      fontSize: { xs: 12.5, sm: 13.5 },
                    }}
                  >
                    {action.label}
                  </Typography>
                  <Fab
                    size="medium"
                    // onClick={() => HandleNavigation(action)}
                    sx={{
                      width: 44,
                      height: 44,
                      minHeight: 0,
                      color: "#fff",
                      background: action.color,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                      "&:hover": {
                        background: action.color,
                        boxShadow: "0 6px 22px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    {action.icon}
                  </Fab>
                </ActionItem>
              </Zoom>
            ))}
          </Box>

          <MainFab
            onClick={() => setOpen((prev) => !prev)}
            sx={{
              position: "fixed",
              bottom: 90,
              right: 20,
              width: { xs: 54, sm: 58 },
              height: { xs: 54, sm: 58 },
              zIndex: 1400,
            }}
          >
            {open ? <CloseRounded sx={{ fontSize: { xs: 26, sm: 28 } }} /> : <AddRounded sx={{ fontSize: { xs: 30, sm: 32 } }} />}
          </MainFab>
        </Box>
      </ClickAwayListener>
    </>
  );
};

export default CallLogsFabMenu;
