import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
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
  const [postTypeIdSelect, setPostTypeIdSelect] = useState<
    number | null | undefined | ""
  >();
  const [keywordSearch, setKeywordSearch] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);

  const handleSelectPostTypeValue = (id: number | "") => {
    setPostTypeIdSelect(id);
    fetchData(keywordSearch, id.toString());
  };

  return (
    <Box className="flex gap-4 w-full justify-between items-center">
      {toggleSearch ? (
        <TextField
          fullWidth
          onChange={(e) => {
            if (e.target.value.length > 2 || e.target.value.length == 0) {
              setKeywordSearch(e.target.value);
              fetchData(e.target.value, postTypeIdSelect?.toString());
              if (e.target.value.length == 0) {
                setToggleSearch(false);
              }
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
      ) : (
        <IconButton
          size="small"
          edge="end"
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            setToggleSearch(true);
          }}
          sx={{
            padding: 0,
            display: { xs: "inline", sm: "none" },
          }}
        >
          <SearchIcon />
        </IconButton>
      )}

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
          display: { xs: "none", sm: "inline" },
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
      {!toggleSearch && (
        <Box className="flex">
          <MenuCustom
            color="black"
            variant={"contained"}
            lists={postsTypeList}
            handleSelectPostTypeValue={handleSelectPostTypeValue}
            value={postTypeIdSelect}
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
      )}
    </Box>
  );
}
