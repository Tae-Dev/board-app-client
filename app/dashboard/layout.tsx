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
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuListConstant } from "./constants/menuListConstant";
import { useBackDrop } from "@/providers/backdrop.provider";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  backgroundColor: "#243831",
}));

type TemporaryDrawerPropsType = {
  selectedIndex: number;
  handleListItemClick: (event: any, index: number) => void;
  toggleDrawer: (newOpen: boolean) => () => void;
  open: boolean;
  handleSignOut: () => void;
};

export default function DashBoardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const router = useRouter();
  const { openLoading } = useBackDrop()
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);


  useEffect(() => {
    const pathSplit = pathname.split("/");
    const index = MenuListConstant.findIndex((f) => f.path === pathSplit[2]);
    setSelectedIndex(index);
  }, [pathname]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSignOut = () => {
    openLoading(true)
    document.cookie = "userName=; Path=/; Max-Age=0; Secure; SameSite=Strict";
    router.push("/signin");
    openLoading(false)
  };

  const handleListItemClick = (event: any, index: number) => {
    setSelectedIndex(index);
    router.push(`/dashboard/${MenuListConstant[index].path}`);
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
              onClick={handleSignOut}
            >
              Sign-Out
            </Button>
          </StyledToolbar>
        </AppBar>
      </Box>
      <Box className="bg-[#BBC2C0]" sx={{ height: "calc(100vh - 64px)" }}>
        <Grid container size={12} sx={{ height: "100%" }}>
          <Grid
            size={{ xs: 0, md: 3, lg: 3 }}
            sx={{ display: { xs: "none", md: "inherit" } }}
          >
            <List>
              {MenuListConstant.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                  >
                    <ListItemIcon sx={{ color: "#243831" }}>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      className="text-[#243831]"
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid size={{ xs: 12, md: 9, lg: 9 }}>{children}</Grid>
        </Grid>
      </Box>
      <TemporaryDrawer
        toggleDrawer={toggleDrawer}
        open={open}
        selectedIndex={selectedIndex}
        handleListItemClick={handleListItemClick}
        handleSignOut={handleSignOut}
      />
    </Box>
  );
}

const TemporaryDrawer = (props: TemporaryDrawerPropsType) => {
  const { toggleDrawer, open, selectedIndex, handleListItemClick, handleSignOut } = props;
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
        {MenuListConstant.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon sx={{ color: "white" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.name} className="text-white" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box className="p-4">
        <Button
        onClick={handleSignOut}
          variant="contained"
          sx={{
            backgroundColor: "#49A569",
            textTransform: "none",
            borderRadius: "8px",
            fontSize: "16px",
            height: "44px",
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
