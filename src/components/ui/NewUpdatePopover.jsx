import React from 'react';
import { Snackbar, Paper, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info'; // For the blue 'i'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // For the green check

// You can pass variant="info" (Blue) or variant="success" (Green)
const NewUpdatePopup = ({
  hasNewUpdate,
  refreshCallLogs,
  Title = "New reviews found",
  ctaText = "Refresh Feed",
  variant = "info",
  setHasNewUpdate = () => { }
}) => {

  // Title, hasNewUpdate, refreshCallLogs, setHasNewUpdate
  // define styles based on variant
  const isSuccess = variant === 'success';
  const mainColor = isSuccess ? '#2e7d32' : '#1565c0'; // Green or Blue
  const IconComponent = isSuccess ? CheckCircleIcon : InfoIcon;

  const onClose = () => {
    setHasNewUpdate(false)
  }

  const handleRefreshClick = () => {
    // 1. Trigger the actual refresh logic
    if (refreshCallLogs) refreshCallLogs();
    // 2. Hide the popup immediately
    if (onClose) onClose();
  };

  return (
    <Snackbar
      open={hasNewUpdate}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      // Prevent automatic closing if you want it to stay until clicked, 
      // otherwise add autoHideDuration={6000}
      sx={{ marginTop: 2 }}
    >
      <Paper
        elevation={4}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          padding: '12px 16px',
          borderRadius: '12px',
          backgroundColor: '#fff',
          maxWidth: '400px',
          minWidth: '300px',
          gap: 1.5
        }}
      >
        {/* Left Icon */}
        <IconComponent
          sx={{
            color: mainColor,
            fontSize: 28,
            marginTop: '2px'
          }}
        />

        {/* Text Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              color: '#1a1a1a',
              fontSize: '0.95rem',
              lineHeight: 1.4
            }}
          >
            {Title}
          </Typography>

          <Typography
            variant="body2"
            onClick={handleRefreshClick}
            sx={{
              color: mainColor,
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '4px',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            {ctaText}
          </Typography>
        </Box>

        {/* Close 'X' Button */}
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            padding: 0,
            color: '#9e9e9e',
            marginTop: '2px'
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Paper>
    </Snackbar>
  );
};

export default NewUpdatePopup;
// import { Snackbar, Button } from "@mui/material";

// const NewUpdatePopup = ({ Title, hasNewUpdate, refreshCallLogs, setHasNewUpdate }) => {
//   return (
//     <Snackbar
//       open={hasNewUpdate}
//       anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       message={`New ${Title} available`}
//       ClickAwayListenerProps={{ onClickAway: () => setHasNewUpdate(false) }}
//       action={
//         <Button
//           color="primary"
//           size="small"
//           onClick={refreshCallLogs}
//           sx={{ fontWeight: 700 }}
//         >
//           Refresh
//         </Button>
//       }
//     />
//   );
// };


// export default NewUpdatePopup;