import React, { useState } from "react";
import { Box, Typography, IconButton, Chip, Avatar, Card, Divider, Button, Tabs, Tab, Stack, Grid } from "@mui/material";
import { AttachFileRounded, AccessTimeRounded, CheckCircleRounded, InsertDriveFileRounded, ImageRounded, DescriptionRounded, ChatBubbleRounded, StarRounded } from "@mui/icons-material";
import { EmailScrollArea } from "../../../ui/ScrollArea";
import SwipeableBottomDrawer from "../../../ui/SwipeableDrawer";
import { colors } from "../../Training/details";
import { Close as CloseIcon } from "@mui/icons-material";
import { FormatTime, formatRobustDate } from "../../../../utils/dateFormatter";
import RatingCard from "../../../ui/RatingCard";
import CommentInput from "./CommentInput";
import { getStatusStyle } from "../../../../utils/FiltersOptions";
import { DataParser, ValidateAttachment } from "../../../../utils/ticketUtils";
import { useAuth } from "../../../../contexts/AuthContext";
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import UniversalPreviewDrawer from "../../../ui/Previewer";


const TicketDetailView = ({ open, onClose, onCloseTicketOpen, onCloseRatingOpen, data }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useAuth();
  const ticketData = data || {};

  const formatDate = (dateString) => {
    const formatted = formatRobustDate(dateString);
    return formatted?.calendar || "-";
  };

  const formatCommentDate = (dateString) => {
    const formatted = formatRobustDate(dateString);
    return formatted?.relative || "-";
  };

  const RatingObject = DataParser(ticketData?.Rating || "[]", true).data;

  const Comments = DataParser(ticketData?.comments || "[]", true).data;

  const AllAttachments = Comments?.flatMap((comment) => {
    const { attachments } = ValidateAttachment(comment);

    if (!attachments || attachments?.length === 0) return [];

    return attachments?.map((url) => ({
      url,
      user: comment?.Name || "",
      commentId: comment?.id,
      time: comment?.time || "",
    }));
  });



  return (
    <>
      <SwipeableBottomDrawer open={Boolean(open)} onClose={onClose}>
        <EmailScrollArea
          sx={{
            px: 1.5,
          }}
        >
          {/* App Bar */}
          {/* Scrollable Content */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Box sx={{ pr: 2 }}>
              <Typography
                variant="overline"
                sx={{
                  color: colors.textSecondary,
                  fontWeight: 700,
                  letterSpacing: 1,
                  lineHeight: 1,
                }}
              >
                Support Ticket
              </Typography>
              <Typography variant={"h5"} sx={{ fontWeight: 800, mt: 0.5, lineHeight: 1.2 }}>
                TICKET {ticketData?.TicketNo}
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ bgcolor: colors.bg, mt: -0.5, mr: -1 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>

          {/* Status & Rating Bar */}
          <Stack direction="row" spacing={2} justifyContent={"space-between"} alignItems="center" sx={{ mb: 3 }}>
            {ticketData?.Status && (
              <Chip
                label={ticketData?.Status}
                size="small"
                sx={{
                  bgcolor: getStatusStyle(ticketData?.Status?.toLowerCase()).bg,
                  color: getStatusStyle(ticketData?.Status?.toLowerCase()).color,
                  fontWeight: 700,
                  borderRadius: 15,
                  fontSize: 12.5,
                  borderRadius: 12,
                  px: 1.2,
                  height: 28,
                }}
              />
            )}

            {ticketData?.Status?.toLowerCase() === "closed" && !ticketData?.Rating && (
              <Chip
                onClick={onCloseRatingOpen}
                label={
                  <Stack direction="row" alignItems="center" spacing={0.7}>
                    <StarRounded style={{ fontSize: 16 }} />
                    <span>Rate this</span>
                  </Stack>
                }
                size="small"
                sx={{
                  bgcolor: "rgba(255,200,0,0.12)",
                  color: "#CA8A04",
                  fontWeight: 600,
                  fontSize: 12.5,
                  borderRadius: 12,
                  px: 1.2,
                  height: 28,
                  "& .MuiChip-label": {
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    px: 0.5,
                  },
                }}
              />
            )}
          </Stack>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              WebkitOverflowScrolling: "touch",
              pb: { xs: 7, sm: 11 },
            }}
          >
            <Box>
              {/* Ticket Header */}
              <Card
                sx={{
                  borderRadius: { xs: 2.5, sm: 3 },
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
                  background: "#ffffff",
                  mb: { xs: 2, sm: 2.5 },
                  overflow: "hidden",
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                  <Grid container spacing={1.5}>
                    {/* Title */}
                    <Grid item sm={12} xs={12}>
                      <Typography
                        sx={{
                          fontSize: { xs: 11, sm: 12 },
                          fontWeight: 600,
                          color: "#888",
                          mb: 1,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Subject
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: 18, sm: 20 },
                          fontWeight: 700,
                          color: "#1a1a1a",
                          mb: 1.5,
                          lineHeight: 1.3,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {ticketData?.subject}
                      </Typography>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    {/* Customer Info */}
                    <Grid item sm={6} xs={6}>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: { xs: 11, sm: 12 },
                            fontWeight: 600,
                            color: "#888",
                            mb: 1,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Company
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              fontSize: 15,
                            }}
                          >
                            {ticketData?.companyname?.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: { xs: 13, sm: 14 },
                                fontWeight: 600,
                                color: "#1a1a1a",
                                lineHeight: 1.3,
                                textTransform: "capitalize",
                              }}
                            >
                              {ticketData?.username}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: { xs: 11, sm: 12 },
                                color: "#888",
                                lineHeight: 1.3,
                                textTransform: "capitalize",
                              }}
                            >
                              {ticketData?.companyname}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item sm={6} xs={6}>
                      {/* Dates */}
                      <Box>
                        <Typography
                          sx={{
                            fontSize: { xs: 11, sm: 12 },
                            fontWeight: 600,
                            color: "#888",
                            mb: 1,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Timeline
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AccessTimeRounded sx={{ fontSize: 16, color: "#888" }} />
                            <Typography sx={{ fontSize: { xs: 12, sm: 13 }, color: "#666" }}>Created: {formatDate(ticketData?.CreatedOn)}</Typography>
                          </Box>
                          {ticketData?.UpdatedAt && (<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CheckCircleRounded sx={{ fontSize: 16, color: "#43e97b" }} />
                            <Typography sx={{ fontSize: { xs: 12, sm: 13 }, color: "#666" }}>Updated: {formatDate(ticketData?.UpdatedAt)}</Typography>
                          </Box>)}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      {/* Last Updated */}
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#5E6C84",
                            mt: 2,
                            lineHeight: 1.5,
                          }}
                        >
                          Created on <strong>{FormatTime(ticketData?.CreatedOn, "shortDate")}</strong>
                          {ticketData?.CreatedBy && (
                            <>
                              {" "}by <strong>{ticketData?.CreatedBy}</strong> on behalf of <strong>{ticketData?.username}</strong> for <strong>{ticketData?.companyname}</strong>.
                            </>
                          )}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item sm={12} xs={12} justifyContent={"flex-end"} display={"flex"} alignItems={"center"} width={"100%"}>
                      {/* Close Ticket */}
                      {ticketData?.Status?.toLowerCase() !== "closed" && (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={onCloseTicketOpen}
                          sx={{
                            borderRadius: "50px",
                            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                            color: "#fff",
                            textTransform: "none",
                            fontWeight: 700,
                            boxShadow: "0 4px 12px rgba(220,38,38,0.25)",
                            "&:hover": {
                              background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                            },
                          }}
                        >
                          Close Ticket
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Card>
              {!!ticketData?.Rating && <RatingCard rating={RatingObject?.[0]?.RatingValue} feedback={RatingObject?.[0]?.RatingDescription} user={RatingObject?.[0]?.RatingBy} time={RatingObject?.[0]?.EntryDate} />}

              {/* Tabs */}
              <Card
                sx={{
                  borderRadius: { xs: 2.5, sm: 3 },
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
                  background: "#ffffff",
                  mb: { xs: 2, sm: 2.5 },
                  overflow: "hidden",
                }}
              >
                <Tabs
                  value={selectedTab}
                  onChange={(e, newValue) => setSelectedTab(newValue)}
                  sx={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                    "& .MuiTab-root": {
                      fontSize: { xs: 12, sm: 13 },
                      fontWeight: 600,
                      textTransform: "none",
                      minHeight: { xs: 48, sm: 52 },
                      color: "#888",
                      "&.Mui-selected": {
                        color: "#667eea",
                      },
                    },
                    "& .MuiTabs-indicator": {
                      height: 3,
                      borderRadius: "3px 3px 0 0",
                      background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    },
                  }}
                >
                  <Tab icon={<ChatBubbleRounded sx={{ fontSize: 18 }} />} iconPosition="start" label="Comments" />
                  <Tab icon={<AttachFileRounded sx={{ fontSize: 18 }} />} iconPosition="start" label="Attachments" />
                </Tabs>

                {/* Tab Content */}
                <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                  {/* Activity Tab */}
                  {selectedTab === 0 && (
                    <>
                      {(!Comments || Comments?.length === 0) && (
                        <Box
                          sx={{
                            textAlign: "center",
                            py: 4,
                            color: "#888",
                            fontSize: 14,
                          }}
                        >
                          <QuestionAnswerRoundedIcon sx={{ fontSize: 40, color: "#ccc", mb: 1 }} />
                          <Typography>No comments available</Typography>
                        </Box>
                      )}
                      <Box>
                        {Comments?.map((activity, idx) => {
                          const { attachments } = ValidateAttachment(activity) || { attachments: [] };
                          const hasMessage = activity?.message && activity.message !== "null" && activity.message.trim() !== "";
                          const hasAttachments = attachments && attachments.length > 0;

                          // Only show if there's a message OR attachments
                          if (!hasMessage && !hasAttachments) return null;

                          return (
                            <Box
                              key={activity.id}
                              sx={{
                                display: "flex",
                                gap: 1.5,
                                mb: idx < Comments?.length - 1 ? 2.5 : 0,
                              }}
                            >
                              <Avatar
                                sx={{
                                  width: { xs: 36, sm: 40 },
                                  height: { xs: 36, sm: 40 },
                                  textTransform: "uppercase",
                                }}
                              >
                                {activity?.Name?.charAt(0)}
                              </Avatar>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 0.5,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: { xs: 13, sm: 14 },
                                      fontWeight: 600,
                                      color: "#1a1a1a",
                                    }}
                                  >
                                    {activity?.Name}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: { xs: 11, sm: 12 },
                                      color: "#aaa",
                                      ml: "auto",
                                    }}
                                  >
                                    {formatCommentDate(activity?.time)}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    bgcolor: "#f8f8f8",
                                    p: 1.5,
                                    borderRadius: 2,
                                    border: "1px solid rgba(0, 0, 0, 0.06)",
                                  }}
                                >
                                  {hasMessage ? (
                                    <Typography
                                      sx={{
                                        fontSize: { xs: 12, sm: 13 },
                                        color: "#666",
                                        lineHeight: 1.5,
                                        wordBreak: "break-word",
                                      }}
                                    >
                                      {activity?.message}
                                    </Typography>
                                  ) : (
                                    <Typography
                                      sx={{
                                        fontSize: { xs: 12, sm: 13 },
                                        color: "#888",
                                        fontStyle: "italic",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.8,
                                      }}
                                    >
                                      <FilePresentRoundedIcon sx={{ fontSize: 16 }} />
                                      Sent an attachment
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </>
                  )}

                  {/* Attachments Tab */}
                  {selectedTab === 1 && (
                    <Box>
                      {(!AllAttachments || AllAttachments.length === 0) && (
                        <Box
                          sx={{
                            textAlign: "center",
                            py: 4,
                            color: "#888",
                            fontSize: 14,
                          }}
                        >
                          <FilePresentRoundedIcon sx={{ fontSize: 40, color: "#ccc", mb: 1 }} />
                          <Typography>No attachments available</Typography>
                        </Box>
                      )}
                      {AllAttachments?.map((file, idx) => (
                        <Card
                          key={file?.id}
                          onClick={() => {
                            setSelectedFile(file?.url?.url);
                            setOpenDrawer(true);
                          }}
                          sx={{
                            mb: idx < AllAttachments?.length - 1 ? 1.5 : 0,
                            p: 1.5,
                            border: "1px solid rgba(0, 0, 0, 0.06)",
                            boxShadow: "none",
                            borderRadius: 2,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            "&:active": {
                              transform: "scale(0.98)",
                            },
                            "@media (hover: hover)": {
                              "&:hover": {
                                borderColor: "#667eea",
                                boxShadow: "0 2px 8px rgba(102, 126, 234, 0.15)",
                              },
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: 2,
                                background: file.type === "pdf" ? "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)" : file.type === "image" ? "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <FilePresentRoundedIcon sx={{ fontSize: 24, color: "#fff" }} />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                sx={{
                                  fontSize: { xs: 13, sm: 14 },
                                  fontWeight: 600,
                                  color: "#1a1a1a",
                                  mb: 0.25,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {
                                  file?.url?.url
                                    ?.split("/")
                                    .pop() // "I42013_1.svg"
                                    ?.split(".")[0]
                                }  - <Chip size="small" label={file?.url?.type} />
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: { xs: 11, sm: 12 },
                                  color: "#888",
                                }}
                              >
                                Uploaded by {file?.user} · {formatCommentDate(file?.time)}
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      ))}
                    </Box>
                  )}
                </Box>
                {ticketData?.Status?.toLowerCase() !== "closed" && <CommentInput user={user} userId={user?.id} TicketNo={data?.TicketNo} Role={1} />}
              </Card>
            </Box>
          </Box>
        </EmailScrollArea>
      </SwipeableBottomDrawer>
      <UniversalPreviewDrawer open={openDrawer} onClose={() => {
        setOpenDrawer(false);
        setSelectedFile(null);
      }} fileUrl={selectedFile} />

    </>
  );
};

export default TicketDetailView;
