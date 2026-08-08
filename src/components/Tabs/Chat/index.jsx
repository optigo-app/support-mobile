import React, { useState } from 'react';
import { 
  Fab, 
  IconButton, 
  Typography, 
  Badge, 
  Box, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { ChatBubble, QuestionAnswer, Launch } from '@mui/icons-material';
import ChatContainer from './ChatContainer';

// Exportable Mobile Trigger Button component for direct placement in mobile headers or bottom bars
export const MobileChatButton = ({ onClick, unreadCount = 1 }) => (
  <IconButton
    onClick={onClick}
    color="primary"
    sx={{
      pointerEvents: 'auto',
      backgroundColor: '#1E2532',
      color: '#3B82F6',
      border: '1px solid rgba(59, 130, 246, 0.4)',
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
      p: 1.2,
      '&:hover': {
        backgroundColor: '#2563EB',
        color: '#FFFFFF',
      }
    }}
    title="Open Support Chat"
  >
    <Badge badgeContent={unreadCount} color="error">
      <QuestionAnswer fontSize="small" />
    </Badge>
  </IconButton>
);

const Chat = ({ defaultOpen = true, defaultFullscreen = false, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isFullscreen, setIsFullscreen] = useState(defaultFullscreen);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <Box>
      {/* Mobile & Desktop Responsive Floating Action Button */}
      {!isOpen && (
        <Fab
          variant={isMobile ? "circular" : "extended"}
          size={isMobile ? "medium" : "large"}
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
            zIndex: 1200,
            px: isMobile ? 0 : 2.5,
            py: isMobile ? 0 : 1.5,
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            color: '#FFFFFF',
            border: '1px solid rgba(59, 130, 246, 0.5)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)',
            textTransform: 'none',
            fontWeight: 600,
            gap: 1,
            '&:hover': {
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              transform: 'translateY(-2px) scale(1.04)',
              boxShadow: '0 14px 36px rgba(0, 0, 0, 0.6), 0 0 28px rgba(59, 130, 246, 0.5)',
            }
          }}
        >
          <Badge
            color="success"
            variant="dot"
            overlap="circular"
            sx={{ mr: isMobile ? 0 : 0.5 }}
          >
            <ChatBubble fontSize="small" />
          </Badge>
          {!isMobile && (
            <>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Optigo Support
              </Typography>
              <Launch fontSize="small" sx={{ opacity: 0.7, ml: 0.5 }} />
            </>
          )}
        </Fab>
      )}

      {/* Main Chat Container Component */}
      {isOpen && (
        <ChatContainer 
          isFullscreen={isFullscreen || isMobile}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          onCloseChat={handleClose}
        />
      )}
    </Box>
  );
};

export default Chat;
