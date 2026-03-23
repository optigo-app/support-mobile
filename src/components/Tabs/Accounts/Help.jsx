import React from "react";
import { Box, Grid, Typography, Stack, IconButton, Paper, Container, Link, useTheme, useMediaQuery } from "@mui/material";

// Icons
import StorefrontIcon from "@mui/icons-material/Storefront";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SchoolIcon from "@mui/icons-material/School";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

// --- DATA ---
const CONTACT_DATA = [
  {
    title: "Sales",
    number: "+91 90998 87762",
    cleanNumber: "919099887762",
    icon: <StorefrontIcon />,
    color: "#1a73e8", // Google Blue
    bgColor: "#e8f0fe",
  },
  {
    title: "Demo",
    number: "+91 95102 13581",
    cleanNumber: "919510213581",
    icon: <PlayCircleFilledIcon />,
    color: "#ea4335", // Google Red
    bgColor: "#fce8e6",
  },
  {
    title: "Support",
    number: "0261 360 3500",
    cleanNumber: "02613603500",
    icon: <SupportAgentIcon />,
    color: "#34a853", // Google Green
    bgColor: "#e6f4ea",
  },
  {
    title: "Training",
    number: "0261 360 3511",
    cleanNumber: "02613603511",
    icon: <SchoolIcon />,
    color: "#fbbc04", // Google Yellow
    bgColor: "#fef7e0",
  },
];

const SOCIAL_LINKS = [
  // {
  //   icon: <FacebookIcon />,
  //   url: "https://www.facebook.com/OptigoApps/",
  //   name: "Facebook",
  //   color: "#1877F2",
  // },
  // {
  //   icon: <TwitterIcon />,
  //   url: "https://x.com/optigoapps?lang=ar",
  //   name: "Twitter",
  //   color: "#1DA1F2",
  // },
  {
    icon: <InstagramIcon />,
    url: "https://www.instagram.com/optigoapps/",
    name: "Instagram",
    color: "#E4405F",
  },
  {
    icon: <LinkedInIcon />,
    url: "https://in.linkedin.com/company/orail-optigo-apps",
    name: "LinkedIn",
    color: "#0A66C2",
  },
  {
    icon: <YouTubeIcon />,
    url: "https://www.youtube.com/@OptigoApps?app=desktop",
    name: "YouTube",
    color: "#FF0000",
  },
];

export default function SupportSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        py: 8,
        bgcolor: "#F5F5F7",
        minHeight: "100%",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5, px: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              color: "#1d1d1f",
              mb: 1.5,
              fontSize: { xs: "1.75rem", sm: "2.25rem" }, // Responsive font size
            }}
          >
            You still have questions?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#86868b",
              fontSize: "1.05rem",
              lineHeight: 1.5,
              maxWidth: 400,
              mx: "auto",
            }}
          >
            Can't find what you're looking for? Our support team is here to help you 24/7.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* LEFT: Contact Grid (Pixel OS Quick Settings Style) */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {CONTACT_DATA.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    onClick={() => {
                      window.open(`tel:${item.cleanNumber}`, "_blank");
                    }}
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: "24px", // Pixel-like rounded corners
                      bgcolor: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.04)", // Soft ambient shadow
                      border: "1px solid transparent",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0px 12px 30px rgba(0,0,0,0.08)", // Lifted shadow
                        borderColor: item.bgColor,
                      },
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: item.bgColor,
                          color: item.color,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <ArrowOutwardIcon sx={{ fontSize: 20, color: "#D2D2D7" }} />
                    </Stack>

                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ color: "#86868b", mb: 0.5, textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "0.75rem" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="h6" fontWeight={700} sx={{ color: "#1d1d1f", fontSize: "1.1rem" }}>
                        {item.number}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* RIGHT: Social Media (Apple-like List) */}
          <Grid item xs={12} md={5}>
            <Paper
              sx={{
                p: 2,
                height: "100%",
                borderRadius: "24px",
                bgcolor: "white",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" fontWeight={800} sx={{ mb: 3, color: "#1d1d1f" }}>
                Connect with us
              </Typography>

              <Stack spacing={1}>
                {SOCIAL_LINKS.map((social, index) => (
                  <Box
                    key={index}
                    onClick={() => {
                      window.open(social.url, "_blank");
                    }}

                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textDecoration: "none",
                      p: 1.5,
                      borderRadius: "16px",
                      transition: "background-color 0.2s ease",
                      "&:hover": {
                        bgcolor: "#F5F5F7",
                        "& .social-icon": {
                          transform: "scale(1.1)",
                        },
                      },
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        className="social-icon"
                        sx={{
                          color: social.color,
                          display: "flex",
                          transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      >
                        {social.icon}
                      </Box>
                      <Typography fontWeight={600} sx={{ color: "#424245" }}>
                        {social.name}
                      </Typography>
                    </Stack>

                    <ArrowOutwardIcon sx={{ fontSize: 18, color: "#D2D2D7" }} />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
