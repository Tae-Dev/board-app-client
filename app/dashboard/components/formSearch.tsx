import { Box, Button, InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MenuCustom from "@/components/menu";
import { usePosts } from "@/providers/posts.provider";
import { useState } from "react";

type PropsType = {
  fetchData: (keyword?: string, postTypeId?: string) => Promise<void>;
  handleOpenModalCreate: () => void;
};

export default function FormSearch(props: PropsType) {
  const { fetchData, handleOpenModalCreate } = props;
  const { postsTypeList } = usePosts();
  const [postTypeIdSelect, setPostTypeIdSelect] = useState<number | "">();
  const [keywordSearch, setKeywordSearch] = useState("");

  const handleSelectPostTypeValue = (id: number | "") => {
    console.log("id", id);
    setPostTypeIdSelect(id);
    fetchData(keywordSearch, id.toString());
  };

  return (
    <Box className="flex flex-col gap-4 md:flex-row items-center w-full justify-between">
      <TextField
        fullWidth
        onChange={(e) => {
          if (e.target.value.length > 2 || e.target.value.length == 0) {
            setKeywordSearch(e.target.value);
            fetchData(e.target.value, postTypeIdSelect?.toString());
          }
        }}
        sx={{
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
      <Box className="flex">
        <MenuCustom
          color="black"
          variant={"contained"}
          lists={postsTypeList}
          handleSelectPostTypeValue={handleSelectPostTypeValue}
        />
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
    </Box>
  );
}
