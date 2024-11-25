import AvatarCustom from "@/components/avatar";
import { usePosts } from "@/providers/posts.provider";
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import CustomNameList from "./customNameList";

export default function CommentList() {
  const { postById } = usePosts();
  return (
    <Box>
      {postById?.comment.map((item, i) => (
        <ListItem alignItems="flex-start" key={i}>
          <ListItemAvatar>
            <AvatarCustom name={item?.userNameComment}/>
          </ListItemAvatar>
          <ListItemText
            sx={{
              marginTop: 2,
              fontSize: 24,
              fontWeight: 500,
              color: "#939494",
            }}
            primary={
              <CustomNameList name={item?.userNameComment} date={item?.updateDate} />
            }
            secondary={<Box component="span">{item?.comment}</Box>}
          />
        </ListItem>
      ))}
    </Box>
  );
}
