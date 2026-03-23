import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Typography, FormLabel, IconButton, Grid, Button, Stack, Container, Drawer, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import { KeyboardArrowDown as ArrowDownIcon, ArrowForwardIosRounded as ArrowForwardIosRoundedIcon, AddIcCallRounded as AddIcCallRoundedIcon } from "@mui/icons-material";
import { EmailScrollArea } from "../../../ui/ScrollArea";
import { useAuth } from "../../../../contexts/AuthContext";
import { useCallLog } from "../../../../contexts/UseCallLog";
import { AppNameButton, CustomField, colors, getCurrentDateTime, labelStyle } from "./utils";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export default function AddTaskFormDrawer({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Contexts
  const { user } = useAuth();
  const { companyOptions, APPNAME_LIST, addCall } = useCallLog();
  const [loading, setloading] = useState(false);

  // Unified State (Reduces render cycles)
  const [formState, setFormState] = useState({
    selectedAppId: null,
    currentDate: "",
    currentTime: "",
    displayCompanyName: "",
    companyNameValue: "",
    customerName: "",
    description: "",
  });

  // Calculate Company Info - Memoized to prevent recalculation on every render
  const companyInfo = useMemo(() => {
    if (!companyOptions || !user?.companycode) return null;
    return companyOptions.find((option) => option?.label?.split("/")?.[0]?.toLowerCase() === user.companycode.toLowerCase());
  }, [companyOptions, user?.companycode]);

  // Initialization Logic
  useEffect(() => {
    if (open) {
      const { date, time } = getCurrentDateTime();

      setFormState({
        selectedAppId: null,
        currentDate: date,
        currentTime: time,
        displayCompanyName: companyInfo?.label || "",
        companyNameValue: companyInfo?.value || "",
        customerName: user?.fullName || "",
        description: "",
      });
    }
    // We strictly depend on 'open' and the source data.
    // This ensures fields reset correctly when opening.
  }, [open, companyInfo, user?.fullName]);

  // Handlers - Memoized with useCallback so props don't change for children
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAppSelect = useCallback((appId) => {
    setFormState((prev) => ({ ...prev, selectedAppId: appId }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setloading(true);
    try {
      const payload = {
        date: formState.currentDate,
        time: formState.currentTime,
        companyName: formState.companyNameValue,
        customerName: formState.customerName,
        description: formState.description,
        appId: formState.selectedAppId,
        CorpId: user?.id,
        source: "client",
      };
      const res = await addCall(payload);
      if (res?.rd[0]?.stat_msg == "Call Added successfully") {
        onClose();
      } else {
        throw new Error("Failed Add Call");
      }
    } catch (error) {
    } finally {
      setloading(false);
    }
  }, [formState, user?.id, onClose]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      sx={{ zIndex: 9999999999 }}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : 420,
          borderRadius: isMobile ? 0 : "16px 0 0 16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <IconButton onClick={onClose} size="small" sx={{ border: `1px solid ${colors.border}` }}>
          <ArrowBackIosRoundedIcon fontSize="small" />
        </IconButton>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 800,
            color: colors.black,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          Add CallBack Request
          <AddIcCallRoundedIcon sx={{ mr: 1, color: "#16a34a" }} />
        </Typography>


      </Box>

      {/* Scrollable Content */}
      <EmailScrollArea>
        <Container maxWidth="sm" sx={{ pt: 3, pb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CustomField label="Start Date" value={formState.currentDate} icon={<ArrowDownIcon />} readOnly={true} />
            </Grid>
            <Grid item xs={6}>
              <CustomField label="Time" value={formState.currentTime} icon={<ArrowDownIcon />} readOnly={true} />
            </Grid>
          </Grid>

          {/* These fields won't re-render when you type in Description because props are stable */}
          <CustomField label="Company Name" placeholder="Company Name" name="companyNameValue" value={formState.displayCompanyName} disable={true} />

          <CustomField label="Customer Name" placeholder="Customer Name" name="customerName" value={formState.customerName} disable={true} />

          <CustomField label="Description" multiline placeholder="Add description..." name="description" value={formState.description} onChange={handleInputChange} />

          {/* App Selection */}
          <Box>
            <FormLabel sx={labelStyle}>Appname</FormLabel>
            <Stack
              direction="row"
              sx={{
                mt: 2,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {APPNAME_LIST?.map((item) => (
                <AppNameButton key={item.AppId} label={item?.AppName} selected={formState.selectedAppId === item?.AppId} onClick={() => handleAppSelect(item?.AppId)} />
              ))}
            </Stack>
          </Box>
        </Container>
      </EmailScrollArea>

      {/* Footer Actions */}
      <Box
        sx={{
          p: 1.35,
          borderTop: `1px solid rgba(0,0,0,0.08)`,
          display: "flex",
          gap: 2,
          bgcolor: "#fff",
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          sx={{
            height: 44,
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: 600,
          }}
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            height: 44,
            borderRadius: "50px",
            bgcolor: loading ? "#15803d" : "#16a34a",
            color: "#fff",
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            "&:hover": { bgcolor: "#15803d" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Add"}
        </Button>
      </Box>
    </Drawer>
  );
}
