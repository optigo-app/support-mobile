import React, { useState, useRef } from "react";
import { Box, Typography, FormLabel, IconButton, Button, Drawer, useTheme, useMediaQuery, Avatar, Fade, Stack } from "@mui/material";
import { ArrowForwardIosRounded, AttachFileRounded, CloseRounded, InsertDriveFileRounded, NoteAddRounded } from "@mui/icons-material";
import { EmailScrollArea } from "../../../ui/ScrollArea";
import { useAuth } from "../../../../contexts/AuthContext";
import { useTicket } from "../../../../contexts/useTicket";
import { CategoryChip, CustomInput, colors, labelStyle } from "./utils";
import { filesUploadApi } from "./../../../../apis/UploadFille";
import { v4 as uuidv4 } from "uuid";
import useCommonStore from "../../../../store/CommonStore";
import { compressImagesToWebP } from "../../../../utils/ImageCompressor";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export default function CreateTicketDrawer({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fileInputRef = useRef(null);

  const { user } = useAuth();
  const { CATEGORY_LIST, addTicket } = useTicket();
  const { setTabId } = useCommonStore();

  // Form State
  const [uniqueId, setUniqueId] = useState(uuidv4()); // Stable ID across renders
  const [category, setCategory] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Reset form for "Add New"
  const resetForm = () => {
    setCategory(null);
    setSubject("");
    setMessage("");
    setAttachments([]);
    setShowErrors(false);
    setUniqueId(uuidv4()); // Generate new ID for next ticket
  };

  // const handleFileChange = (e) => {
  //   if (e.target.files?.length) {
  //     const newFiles = Array.from(e.target.files).map((file) => ({
  //       file,
  //       preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
  //     }));
  //     setAttachments((prev) => [...prev, ...newFiles]);
  //   }
  // };

  const handleFileChange = async (e) => {
    if (!e.target.files?.length) return;
    const selectedFiles = Array.from(e.target.files);

    const imageFiles = selectedFiles.filter((f) =>
      f.type.startsWith("image/")
    );
    const otherFiles = selectedFiles.filter(
      (f) => !f.type.startsWith("image/")
    );

    let compressedImages = [];

    if (imageFiles.length > 0) {
      compressedImages = await compressImagesToWebP(imageFiles);
    }

    const finalAttachments = [
      ...compressedImages.map((img) => {
        const fileObj = new File([img.blob], img.compressedName, {
          type: "image/webp",
          lastModified: new Date().getTime()
        });

        return {
          file: fileObj,
          preview: img.previewUrl,
          originalName: img.originalName,
        };
      }),

      ...otherFiles.map((file) => ({
        file,
        preview: null,
      })),
    ];

    setAttachments((prev) => [...prev, ...finalAttachments]);
    e.target.value = "";
  };


  const removeFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (addNew) => {
    const isSubjectValid = subject.trim() !== "";
    const isMessageValid = message.trim() !== "";
    const isCategoryValid = category !== null;

    if (!isSubjectValid || !isMessageValid || !isCategoryValid) {
      setShowErrors(true);
      return;
    }

    setLoading(true);
    try {
      let attachmentUrls = "";

      // 1. Upload Files if exist
      if (attachments.length > 0) {
        const uploadRes = await filesUploadApi({
          ukey: user?.ukey,
          folderName: "Ticket",
          uniqueNo: uniqueId,
          attachments: attachments.map((f) => f.file),
        });
        attachmentUrls = uploadRes?.files ? uploadRes.files.map((f) => f.url).join(",") : "";
      }

      // 2. Prepare Payload
      const payload = {
        category,
        subject,
        instruction: message,
        attachment: attachmentUrls,
        userName: user?.id,
        projectCode: user?.custid,
        createdby: user?.custid,
        custId: user?.id,
        CorpId: user?.id,
      };

      // 3. Create Ticket
      const res = await addTicket(payload);
      console.log("Ticket Created:", res);

      // 4. Handle Navigation vs Reset
      if (addNew) {
        resetForm();
      } else {
        setTabId(2);
        onClose();
        resetForm(); // Optional: clear if they reopen drawer later
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      sx={{ zIndex: 9999999999 }}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : 500,
          borderRadius: isMobile ? 0 : "16px 0 0 16px",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
        },
      }}
    >
      {/* HEADER */}
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-start", borderBottom: `1px solid ${colors.border}`, gap: 1 }}>
        <IconButton size="small" onClick={onClose} sx={{ border: `1px solid ${colors.border}` }}>
          <ArrowBackIosRoundedIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ fontSize: 20, fontWeight: 800, color: colors.textMain, display: "flex", alignItems: "center", gap: 1 }}>
          Create New Ticket
          <NoteAddRounded sx={{ color: colors.primary }} />
        </Typography>

      </Box>

      {/* FORM CONTENT */}
      <EmailScrollArea>
        <Box sx={{ p: isMobile ? 2 : 4 }}>
          <CustomInput
            label="Subject"
            placeholder="E.g. Login issue"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={showErrors && subject.trim() === ""}
          />
          <CustomInput
            label="Message"
            placeholder="Describe issue..."
            multiline
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={showErrors && message.trim() === ""}
          />

          {/* Attachments */}
          <Box mb={4}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <FormLabel sx={labelStyle}>Attachments</FormLabel>
              {attachments.length > 0 && (
                <Typography variant="caption" color="text.secondary">
                  {attachments.length} files
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 1, overflowX: "auto", pb: 1, "&::-webkit-scrollbar": { display: "none" } }}>
              <IconButton
                onClick={() => fileInputRef.current.click()}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "16px",
                  border: "2px dashed #E5E7EB",
                  flexShrink: 0,
                  "&:hover": { borderColor: colors.primary, color: colors.primary, bgcolor: colors.primaryLight },
                }}
              >
                <AttachFileRounded />
              </IconButton>
              <input type="file" multiple ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />

              {attachments.map((file, index) => (
                <Fade in key={index}>
                  <Box sx={{ position: "relative", flexShrink: 0 }}>
                    <Box sx={{ width: 60, height: 60, borderRadius: "14px", border: `1px solid ${colors.border}`, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#F9FAFB" }}>{file.preview ? <Avatar src={file.preview} variant="square" sx={{ width: "100%", height: "100%" }} /> : <InsertDriveFileRounded sx={{ color: colors.textSub }} />}</Box>
                    <IconButton size="small" onClick={() => removeFile(index)} sx={{ position: "absolute", top: -6, right: -6, bgcolor: "white", boxShadow: 1, width: 20, height: 20, "&:hover": { bgcolor: "#fee2e2", color: colors.danger } }}>
                      <CloseRounded sx={{ fontSize: 12 }} />
                    </IconButton>
                  </Box>
                </Fade>
              ))}
            </Box>
          </Box>

          {/* Category */}
          <Box
            sx={{
              p: showErrors && category === null ? 1.5 : 0,
              borderRadius: "16px",
              border: showErrors && category === null ? `1px solid ${colors.danger}` : "none",
              bgcolor: showErrors && category === null ? `${colors.danger}05` : "transparent",
            }}
          >
            <FormLabel sx={{ ...labelStyle, color: showErrors && category === null ? colors.danger : labelStyle.color }}>
              Category <span style={{ color: colors.danger }}>*</span>
            </FormLabel>
            <Stack direction="row" sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}>
              {CATEGORY_LIST?.map((cat) => (
                <CategoryChip
                  key={cat?.value}
                  label={cat?.label}
                  selected={category === cat?.value}
                  onClick={() => {
                    setCategory(cat?.value);
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </EmailScrollArea>

      {/* FOOTER */}
      <Box sx={{ p: 2, borderTop: `1px solid ${colors.border}`, display: "flex", gap: 2, bgcolor: "#fff" }}>
        <Button
          fullWidth
          variant="outlined"
          disabled={loading}
          onClick={onClose}
          sx={{
            height: 48,
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: 600,
            borderColor: colors.border,
            color: colors.textSub,
            "&:hover": { borderColor: colors.textSub, bgcolor: "transparent" },
          }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          disabled={loading}
          onClick={() => handleSubmit(false)}
          sx={{
            height: 48,
            borderRadius: "50px",
            background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
            color: "#fff",
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "0 4px 14px rgba(124, 58, 237, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)",
            },
          }}
        >
          {loading ? "Saving..." : "Save & Go to List"}
        </Button>
      </Box>
    </Drawer>
  );
}

// import React, { useState, useRef, useEffect } from "react";
// import { Box, Typography, FormLabel, IconButton, Button, Drawer, useTheme, useMediaQuery, Avatar, Fade, Stack } from "@mui/material";
// import { ArrowForwardIosRounded as ArrowForwardIosRoundedIcon, AttachFileRounded, CloseRounded, InsertDriveFileRounded, NoteAddRounded } from "@mui/icons-material";
// import { EmailScrollArea } from "../../../ui/ScrollArea";
// import { useAuth } from "../../../../contexts/AuthContext";
// import { useTicket } from "../../../../contexts/useTicket";
// import { CategoryChip, CustomInput, colors, labelStyle } from "./utils";
// import { filesUploadApi } from "./../../../../apis/UploadFille";
// import { v4 as uuidv4 } from "uuid";
// import useCommonStore from "../../../../store/CommonStore";

// // --- 3. MAIN COMPONENT ---
// export default function CreateTicketDrawer({ open, onClose }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const fileInputRef = useRef(null);
//   const { user } = useAuth();
//   const { CATEGORY_LIST, addTicket } = useTicket();
//   const ImageId = uuidv4();

//   // Form State
//   const [category, setCategory] = useState(null);
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [attachments, setAttachments] = useState([]);
//   const [userName, setuserName] = useState(null);
//   const [projectCode, setprojectCode] = useState(null);
//   const { setTabId } = useCommonStore();
//   const [loading, setloading] = useState(false)

//   useEffect(() => {
//     if (open) {
//       setuserName(user?.id);
//       setprojectCode(user?.custid);
//     }
//   }, [open]);

//   // File Handlers
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const newFiles = Array.from(e.target.files).map((file) => ({
//         file,
//         preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
//       }));
//       setAttachments((prev) => [...prev, ...newFiles]);
//     }
//   };

//   const removeFile = (index) => {
//     setAttachments((prev) => prev.filter((_, i) => i !== index));
//   };

//   const HandleSubmit = async (addNew) => {
//     setloading(true)
//     let uploadFilePath = null;
//     try {
//       if (!attachments || attachments.length === 0) {
//       } else {
//         uploadFilePath = await filesUploadApi({
//           ukey: user?.ukey,
//           folderName: "Ticket",
//           uniqueNo: ImageId,
//           attachments: attachments?.map((file) => file.file),
//         });
//       }
//       const payload = {
//         category,
//         subject,
//         instruction: message,
//         attachment: uploadFilePath?.files ? uploadFilePath.files.map((file) => file.url).join(",") : "",
//         userName,
//         projectCode,
//         createdby: user?.custid,
//         custId: user?.id,
//         CorpId: user?.id,
//       };
//       if (addNew === true) {
//         const res = await addTicket(payload);
//         console.log("🚀 ~ HandleSubmit ~ res:", res)
//         return;
//       } else {
//         const res = await addTicket(payload);
//         console.log("🚀 ~ HandleSubmit ~ res:", res)
//         setTabId(2);
//         onClose();
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setloading(false)
//     }
//   };

//   return (
//     <Drawer
//       open={open}
//       onClose={onClose}
//       anchor="right"
//       sx={{ zIndex: 9999999999 }}
//       PaperProps={{
//         sx: {
//           width: isMobile ? "100%" : 500,
//           borderRadius: isMobile ? 0 : "16px 0 0 16px",
//           display: "flex",
//           flexDirection: "column",
//           bgcolor: "#fff",
//         },
//       }}
//     >
//       {/* HEADER */}
//       <Box
//         sx={{
//           p: 2,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           borderBottom: `1px solid ${colors.border}`,
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: 20,
//             fontWeight: 800,
//             color: colors.textMain,
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//           }}
//         >
//           <NoteAddRounded sx={{ color: colors.primary }} />
//           Create New Ticket
//         </Typography>

//         <IconButton onClick={onClose} sx={{ border: `1px solid ${colors.border}` }}>
//           <ArrowForwardIosRoundedIcon fontSize="small" />
//         </IconButton>
//       </Box>

//       {/* FORM CONTENT */}
//       <EmailScrollArea>
//         <Box sx={{ p: isMobile ? 2 : 4 }}>
//           {/* 1. Subject */}
//           <CustomInput label="Subject" placeholder="E.g. Login issue on mobile app" value={subject} onChange={(e) => setSubject(e.target.value)} />

//           {/* 2. Message */}
//           <CustomInput label="Message" placeholder="Describe your issue in detail..." multiline value={message} onChange={(e) => setMessage(e.target.value)} />

//           {/* 3. Attachments */}
//           <Box mb={4}>
//             <Box display="flex" alignItems="center" justifyContent="space-between">
//               <FormLabel sx={labelStyle}>Attachments</FormLabel>
//               {attachments.length > 0 && (
//                 <Typography variant="caption" color="text.secondary">
//                   {attachments.length} files
//                 </Typography>
//               )}
//             </Box>

//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//                 mt: 1,
//                 overflowX: "auto",
//                 pb: 1,
//                 "&::-webkit-scrollbar": { display: "none" },
//               }}
//             >
//               <IconButton
//                 onClick={() => fileInputRef.current.click()}
//                 sx={{
//                   width: 60,
//                   height: 60,
//                   borderRadius: "16px",
//                   border: "2px dashed #E5E7EB",
//                   color: colors.textSub,
//                   flexShrink: 0,
//                   "&:hover": {
//                     borderColor: colors.primary,
//                     color: colors.primary,
//                     bgcolor: colors.primaryLight,
//                   },
//                 }}
//               >
//                 <AttachFileRounded />
//               </IconButton>
//               <input type="file" multiple ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />

//               {attachments.map((file, index) => (
//                 <Fade in key={index}>
//                   <Box sx={{ position: "relative", flexShrink: 0 }}>
//                     <Box
//                       sx={{
//                         width: 60,
//                         height: 60,
//                         borderRadius: "14px",
//                         border: `1px solid ${colors.border}`,
//                         overflow: "hidden",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         bgcolor: "#F9FAFB",
//                       }}
//                     >
//                       {file.preview ? <Avatar src={file.preview} variant="square" sx={{ width: "100%", height: "100%" }} /> : <InsertDriveFileRounded sx={{ color: colors.textSub }} />}
//                     </Box>
//                     <IconButton
//                       size="small"
//                       onClick={() => removeFile(index)}
//                       sx={{
//                         position: "absolute",
//                         top: -6,
//                         right: -6,
//                         bgcolor: "white",
//                         boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//                         width: 20,
//                         height: 20,
//                         border: `1px solid ${colors.border}`,
//                         "&:hover": { bgcolor: "#fee2e2", color: colors.danger },
//                         zIndex: 9999,
//                       }}
//                     >
//                       <CloseRounded sx={{ fontSize: 12 }} />
//                     </IconButton>
//                   </Box>
//                 </Fade>
//               ))}
//             </Box>
//           </Box>

//           {/* 4. Category Selection (Single Select Chips) */}
//           <Box>
//             <FormLabel sx={labelStyle}>
//               Category <span style={{ color: colors.danger }}>*</span>
//             </FormLabel>
//             <Stack
//               direction="row"
//               sx={{
//                 mt: 2,
//                 flexWrap: "wrap",
//                 gap: 1, // handles BOTH row & column gaps properly
//               }}
//             >
//               {CATEGORY_LIST?.map((cat) => (
//                 <CategoryChip key={cat?.value} label={cat?.label} selected={category === cat?.value} onClick={() => setCategory(cat?.value)} />
//               ))}
//             </Stack>
//           </Box>
//         </Box>
//       </EmailScrollArea>

//       {/* FOOTER ACTIONS */}
//       <Box
//         sx={{
//           p: 2,
//           borderTop: `1px solid ${colors.border}`,
//           display: "flex",
//           gap: 2,
//           bgcolor: "#fff",
//         }}
//       >
//         <Button
//           fullWidth
//           variant="outlined"
//           sx={{
//             height: 48,
//             borderRadius: "50px",
//             textTransform: "none",
//             fontWeight: 600,
//             borderColor: colors.border,
//             color: colors.textSub,
//             "&:hover": { borderColor: colors.textSub, bgcolor: "transparent" },
//           }}
//           onClick={() => HandleSubmit(true)}
//         >
//           Save & Add New
//         </Button>

//         <Button
//           fullWidth
//           variant="contained"
//           disableElevation
//           sx={{
//             height: 48,
//             borderRadius: "50px",
//             background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
//             color: "#fff",
//             textTransform: "none",
//             fontWeight: 700,
//             boxShadow: "0 4px 14px rgba(124, 58, 237, 0.3)",
//             "&:hover": {
//               background: "linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)",
//             },
//           }}
//           onClick={() => HandleSubmit(false)}
//         >
//           Save & Go to List
//         </Button>
//       </Box>
//     </Drawer>
//   );
// }
