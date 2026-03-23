import React from "react";
import { Box, Stack, Skeleton } from "@mui/material"; // Removed useTheme
import { motion, AnimatePresence } from "framer-motion";

// --- 1. The Core Skeleton Row Component (Simplified Variants) ---

// Define simple IN/OUT variants for AnimatePresence
const itemVariants = {
  // Item starts faded and slightly shifted down
  initial: { opacity: 0, y: 10 },
  // Item animates in
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  // Item animates out (crucial for AnimatePresence)
  exit: { opacity: 0, y: -10, transition: { duration: 0.5, ease: "easeIn" } },
};

// Removed useTheme dependency to prevent crashes
const SequentialSkeletonRow = React.forwardRef(({ isLarge = false }, ref) => {
  const squareSize = isLarge ? 56 : 40;

  // Hardcoded a subtle grey color for visibility and soft aesthetic
  const skeletonColor = "#e0e0e0";

  return (
    // motion.div wraps the entire row for the transition
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // Style to prevent elements from jumping when rotating out
      style={{ position: "absolute", width: "100%" }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Left Square Placeholder (Image/Avatar) */}
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            bgcolor: skeletonColor,
            borderRadius: "8px",
            width: squareSize,
            height: squareSize,
          }}
        />

        {/* Right Content Lines */}
        <Stack spacing={0} sx={{ flexGrow: 1 }}>
          <Skeleton variant="text" animation="wave" width="90%" sx={{ bgcolor: skeletonColor, fontSize: "1rem" }} />
          <Skeleton variant="text" animation="wave" width={isLarge ? "70%" : "80%"} sx={{ bgcolor: skeletonColor, fontSize: "0.8rem" }} />
          {isLarge && <Skeleton variant="text" animation="wave" width="40%" sx={{ bgcolor: skeletonColor, fontSize: "0.7rem" }} />}
        </Stack>
      </Stack>
    </motion.div>
  );
});

// --- 2. The Main Sequential Animated Container Component ---
const skeletonData = [
  { id: 1, isLarge: false },
  { id: 2, isLarge: true },
  { id: 3, isLarge: false },
  { id: 4, isLarge: false },
  { id: 5, isLarge: true },
];

const AnimatedSkeletonList = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % skeletonData.length);
    }, 1700);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []); // Empty dependency array means it runs once on mount

  const currentItem = skeletonData[index];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5", // Soft, visible background
        padding: 2,
      }}
    >
      {/* Container for the sequential animation */}
      <Box
        sx={{
          width: "90%",
          maxWidth: "300px",
          height: "80px", // Fixed height to prevent layout shift during transition
          position: "relative", // Required for absolute positioning of children
        }}
      >
        {/* AnimatePresence manages the in/out transition when the key (currentItem.id) changes */}
        <AnimatePresence
          initial={false}
          mode="wait" // Ensures the current element exits before the new one enters
        >
          <SequentialSkeletonRow
            key={currentItem.id} // Changing the key triggers the AnimatePresence transition
            isLarge={currentItem.isLarge}
          />
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default AnimatedSkeletonList;

// import React from 'react';
// import { Box, Stack, Skeleton } from '@mui/material';
// import { motion, AnimatePresence } from 'framer-motion';

// // --- 1. The Core Skeleton Row Component (Standard, non-animated) ---
// // This component no longer needs framer-motion variants, as the animation is on the parent group.
// const SimpleSkeletonRow = ({ isLarge = false }) => {
//     // Hardcoded color for stability (as useTheme was problematic)
//     const skeletonColor = '#e0e0e0';
//     const squareSize = isLarge ? 56 : 40;

//     return (
//         <Stack direction="row" spacing={2} alignItems="center">
//             {/* Left Square Placeholder (Image/Avatar) */}
//             <Skeleton
//                 variant="rounded"
//                 animation="wave"
//                 sx={{
//                     bgcolor: skeletonColor,
//                     borderRadius: '8px',
//                     width: squareSize,
//                     height: squareSize,
//                 }}
//             />

//             {/* Right Content Lines */}
//             <Stack spacing={1} sx={{ flexGrow: 1 }}>
//                 <Skeleton variant="text" animation="wave" width="90%" sx={{ bgcolor: skeletonColor, fontSize: '1rem' }} />
//                 <Skeleton variant="text" animation="wave" width={isLarge ? "70%" : "80%"} sx={{ bgcolor: skeletonColor, fontSize: '0.8rem' }} />
//                 {isLarge && (
//                     <Skeleton variant="text" animation="wave" width="40%" sx={{ bgcolor: skeletonColor, fontSize: '0.7rem' }} />
//                 )}
//             </Stack>
//         </Stack>
//     );
// };

// // --- 2. The Group/List Animation Variants ---
// const groupVariants = {
//     // Hidden, rotated, and positioned up
//     exit: {
//         opacity: 0,
//         y: -10,
//         rotateX: 10,
//         transition: { duration: 0.5, ease: 'easeIn' }
//     },
//     // Visible, no rotation
//     animate: {
//         opacity: 1,
//         y: 0,
//         rotateX: 0,
//         transition: { duration: 0.5, ease: 'easeOut' }
//     },
//     // Hidden, rotated, and positioned down (for the entry effect)
//     initial: {
//         opacity: 0,
//         y: 10,
//         rotateX: -10,
//     }
// };

// // --- 3. The Main Animated Container Component (Swapping between groups) ---

// const AnimatedSkeletonList = () => {
//     // State to toggle between the two groups
//     const [isVisibleGroupA, setIsVisibleGroupA] = React.useState(true);

//     // Total height of the list to ensure the container doesn't collapse (5 rows @ 60px each)
//     const listHeight = 5 * 60;

//     // Infinite loop to swap the groups
//     React.useEffect(() => {
//         // Swap groups every 3 seconds (0.5s out + 0.5s in + 2s display time)
//         const timer = setInterval(() => {
//             setIsVisibleGroupA(prev => !prev);
//         }, 3000);

//         return () => clearInterval(timer);
//     }, []);

//     // --- List Definitions ---
//     // Group A: Starts with a smaller item
//     const GroupA = (
//         <Stack spacing={3}>
//             <SimpleSkeletonRow isLarge={false} />
//             <SimpleSkeletonRow isLarge={true} />
//             <SimpleSkeletonRow isLarge={false} />
//             <SimpleSkeletonRow isLarge={false} />
//             <SimpleSkeletonRow isLarge={true} />
//         </Stack>
//     );

//     // Group B: Starts with a larger item
//     const GroupB = (
//         <Stack spacing={3}>
//             <SimpleSkeletonRow isLarge={true} />
//             <SimpleSkeletonRow isLarge={false} />
//             <SimpleSkeletonRow isLarge={true} />
//             <SimpleSkeletonRow isLarge={false} />
//             <SimpleSkeletonRow isLarge={false} />
//         </Stack>
//     );

//     return (
//         <Box
//             sx={{
//                 width: '100%',
//                 height: '100vh',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 bgcolor: '#f5f5f5', // Soft background
//                 padding: 2,
//                 perspective: '1000px', // Required for 3D rotation
//             }}
//         >
//             <Box
//                 sx={{
//                     width: '90%',
//                     maxWidth: '400px',
//                     height: `${listHeight}px`, // Fixed height for smooth transitions
//                     position: 'relative', // Key for overlaying the transitioning components
//                     transformStyle: 'preserve-3d', // Necessary for the 3D rotation
//                 }}
//             >
//                 {/* AnimatePresence manages the sequential swap */}
//                 <AnimatePresence
//                     initial={false}
//                     mode="wait" // Wait for one to exit before the next enters
//                 >
//                     {/* Key is the toggle: If true, show Group A, otherwise show Group B */}
//                     {isVisibleGroupA ? (
//                         <motion.div
//                             key="groupA" // Unique key for AnimatePresence
//                             variants={groupVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             style={{ position: 'absolute', width: '100%' }}
//                         >
//                             {GroupA}
//                         </motion.div>
//                     ) : (
//                         <motion.div
//                             key="groupB" // Unique key for AnimatePresence
//                             variants={groupVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             style={{ position: 'absolute', width: '100%' }}
//                         >
//                             {GroupB}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </Box>
//         </Box>
//     );
// };

// export default AnimatedSkeletonList;
