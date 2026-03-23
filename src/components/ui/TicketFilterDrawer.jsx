import { useState } from "react";
import { Box, Typography, IconButton, Divider, Button, Chip, SwipeableDrawer, Stack, Badge } from "@mui/material";
import { CloseRounded, FilterListRounded, CheckCircleRounded } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";

// --- STYLED COMPONENTS (Kept the same) ---
const DrawerPaper = styled("div")(({ theme }) => ({
  background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
  backdropFilter: "blur(20px)",
  borderTopLeftRadius: 32,
  borderTopRightRadius: 32,
  boxShadow: "0 -12px 48px rgba(0,0,0,0.12)",
  color: theme.palette.text.primary,
  maxHeight: "85vh",
  overflow: "hidden",
}));

const Header = styled(Box)({
  position: "sticky",
  top: 0,
  background: "#ffffff",
  zIndex: 10,
  padding: "10px 12px",
});

const Content = styled(Box)({
  padding: "8px 12px 12px",
  overflowY: "auto",
  maxHeight: "calc(85vh - 180px)",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#d0d0d0",
    borderRadius: "10px",
  },
  paddingTop: "15px",
});

const Footer = styled(Box)({
  padding: "8px 12px 12px",
  background: "#ffffff",
  borderTop: "1px solid #f0f0f0",
  position: "sticky",
  bottom: 0,
});

const Section = styled(Box)({
  marginBottom: 32,
});

const SectionTitle = styled(Typography)({
  fontSize: 13,
  fontWeight: 700,
  textTransform: "capitalize",
  letterSpacing: "0.2px",
  color: "#666",
  marginBottom: 12,
});

const FilterChip = styled(({ selected, color, ...props }) => <Chip {...props} />)(({ selected, color }) => ({
  borderRadius: 22,
  fontSize: 13,
  fontWeight: 500,
  border: selected ? "2px solid #667eea" : "2px solid #e8e8e8",
  borderColor: selected ? color : "#e8e8e8",
  backgroundColor: selected ? `${color}15` : "#ffffff",
  color: selected ? color : "#555",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: selected ? `${color}25` : "#f5f5f5",
    borderColor: selected ? color : "#d0d0d0",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
}));
// --- END STYLED COMPONENTS ---


/**
 * DynamicFilterDrawer: A presentational component for all filtering needs.
 * It expects state and logic handlers to be passed in from useDynamicFilters.
 * 
 * @param {Object} props.filterDefinitions - The structure of all filter groups.
 * @param {Object} props.selectedFilters - The current state of selected filters.
 * @param {function} props.onToggleFilter - Function to toggle a single filter item.
 * @param {function} props.onClearAll - Function to reset all filters.
 * @param {number} props.totalFilters - Count of active filters.
 * @param {function} props.onApply - Function to call when filters are applied (usually closes the drawer).
 */
const DynamicFilterDrawer = ({
  open,
  onClose,
  title = "Filter Items",
  filterDefinitions,
  selectedFilters,
  onToggleFilter,
  onClearAll,
  totalFilters,
  onApply, 
}) => {

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      disableSwipeToOpen
      transitionDuration={300}
      PaperProps={{
        component: DrawerPaper,
      }}
      sx={{
        zIndex: 9999999999,
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        "& .MuiDrawer-paper": {
          borderRadius: "25px 25px  0px 0px !important",
        },
      }}
    >
      <Header>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={totalFilters > 0 ? 1 : 0}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <FilterListRounded sx={{ fontSize: 20, color: "#333" }} />
            <Typography fontWeight={700} color="#1a1a1a">
              {title}
            </Typography>
            {totalFilters > 0 && (
              <Badge
                badgeContent={totalFilters}
                sx={{
                  "& .MuiBadge-badge": {
                    background: "linear-gradient(135deg, #4A66FF 0%, #1D42FF 100%)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 11,
                    minWidth: 18,
                    height: 18,
                    top: -9,
                    right: 2,
                  },
                }}
              />
            )}
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "#666",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <CloseRounded />
          </IconButton>
        </Box>
        {totalFilters > 0 && (
          <Button
            size="small"
            onClick={onClearAll} // Use the hook's clearAll function
            sx={{
              textTransform: "none",
              background: "linear-gradient(135deg, #4A66FF 0%, #1D42FF 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              padding: "4px 8px",
              "&:hover": { backgroundColor: "#E3F2FD" },
              bgcolor: "#e9e9e980",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <DeleteSweepRoundedIcon /> Clear all filters
          </Button>
        )}
      </Header>

      <Divider sx={{ opacity: 0.6 }} />

      {/* --- DYNAMIC CONTENT RENDERING --- */}
      <Content>
        {Object.entries(filterDefinitions).map(([groupKey, group]) => {
          const selectedList = selectedFilters[groupKey] || [];
          
          return (
            <Section key={groupKey}>
              <SectionTitle>{group.title}</SectionTitle>
              <Stack direction="row" flexWrap="wrap" gap={0.8}>
                {group.options.map((option) => {
                  const isSelected = selectedList.includes(option.label);
                  return (
                    <FilterChip 
                      variant="contained" 
                      key={option.label} 
                      label={option.label} 
                      selected={isSelected}
                      color={option.color} 
                      // Use the hook's toggle function
                      onClick={() => onToggleFilter(groupKey, option.label)} 
                      icon={isSelected ? <CheckCircleRounded sx={{ fontSize: 18, color: `${option.color}AA` }} /> : undefined} 
                    />
                  )
                })}
              </Stack>
            </Section>
          );
        })}
      </Content>
      {/* --- END DYNAMIC CONTENT RENDERING --- */}

      <Footer>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            fullWidth
            onClick={onClearAll} // Use the hook's clearAll function
            disabled={totalFilters === 0}
            sx={{
              borderRadius: 8,
              textTransform: "none",
              fontWeight: 600,
              fontSize: 13,
              py: 1,
              borderColor: "#e0e0e0",
              color: "#666",
              "&:hover": {
                borderColor: "#bdbdbd",
                backgroundColor: "#fafafa",
              },
              "&.Mui-disabled": {
                borderColor: "#f0f0f0",
                color: "#ccc",
              },
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={onClose} // Apply usually means closing and letting the consumer handle the filtering
            disableElevation
            sx={{
              borderRadius: 6,
              textTransform: "none",
              fontWeight: 600,
              fontSize: 13,
              py: 1,
              background: "linear-gradient(135deg, #4A66FF 0%, #1D42FF 100%)",
              color: "#fff",
            }}
          >
            Apply Filters {totalFilters > 0 && `(${totalFilters})`}
          </Button>
        </Stack>
      </Footer>
    </SwipeableDrawer>
  );
};

export default DynamicFilterDrawer;