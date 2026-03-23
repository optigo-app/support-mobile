import { Box,  } from "@mui/material";
import SwipeableBottomDrawer from "../../ui/SwipeableDrawer";
import SupportSectionX from "./Help";

const SupportSection = ({ open, onClose }) => {
  return (
    <SwipeableBottomDrawer onClose={onClose} open={open}
    bgcolor=" #F5F5F7"
    >
      <Box
        sx={{
          minHeight: "100vh",
        }}
      >
        <SupportSectionX/>
      </Box>
    </SwipeableBottomDrawer>
  );
};

export default SupportSection;
