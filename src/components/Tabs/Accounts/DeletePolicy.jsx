import {
  Box,
  Typography,
  Stack,
  Paper,
  Button,
  Alert,
} from "@mui/material";
import AutoDeleteRoundedIcon from "@mui/icons-material/AutoDeleteRounded";
import SwipeableBottomDrawer from "../../ui/SwipeableDrawer";
import { DeleteAccountModal } from "../../ui/DeleteAccount";
import { useState } from "react";

const Section = ({ title, children }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 3,
      bgcolor: "#fff",
      border: "1px solid #E5E7EB",
    }}
  >
    <Typography
      variant="subtitle1"
      sx={{ fontWeight: 700, mb: 1 }}
    >
      {title}
    </Typography>

    <Typography
      variant="body2"
      sx={{ color: "text.secondary", lineHeight: 1.7 }}
    >
      {children}
    </Typography>
  </Paper>
);

const DeleteAccountSection = ({ open, onClose, onDelete }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <>
    <SwipeableBottomDrawer open={open} onClose={onClose} bgcolor="#F5F5F7">
      <Box
        sx={{
          minHeight: "100vh",
          px: { xs: 2, sm: 3 },
          pt: 3,
          pb: 10,
        }}
      >
        {/* Header */}
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
            <AutoDeleteRoundedIcon color="error" />
            Delete My Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This action is permanent and cannot be undone.
          </Typography>
        </Stack>

        <Stack spacing={2.5}>
          <Section title="What Happens When You Delete Your Account">
            Deleting your account will remove your mobile number, email
            address, and profile name from the platform. All remaining
            attributes linked to your Express App account will be anonymized
            and will no longer be associated with your phone number.
          </Section>
          <Section title="How to Delete Your Account (iOS / Android App)">
            <ul>
              <li>Log in to your Express App account.</li>
              <li>Open the Menu from the top-left corner.</li>
              <li>Select <strong>Delete My Account</strong>.</li>
              <li>Confirm by tapping <strong>Yes, Delete Account</strong>.</li>
              <li>Your account will be permanently deleted within 30 days.</li>
            </ul>
          </Section>

          <Section title="How to Delete Your Account (Website)">
            <ul>
              <li>Log in using your registered phone number or email and OTP.</li>
              <li>Scroll to the bottom of the website and open the <strong>Contact Us</strong> section.</li>
              <li>Submit a request to delete your account.</li>
              <li>Your account will be permanently deleted within 30 days.</li>
            </ul>
          </Section>



          <Alert
            severity="warning"
            sx={{
              borderRadius: 3,
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Important
            </Typography>
            <Typography variant="body2">
              Account deletion may take up to 30 days. Once deleted, your
              account cannot be recovered.
            </Typography>
          </Alert>

          {/* Danger CTA */}
          <Button
            fullWidth
            variant="contained"
            color="error"
            size="large"
            onClick={()=>setOpenDeleteModal(true)}
            sx={{
              mt: 2,
              borderRadius: 3,
              py: 1.4,
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            Permanently Delete My Account
          </Button>
        </Stack>
      </Box>
    </SwipeableBottomDrawer>
    <DeleteAccountModal
    open={openDeleteModal}
    onClose={()=>setOpenDeleteModal(false)}
    onConfirm={onDelete}
    />
    </>
  );
};

export default DeleteAccountSection;
