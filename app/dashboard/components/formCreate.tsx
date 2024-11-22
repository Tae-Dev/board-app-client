import MenuCustom from "@/components/menu";
import { usePosts } from "@/providers/posts.provider";
import { Box, TextField } from "@mui/material";

export default function FormCreate() {
  const { postsTypeList } = usePosts();
  return (
    <Box className="flex flex-col gap-2">
      <MenuCustom lists={postsTypeList} />
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
        placeholder="Title"
      />
      <TextField
        minRows={10}
        multiline
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
        placeholder="What’s on your mind..."
      />
    </Box>
  );
}
