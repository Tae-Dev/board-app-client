"use client";
import AvatarCustom from "@/components/avatar";
import { useBackDrop } from "@/providers/backdrop.provider";
import { usePosts } from "@/providers/posts.provider";
import AxiosInstance from "@/utils/axiosInstane";
import GetCookieValue from "@/utils/getCookieValue";
import { yupResolver } from "@hookform/resolvers/yup";
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
  TextField,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import CommentList from "./commentList";
import CustomNameList from "./customNameList";

const validationSchema = Yup.object({
  comment: Yup.string().required("Comment is required"),
});

export default function PostDetail() {
  const router = useRouter();
  const { id } = useParams();
  const { addPostById, postById } = usePosts();
  const { openLoading } = useBackDrop();
  const [isComment, setIsComment] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: "",
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    getPostById(id);
  }, [id]);

  const onClickBackIcon = () => {
    router.back();
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

  const onSubmit = async (data: { comment: string }) => {
    const userName = GetCookieValue("userName");
    openLoading(true);
    try {
      const response = await AxiosInstance.post("/posts/comment", {
        comment: data.comment,
        userName: userName,
        postId: postById?.id,
      });
      setIsComment(false);
      getPostById(id);
      openLoading(false);
    } catch (error) {
      openLoading(false);
      throw error;
    }
  };

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
                sx={{ width: 16, height: 16, color: "#939494" }}
              />
              <ListItemText
                primary={`${postById?.comment.length} Comment`}
                sx={{ fontSize: 12, color: "#939494" }}
              />
            </Box>
          </ListItem>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="p-4">
              {!isComment ? (
                <Button
                  color="success"
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  onClick={() => setIsComment(true)}
                >
                  Add Comment
                </Button>
              ) : (
                <Box className="flex flex-col gap-2 items-end">
                  <TextField
                    {...register("comment")}
                    error={!!errors.comment}
                    helperText={errors.comment?.message}
                    minRows={10}
                    multiline
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#49A569",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                          color: "inherit",
                        },
                      },
                    }}
                    size="small"
                    variant="outlined"
                    placeholder="What’s on your mind..."
                  />
                  <Box className="flex gap-2">
                    <Button
                      sx={{ color: "#49A569", borderColor: "#49A569" }}
                      variant="outlined"
                      autoFocus
                      onClick={() => setIsComment(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      sx={{ backgroundColor: "#49A569" }}
                      variant="contained"
                      autoFocus
                      type="submit"
                    >
                      Confirm
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </form>
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
