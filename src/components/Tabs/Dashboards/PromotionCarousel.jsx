import React from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import {Assets} from '../../../assets'

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// --- MOCK DATA ---
const mockPromotions = [
  {
    id: 1,
    imageUrl:Assets.Banner.banner1,
    color: "#FFD700", // Gold accent
  },
  {
    id: 2,
    imageUrl:Assets.Banner.banner2,
    color: "#3F88C5", // Blue accent
  },
  {
    id: 3,
    imageUrl:Assets.Banner.banner3,
    color: "#B03A2E", // Red accent
  },
  {
    id: 4,
    imageUrl:Assets.Banner.banner4,
    color: "#B03A2E", // Red accent
  },
  // {
  //   id: 5,
  //   imageUrl:Assets.Banner.banner5,
  //   color: "#B03A2E", // Red accent
  // },
];

const PromotionCarousel = () => {
  const swiperStyles = {
    // Container padding for the centered effect
    paddingY: 3,
    paddingX: 0,

    // Custom Pagination Styling
    "& .swiper-pagination": {
      position: "relative", // Position above the carousel, not absolutely at the bottom
      mt: 2,
      mb: 0,
      bottom: "unset !important",
    },
    "& .swiper-pagination-bullet": {
      width: "8px",
      height: "8px",
      transition: "all 0.3s ease",
      opacity: 0.6,
      background: "rgba(0,0,0,0.5)", // Default dot color
      margin: "0 2px",
    },
    // Active dot style - longer and primary color
    "& .swiper-pagination-bullet-active": {
      width: "28px",
      borderRadius: "4px",
      opacity: 1,
      background: "linear-gradient(135deg, #3a3dff 0%, #5f71ff 40%, #2b1aff 100%)", // iOS Blue for premium feel
    },
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", pt: 0, px: 0 }}>
      <Box sx={swiperStyles}>
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          slidesPerView={1.15} // Shows 1.2 slides (a peek of the next one)
          centeredSlides={true} // Centers the current slide
          spaceBetween={16} // Gap between slides
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            // type: 'bullets' (default)
          }}
          // Responsive settings for tablets/desktops (optional, but good practice)
          breakpoints={{
            600: {
              // Tablet and up
              slidesPerView: 1.5,
              spaceBetween: 24,
            },
            1024: {
              // Desktop
              slidesPerView: 2.5,
              spaceBetween: 32,
            },
          }}
        >
          {mockPromotions.map((promo) => (
            <SwiperSlide key={promo.id}>
              <SlideContent promo={promo} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

// Component for the individual slide content
const SlideContent = ({ promo }) => (
  <Box
    sx={{
      // Full cover image styling
      backgroundImage: `url(${promo.imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: { xs: "200px", sm: "250px", md: "300px" }, // Responsive height
      borderRadius: 4, // Large rounded corners for premium feel
      position: "relative",
      overflow: "hidden",
      cursor: "pointer",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)", // Subtle shadow
    }}
  >
    {/* TEXT OVERLAY */}
    {promo.title && (
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          // Gradient for text contrast
          background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))",
          color: "#fff",
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ color: promo.color || "#fff", lineHeight: 1.2 }}>
          {promo.title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {promo.subtitle}
        </Typography>
      </Box>
    )}
  </Box>
);

export default PromotionCarousel;
