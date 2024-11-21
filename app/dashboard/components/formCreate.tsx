import MenuComponent from "@/components/menu";
import { Box, InputAdornment, TextField } from "@mui/material";

export default function FormCreate() {
  return (
    <Box className="flex flex-col gap-2">
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
