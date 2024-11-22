"use client";
import DialogCustom from "@/components/dialog";
import MenuCustom from "@/components/menu";
import { useBackDrop } from "@/providers/backdrop.provider";
import { usePosts } from "@/providers/posts.provider";
import AxiosInstance from "@/utils/axiosInstane";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  TextField
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import FormCreate from "./formCreate";
import PostList from "./postList";

export default function PostFeed() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const { postsList, addPosts, addPostType, postsTypeList } = usePosts();
  const { openLoading } = useBackDrop();

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
  };

  const handleConfirmCreate = () => {
    console.log("confirm");
  };

  const fetchData = async (keyword?: string) => {
    openLoading(true);
    try {
      const response = await AxiosInstance.get("/posts", {
        params: { keyword: keyword },
      });

      openLoading(false);
      addPosts(response.data.data);
    } catch (error) {
      openLoading(false);
      throw error;
    }
  };

  const fetchPostType = async () => {
    openLoading(true);
    try {
      const response = await AxiosInstance.get("/post-type");
      addPostType(response.data.data)
      openLoading(false);
      
    } catch (error) {
      openLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
    fetchPostType();
  }, []);

  return (
    <Box className="flex flex-col w-full px-8 py-6 ">
      <Grid size={{ xs: 12, md: 8 }} container>
        <Grid className="flex flex-col gap-10 w-full">
          <Box className="flex items-center w-full gap-2">
            <TextField
              onChange={(e) => {
                if (e.target.value.length > 2 || e.target.value.length == 0) {
                  fetchData(e.target.value);
                }
              }}
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
            <MenuCustom color="black" variant={'contained'} lists={postsTypeList}/>
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
          {postsList?.length > 0 && (
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
          )}
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
