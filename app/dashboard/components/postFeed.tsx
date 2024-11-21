"use client";
import MenuComponent from "@/components/menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  makeStyles,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostList from "./postList";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import DialogCustom from "@/components/dialog";
import FormCreate from "./formCreate";

export default function PostFeed() {
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
  };

  const handleConfirmCreate = () => {
    console.log('confirm');
    
  }

  return (
    <Box className="flex flex-col w-full px-8 py-6 ">
      <Grid size={{ xs: 12, md: 8 }} container>
        <Grid className="flex flex-col gap-10">
          <Box className="flex items-center">
            <TextField
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#000000de",
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
              placeholder="Search"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <MenuComponent />
            <Button
              onClick={handleOpenModalCreate}
              variant="contained"
              sx={{
                backgroundColor: "#49A569",
                textTransform: "none",
                borderRadius: "8px",
                fontSize: "16px",
                height: "40px",
              }}
              endIcon={<AddIcon />}
            >
              Create
            </Button>
          </Box>
          <Box
            className="overflow-y-auto "
            sx={{
              height: "calc(100vh - 200px)",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              borderRadius: 2,
            }}
          >
            <PostList />
          </Box>
        </Grid>
        <Grid></Grid>
      </Grid>
      <DialogCustom
        title="Create Post"
        content={<FormCreate />}
        open={openModalCreate}
        handleClose={handleCloseModalCreate}
        titleConfirm="ok"
        titleCancel="Cancel"
        handleConfirm={handleConfirmCreate}
      />
    </Box>
  );
}
