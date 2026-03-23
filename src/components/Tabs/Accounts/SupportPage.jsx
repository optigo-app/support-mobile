import React from "react";
import { Box, Stack, Typography, Paper } from "@mui/material";

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
      sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
    >
      {title}
    </Typography>

    <Typography
      variant="body2"
      sx={{
        color: "text.secondary",
        lineHeight: 1.7,
        whiteSpace: "pre-line",
      }}
    >
      {children}
    </Typography>
  </Paper>
);

const SupportPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, sm: 3 },
        pt: 3,
        pb: 10,
      }}
    >
      {/* Header */}
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Support & Help Center
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Optigo Carely 
        </Typography>
      </Stack>

      <Stack spacing={2.5}>
        <Section title="We’re Here to Help">
          We’re committed to providing excellent support to all Optigo Carely
          users. Our support team is ready to assist you with any questions,
          issues, or guidance you may need while using the Care App.
        </Section>

        <Section title="How to Get Help">
          If you need assistance, reach out to our support team through the
          following channels:
          {"\n\n"}
          <strong>Email Support:</strong> support@orail.in
          {"\n"}
          <strong>Phone Support:</strong> 0261-3603500
        </Section>

        <Section title="User Guides and Tutorials">
          Explore step-by-step guides to help you use Optigo Carely
          effectively. These guides cover:
          {"\n"}• Managing customer data
          {"\n"}• Scanning products
          {"\n"}• Generating prints and care-related records
          {"\n"}• Managing stock and designs
        </Section>

        <Section title="System Status and Updates">
          Stay informed about:
          {"\n"}• Ongoing system issues
          {"\n"}• Scheduled maintenance
          {"\n"}• App updates that may affect performance
        </Section>

        <Section title="Support Hours">
          Our support team is available during the following hours:
          {"\n\n"}
          <strong>Monday to Saturday:</strong> 9:30 AM – 6:30 PM
          {"\n"}
          <strong>Sunday:</strong> Closed
          {"\n\n"}
          For inquiries outside these hours, please email us and we’ll get
          back to you as soon as possible.
        </Section>

        <Section title="Feedback and Suggestions">
          We value your input!
          {"\n\n"}
          Share your feedback or ideas to improve Optigo Carely by emailing us
          at support@orail.in.
        </Section>
      </Stack>
    </Box>
  );
};

export default SupportPage;
