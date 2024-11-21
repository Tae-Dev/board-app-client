"use client";
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
import Avatar from "@mui/material/Avatar";
import React from "react";
import CommentList from "./commentList";
import CustomNameList from "./customNameList";
import { useRouter } from "next/navigation";

export default function PostDetail() {
  const router = useRouter();

  const onClickBackIcon = () => {
    router.push(`/dashboard/home`);
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
              <Avatar alt="taeza" src="/static/images/avatar/1.jpg" />
            </Badge>
          </ListItemAvatar>
          <ListItemText
            sx={{
              marginTop: 2,
              fontSize: 24,
              fontWeight: 500,
              color: "#939494",
            }}
            primary={<CustomNameList name={"Potae"} date={"1 min"} />}
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
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
    </List>
  );
}
