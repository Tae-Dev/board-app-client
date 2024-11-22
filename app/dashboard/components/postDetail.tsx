"use client";
import AvatarCustom from "@/components/avatar";
import { useBackDrop } from "@/providers/backdrop.provider";
import { usePosts } from "@/providers/posts.provider";
import AxiosInstance from "@/utils/axiosInstane";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import CommentList from "./commentList";
import CustomNameList from "./customNameList";

export default function PostDetail() {
  const router = useRouter();
  const { id } = useParams();
  const { addPostById, postById } = usePosts();
  const { openLoading } = useBackDrop();

  const onClickBackIcon = () => {
    router.push(`/dashboard/home`);
  };

  const getPostById = async (id: string | string[] | undefined) => {
    openLoading(true);
    try {
      const response = await AxiosInstance.get("/posts", {
        params: { id: id },
      });
      addPostById(response.data.data);
      openLoading(false);
    } catch (error) {
      openLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    getPostById(id);
  }, [id]);

  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.paper",
        paddingX: { xs: 4, md: 20 },
        paddingTop: 4,
      }}
    >
      {postById && (
        <React.Fragment>
          <IconButton aria-label="delete" onClick={onClickBackIcon}>
            <ArrowBackIcon />
          </IconButton>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Badge
                color="success"
                variant="dot"
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <AvatarCustom name={postById?.userName} />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              sx={{
                marginTop: 2,
                fontSize: 24,
                fontWeight: 500,
                color: "#939494",
              }}
              primary={
                <CustomNameList
                  name={postById?.userName || ""}
                  date={postById?.updateDate || ""}
                />
              }
            />
          </ListItem>

          <ListItem>
            <Chip label={postById?.postType.title} size="small" />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={postById?.title}
              secondary={
                <Box component="span" className="line-clamp-2">
                  {postById?.description}
                </Box>
              }
            />
          </ListItem>

          <ListItem>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ChatBubbleOutlineIcon
                sx={{ width: 12, height: 12, color: "#939494" }}
              />
              <ListItemText
                primary={`${postById?.comment.length} Comment`}
                sx={{ fontSize: 12, color: "#939494" }}
              />
            </Box>
          </ListItem>

          <Box className="p-4">
            <Button
              color="success"
              variant="outlined"
              sx={{ textTransform: "none" }}
            >
              Add Comment
            </Button>
          </Box>

          <Box
            className="overflow-y-auto "
            sx={{
              height: "calc(100vh - 480px)",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <CommentList />
          </Box>
        </React.Fragment>
      )}
    </List>
  );
}
