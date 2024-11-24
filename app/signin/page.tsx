"use client";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "./components/customInput";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  userName: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(26, "Username must not exceed 26 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username must contain only English letters and numbers without spaces or special characters"
    )
    .required("Username is required"),
});

export default function SignInPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const { userName } = data;
    document.cookie = `userName=${userName}; Path=/; Max-Age=86400; Secure; SameSite=Strict`;

    router.push("/dashboard/home");
  };
  return (
    <Box className="flex flex-col items-center justify-center p-10 h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="flex flex-col gap-4 max-w-sm w-full">
          <Box className="font-semibold text-white text-3xl mb-4">Sign-in</Box>
          <CustomInput
            {...register("userName")}
            placeholder="Username"
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#49A569",
              textTransform: "none",
              borderRadius: "8px",
              fontSize: "20px",
              height: "44px",
            }}
          >
            Sign-in
          </Button>
        </Box>
      </form>
    </Box>
  );
}
