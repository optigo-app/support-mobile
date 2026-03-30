import React from "react";
import { Box, Skeleton, Grid, Card, Stack } from "@mui/material";

// Reusable Glassy Card Wrapper
const GlassCard = ({ children, sx = {}, ...props }) => (
  <Card
    elevation={0}
    sx={{
      background: "rgba(255, 255, 255, 0.6)", // Semi-transparent white
      backdropFilter: "blur(12px)", // Glass blur effect
      borderRadius: 4, // Matches your dashboard cards
      border: "1px solid rgba(255, 255, 255, 0.8)", // Subtle glass border
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)", // Soft premium shadow
      overflow: "hidden",
      position: "relative",
      ...sx,
    }}
    {...props}
  >
    {children}
  </Card>
);

const DashboardSkeleton = ({ hideHeader = false }) => {
  // Common spacing matches your original file
  const pagePadding = { xs: 1.5, sm: 3, md: 4 };

  return (
    <Box sx={{ width: "100%", height: "100%", pb: 4, bgcolor: "#fff" }}>
      {/* 1. Header Section (Avatar + Search) */}
      {!hideHeader && (
        <Box sx={{ px: pagePadding, pt: { xs: 2.5, sm: 3 } }}>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: { xs: 2.5, sm: 3 },
          }}
        >
          {/* Left: Avatar + Text */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Skeleton
              variant="circular"
              width={44}
              height={44}
              animation="wave"
              sx={{ bgcolor: "rgba(0,0,0,0.06)" }}
            />
            <Box>
              <Skeleton
                variant="text"
                width={80}
                height={16}
                animation="wave"
                sx={{ bgcolor: "rgba(0,0,0,0.04)", mb: 0.5 }}
              />
              <Skeleton
                variant="text"
                width={140}
                height={24}
                animation="wave"
                sx={{ bgcolor: "rgba(0,0,0,0.06)" }}
              />
            </Box>
          </Box>

          {/* Right: Search Button */}
          <Skeleton
            variant="circular"
            width={44}
            height={44}
            animation="wave"
            sx={{ bgcolor: "rgba(0,0,0,0.04)" }}
          />
        </Box>
        </Box>
      )}

      {/* 2. Promotion Carousel Placeholder */}
      <Box sx={{ px: 0, mb: 3 }}>
         {/* Assuming Carousel is full width or padded, adjust width as needed */}
         <Box sx={{ px: pagePadding }}>
            <Skeleton
              variant="rectangular"
              height={160}
              animation="wave"
              sx={{ 
                borderRadius: 4, 
                bgcolor: "rgba(0,0,0,0.05)",
                width: '100%' 
              }}
            />
         </Box>
      </Box>

      {/* 3. Your Tasks Section */}
      <Box sx={{ px: pagePadding }}>
        {/* Section Title */}
        <Skeleton
          variant="text"
          width={100}
          height={24}
          sx={{ mb: 2, bgcolor: "rgba(0,0,0,0.08)" }}
        />

        {/* Big Overall Activity Card */}
        <GlassCard sx={{ p: 2.2, mb: 2, height: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           {/* Mimic the gradient look cleanly */}
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, background: 'linear-gradient(135deg, #4A66FF 0%, #1D42FF 100%)' }} />
          
          <Skeleton variant="text" width={120} height={20} sx={{ mb: 1, bgcolor: "rgba(0,0,0,0.05)" }} />
          <Skeleton variant="text" width={60} height={60} sx={{ mb: 0.5, bgcolor: "rgba(0,0,0,0.08)" }} />
          <Skeleton variant="text" width={200} height={20} sx={{ bgcolor: "rgba(0,0,0,0.05)" }} />
          
          {/* Arrow Icon Placeholder */}
          <Skeleton 
            variant="circular" 
            width={32} 
            height={32} 
            sx={{ position: 'absolute', top: 12, right: 12, bgcolor: "rgba(0,0,0,0.05)" }} 
          />
        </GlassCard>

        {/* 2x2 Grid Stats */}
        <Grid container spacing={2} mb={4}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={6} key={item}>
              <GlassCard sx={{ p: 2, height: 120 }}>
                {/* Icon Placeholder */}
                <Skeleton
                  variant="circular"
                  width={32}
                  height={32}
                  sx={{ position: "absolute", top: 12, right: 12, bgcolor: "rgba(0,0,0,0.05)" }}
                />
                
                {/* Content */}
                <Box sx={{ mt: 2 }}>
                    <Skeleton variant="text" width="70%" height={20} sx={{ mb: 1, bgcolor: "rgba(0,0,0,0.06)" }} />
                    <Skeleton variant="text" width="50%" height={40} sx={{ mb: 0.5, bgcolor: "rgba(0,0,0,0.09)" }} />
                </Box>
              </GlassCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 4. Quick Actions Section */}
      <Box sx={{ px: pagePadding }}>
        <Skeleton
          variant="text"
          width={120}
          height={24}
          sx={{ mb: 2, bgcolor: "rgba(0,0,0,0.08)" }}
        />

        <GlassCard sx={{ p: 0 }}>
          {[1, 2, 3, 4].map((action, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: { xs: 2, sm: 2.5 },
                }}
              >
                {/* Icon Box */}
                <Skeleton
                  variant="rounded"
                  width={44}
                  height={44}
                  sx={{ 
                    borderRadius: 3.5, 
                    mr: 2, 
                    bgcolor: "rgba(0,0,0,0.05)" 
                  }}
                />
                
                {/* Text Lines */}
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="40%" height={20} sx={{ mb: 0.5, bgcolor: "rgba(0,0,0,0.07)" }} />
                  <Skeleton variant="text" width="80%" height={16} sx={{ bgcolor: "rgba(0,0,0,0.04)" }} />
                </Box>

                {/* Chevron */}
                <Skeleton variant="circular" width={20} height={20} sx={{ bgcolor: "rgba(0,0,0,0.03)" }} />
              </Box>
              
              {/* Divider Simulation */}
              {index < 3 && (
                 <Box sx={{ mx: 2.5, height: '1px', bgcolor: 'rgba(0,0,0,0.03)' }} />
              )}
            </React.Fragment>
          ))}
        </GlassCard>
      </Box>
    </Box>
  );
};

export default DashboardSkeleton;