"use client";
import DialogCustom from "@/components/dialog";
import { useBackDrop } from "@/providers/backdrop.provider";
import { usePosts } from "@/providers/posts.provider";
import AxiosInstance from "@/utils/axiosInstane";
import GetCookieValue from "@/utils/getCookieValue";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { PostFeedTypeConstant } from "../constants/postFeedTypeConstant";
import FormCreate from "./formCreate";
import PostList from "./postList";
import MenuCustom from "@/components/menu";
import FormSearch from "./formSearch";

type PropsType = {
  postFeedType: PostFeedTypeConstant;
};

export default function PostFeed(props: PropsType) {
  const { postFeedType } = props;
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const { postsList, addPosts, addPostType, postsTypeList } = usePosts();
  const { openLoading, openBackDrop } = useBackDrop();

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
  };

  const handleConfirmCreate = async (data: any) => {
    const userName = GetCookieValue("userName");
    openLoading(true);
    try {
      const response = await AxiosInstance.post("/posts", {
        ...data,
        userName: userName,
      });
      setOpenModalCreate(false);
      fetchData();
      openLoading(false);
    } catch (error) {
      openLoading(false);
      throw error;
    }
  };

  const fetchData = async (keyword?: string, postTypeId?: string) => {
    const userName = GetCookieValue("userName");
    openLoading(true);
    try {
      const response = await AxiosInstance.get("/posts", {
        params: { keyword: keyword, postTypeId: postTypeId },
      });

      if (postFeedType == PostFeedTypeConstant.All) {
        addPosts(response.data.data);
      } else {
        let filterPosts = response.data.data.filter(
          (item: any) => item.userName == userName
        );
        addPosts(filterPosts);
      }
      openLoading(false);
    } catch (error) {
      openLoading(false);
      throw error;
    }
  };

  const fetchPostType = async () => {
    openLoading(true);
    try {
      const response = await AxiosInstance.get("/post-type");
      const mapData = [
        {
          id: null,
          title: "Choose a community",
        },
      ].concat(response.data.data);

      addPostType(mapData);
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
      <Grid size={{ xs: 12, md: 8 }} container sx={{ width: "100%" }}>
        <Grid className="flex flex-col gap-6 w-full">
          <FormSearch
            fetchData={fetchData}
            handleOpenModalCreate={handleOpenModalCreate}
          />
          {postsList?.length > 0 && !openBackDrop && (
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
              <PostList postFeedType={postFeedType} fetchPost={fetchData} />
            </Box>
          )}
        </Grid>
        <Grid></Grid>
      </Grid>
      <DialogCustom
        title="Create Post"
        content={<FormCreate handleConfirm={handleConfirmCreate} />}
        open={openModalCreate}
        handleClose={handleCloseModalCreate}
        titleConfirm="ok"
        titleCancel="Cancel"
        handleConfirmWithData={() => {
          const formElement = document.querySelector("form");
          if (formElement) formElement.requestSubmit();
        }}
      />
    </Box>
  );
}
