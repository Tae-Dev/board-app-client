import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CustomNameList from "./customNameList";

export default function CommentList() {
  return (
    <Box>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item, i) => (
        <ListItem alignItems="flex-start" key={i}>
          <ListItemAvatar>
            <Avatar alt="taeza" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            sx={{
              marginTop: 2,
              fontSize: 24,
              fontWeight: 500,
              color: "#939494",
            }}
            primary={<CustomNameList name={"Potae"} date={"1 min"} />}
            secondary={
              <Box component="span">
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
      ))}
    </Box>
  );
}
