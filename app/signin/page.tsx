import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function SignInPage() {
  return (
    <Box className="flex flex-col items-center justify-center p-10 h-full w-full">
       
      <Box className="flex flex-col gap-4 max-w-sm w-full">
      <Box className="font-semibold text-white text-3xl mb-4">Sign-in</Box>
        <input placeholder="Username" className="rounded-lg p-2 border border-[#c2b6b6] outline-none h-11 text-2xl" />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#49A569",
            textTransform: "none",
            borderRadius: "8px",
            fontSize: "20px",
            height: "44px"
          }}
        >
          Sign-in
        </Button>
      </Box>
    </Box>
  );
}
