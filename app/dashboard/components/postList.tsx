"use client";
import AvatarCustom from "@/components/avatar";
import { usePosts } from "@/providers/posts.provider";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function PostList() {
  const router = useRouter();
  const {postsList} = usePosts()

  const onClickPost = (id: number) => {
    router.push(`/dashboard/home/${id}`);
  };

  useEffect(() => {
  }, [postsList])
  
  return (
    <List
      className="cursor-pointer"
      sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 2 }}
    >
      {postsList.map((item, i) => (
        <Box onClick={() => onClickPost(item.id)} key={i}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarCustom name={item.userName}/>
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
                sx={{ width: 12, height: 12, color: "#939494" }}
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
    </List>
  );
}
