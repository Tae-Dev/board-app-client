"use client";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  backgroundColor: "#243831",
}));

export default function DashBoardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };



  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <StyledToolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, marginTop: 1, fontStyle: "italic" }}
            >
              A Board
            </Typography>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{
                display: { sm: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#49A569",
                textTransform: "none",
                borderRadius: "8px",
                fontSize: "16px",
                height: "44px",
                display: { xs: "none", sm: "inherit" },
              }}
            >
              Sign-Out
            </Button>
          </StyledToolbar>
        </AppBar>
      </Box>
      <Box className="bg-[#BBC2C0]" sx={{ height: "calc(100vh - 64px)" }}>
        <Grid container size={12} sx={{height: "100%"}}>
          <Grid size={{xs: 0, md: 3, lg: 3}} sx={{display: {xs: 'none', md: 'inherit'}}}>
            <List>
              {["Home", "Our Board"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: "#243831" }}>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} className="text-[#243831]" />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid size={{xs: 12, md: 9, lg: 9}}>
            {children}
          </Grid>
          {/* <Grid size={{xs: 0, md: 3, lg: 3}} sx={{display: {xs: 'none', md: 'inherit'}}}></Grid> */}
        </Grid>
      </Box>
      <TemporaryDrawer toggleDrawer={toggleDrawer} open={open} />
    </Box>
  );
}

const TemporaryDrawer = (props: any) => {
  const { toggleDrawer, open } = props;
  const DrawerList = (
    <Box
      sx={{ width: 280, backgroundColor: "#243831", height: "100%" }}
      role="presentation"
    >
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(false)}
        sx={{ color: "white" }}
      >
        <ArrowForwardIcon />
      </IconButton>
      <List>
        {["Home", "Our Board"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} className="text-white" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box className="p-4">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#49A569",
            textTransform: "none",
            borderRadius: "8px",
            fontSize: "16px",
            height: "44px",
            display: { xs: "none", sm: "inherit" },
            width: "100%",
          }}
        >
          Sign-Out
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        slotProps={{
          backdrop: {
            style: { backgroundColor: "transparent" },
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
};
