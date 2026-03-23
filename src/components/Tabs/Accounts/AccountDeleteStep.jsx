import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Alert,
  Divider,
} from "@mui/material";
import AutoDeleteRoundedIcon from "@mui/icons-material/AutoDeleteRounded";

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

const AccountDeleteStep = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F5F7",
        px: { xs: 2, sm: 3 },
        pt: 3,
        pb: 6,
      }}
    >
      {/* Header */}
      <Stack spacing={1.2} sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AutoDeleteRoundedIcon color="error" />
          Delete My Account
        </Typography>

        <Typography variant="body2" color="text.secondary">
          This page explains how account deletion works and what to expect.
        </Typography>
      </Stack>

      <Stack spacing={2.5}>
        <Section title="What Happens When You Delete Your Account">
          Deleting your account permanently removes your registered mobile
          number, email address, and profile name from the platform. All
          remaining data linked to your account will be anonymized and will
          no longer be associated with you.
        </Section>

        <Section title="How to Delete Your Account (Mobile App)">
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            <li>Log in to your Express App account.</li>
            <li>Open the menu from the top-left corner.</li>
            <li>Select <strong>Delete My Account</strong>.</li>
            <li>Confirm your request.</li>
            <li>Your account will be deleted within 30 days.</li>
          </ul>
        </Section>

        <Section title="How to Delete Your Account (Website)">
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            <li>Log in using your registered phone number or email.</li>
            <li>Scroll to the bottom and open <strong>Contact Us</strong>.</li>
            <li>Submit a request to delete your account.</li>
            <li>Your account will be deleted within 30 days.</li>
          </ul>
        </Section>

        <Divider />

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
            Account deletion may take up to 30 days. Once deleted, your account
            and associated data cannot be recovered.
          </Typography>
        </Alert>
      </Stack>
    </Box>
  );
};

export default AccountDeleteStep;
