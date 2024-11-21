import { Box } from "@mui/material";
import Image from "next/image";
import Grid from "@mui/material/Grid2";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <Box className="w-screen h-screen bg-[#243831]">
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          height: "100%",
          justifyContent: "start",
        }}
        size={12}
      >
        <Grid
          size={{ xs: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",
            alignItems: "start",
            maxWidth: "100%",
            width: "100%",
            flexGrow: 1,
          }}
        >
          {children}
        </Grid>
        <Grid
          size={{ xs: 0, sm: 12, md: 5, lg: 4 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: "#2B5F44",
            borderTopLeftRadius: { xs: "0px", md: "36px" },
            borderEndStartRadius: { xs: "36px", md: "36px" },
            borderEndEndRadius: { xs: "36px", md: "0px" },
          }}
        >
          <Box className="p-10 flex flex-col items-center justify-center gap-10">
            <Image
              src="/static/images/notebook.png"
              width={300}
              height={300}
              alt=""
            />
            <Box className="text-white font-normal text-[28px] italic">a Board</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
