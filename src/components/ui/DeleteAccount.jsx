import { Box, Button, Stack, Typography } from "@mui/material";
import BottomSheetModal from "./BottomSheetModal";
import { HighlightOffRounded as HighlightOffIcon } from "@mui/icons-material";

export function DeleteAccountModal({ open, onClose, onConfirm }) {
  return (
    <BottomSheetModal open={open} onClose={onClose}>
      <Box sx={{ p: 2, width: "100%" }}>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <HighlightOffIcon sx={{ fontSize: 44, color: "#ef4444" }} />
        </Box>

        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: 700, mb: 1 }}
        >
          Delete Account?
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#4B5563",
            fontSize: 14,
            lineHeight: 1.5,
            mb: 2,
          }}
        >
          This action is permanent. Once your account is deleted, all your data
          will be removed and cannot be recovered.
        </Typography>

        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Button
            fullWidth
            variant="contained"
            sx={{
              height: 46,
              borderRadius: "50px",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              fontWeight: 700,
              color: "#fff",
            }}
            onClick={onConfirm}
          >
            Delete Account
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              height: 46,
              borderRadius: "50px",
              fontWeight: 600,
              color: "#475569",
              border: "1px solid #CBD5E1",
              bgcolor: "#fff",
              "&:hover": {
                bgcolor: "#f8fafc",
              },
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </BottomSheetModal>
  );
}
