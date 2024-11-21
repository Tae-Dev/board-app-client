"use client";
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
import React from "react";

export default function PostList() {
  const router = useRouter();

  const onClickPost = (id: number) => {
    router.push(`/dashboard/home/${id}`);
  };

  return (
    <List
      className="cursor-pointer"
      sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 2 }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item, i) => (
        <Box onClick={() => onClickPost(item)} key={i}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="taeza" />
            </ListItemAvatar>
            <ListItemText
              sx={{
                marginTop: 2,
                fontSize: 24,
                fontWeight: 500,
                color: "#939494",
              }}
              primary="taeza"
            />
          </ListItem>

          <ListItem>
            <Chip label="History" size="small" />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <Box component="span" className="line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
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
                primary="432 comments"
                sx={{ fontSize: 12, color: "#939494" }}
              />
            </Box>
          </ListItem>

          {i < 13 && <Divider />}
        </Box>
      ))}
    </List>
  );
}
