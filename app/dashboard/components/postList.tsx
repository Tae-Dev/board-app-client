"use client";
import AvatarCustom from "@/components/avatar";
import { Post, usePosts } from "@/providers/posts.provider";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PostFeedTypeConstant } from "../constants/postFeedTypeConstant";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogCustom from "@/components/dialog";
import FormCreate, { CreatePostType } from "./formCreate";
import GetCookieValue from "@/utils/getCookieValue";
import { useBackDrop } from "@/providers/backdrop.provider";
import AxiosInstance from "@/utils/axiosInstane";

type PropsType = {
  postFeedType: PostFeedTypeConstant;
  fetchPost: (keyword?: string) => Promise<void>;
};

export default function PostList(props: PropsType) {
  const router = useRouter();
  const { postsList } = usePosts();
  const { openLoading } = useBackDrop();
  const { postFeedType, fetchPost } = props;
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [postEdit, setPostEdit] = useState<CreatePostType>();
  const [postId, setPostId] = useState<number>();

  const handleClickEdit = (item: Post) => {
    setPostEdit({
      title: item.title,
      description: item.description,
      postTypeId: item.postType.id,
    });
    setPostId(item.id);
    setOpenModalEdit(true);
  };

  const handleClickDelete = (item: Post) => {
    setPostId(item.id);
    setOpenModalDelete(true);
  };

  const onClickPost = (id: number) => {
    router.push(`/dashboard/home/${id}`);
  };

  const handleConfirmEdit = async (data: any) => {
    const userName = GetCookieValue("userName");
    console.log("confirm", data);

    openLoading(true);
    try {
      const response = await AxiosInstance.patch("/posts", {
        ...data,
        id: postId,
        userName: userName,
      });

      openLoading(false);
      setOpenModalEdit(false);
      await fetchPost();
    } catch (error) {
      openLoading(false);
      throw error;
    }
  };

  const handleConfirmDelete = async () => {
    const userName = GetCookieValue("userName");

    openLoading(true);
    try {
      const response = await AxiosInstance.delete(`/posts`, {
        params: { id: postId },
        data: {
          userName: userName,
        },
      });

      openLoading(false);
      setOpenModalDelete(false);
      await fetchPost();
    } catch (error) {
      openLoading(false);
      throw error;
    }
  };

  return (
    <List
      className="cursor-pointer"
      sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 2 }}
    >
      {postsList.map((item, i) => (
        <Box
          onClick={(e) => {
            onClickPost(item.id);
          }}
          key={i}
        >
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <Box>
                {postFeedType == PostFeedTypeConstant.Self && (
                  <Box className="flex gap-2">
                    <IconButton
                      size="small"
                      edge="end"
                      sx={{ color: "#2B5F44" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickEdit(item);
                      }}
                    >
                      <BorderColorIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      edge="end"
                      sx={{ color: "#2B5F44" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickDelete(item);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            }
          >
            <ListItemAvatar>
              <AvatarCustom name={item.userName} />
            </ListItemAvatar>
            <ListItemText
              sx={{
                marginTop: 2,
                fontSize: 24,
                fontWeight: 500,
                color: "#939494",
              }}
              primary={item.userName}
            />
          </ListItem>

          <ListItem>
            <Chip label={item.postType.title} size="small" />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={item.title}
              secondary={
                <Box component="span" className="line-clamp-2">
                  {item.description}
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
                primary={`${item.commentCount} Comment`}
                sx={{ fontSize: 12, color: "#939494" }}
              />
            </Box>
          </ListItem>

          {i < postsList.length - 1 && <Divider />}
        </Box>
      ))}
      <DialogCustom
        title="Edit Post"
        content={
          <FormCreate handleConfirm={handleConfirmEdit} editData={postEdit} />
        }
        open={openModalEdit}
        handleClose={() => {
          setOpenModalEdit(false);
        }}
        titleConfirm="ok"
        titleCancel="Cancel"
        handleConfirmWithData={() => {
          const formElement = document.querySelector("form");
          if (formElement) formElement.requestSubmit();
        }}
      />
      <DialogCustom
        title="Please confirm if you wish to 
delete the post"
        content={
          <p className="text-[#5B5B5B]">
            Are you sure you want to delete the post? Once deleted, it cannot be
            recovered.
          </p>
        }
        open={openModalDelete}
        handleClose={() => {
          setOpenModalDelete(false);
        }}
        handleConfirmWithData={handleConfirmDelete}
        titleConfirm="Delete"
        titleCancel="Cancel"
        cancelButtonColor="#5B5B5B"
        confirmButtonColor="#F23536"
      />
    </List>
  );
}
