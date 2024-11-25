import MenuCustom from "@/components/menu";
import { usePosts } from "@/providers/posts.provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField } from "@mui/material";
import { Resolver, useForm } from "react-hook-form";
import * as Yup from "yup";

type PropsType = {
  handleConfirm: (data: any) => void;
  editData?: CreatePostType
};

export type CreatePostType = {
  title: string;
  description: string;
  postTypeId: number | null;
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .max(512, "Password must be at least 512 characters")
    .required("Password is required"),
  postTypeId: Yup.number()
    .nullable()
    .typeError("Post Type ID must be a number or null")
    .required("Post Type ID is required"),
});

export default function FormCreate(props: PropsType) {
  const { handleConfirm, editData } = props;
  const { postsTypeList } = usePosts();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: editData ? editData.title : "",
      description: editData ? editData.description : "",
      postTypeId:  editData ? editData.postTypeId : postsTypeList?.length ? postsTypeList[0].id : null,
    },
    resolver: yupResolver(validationSchema) as Resolver<CreatePostType>,
  });

  const onSubmit = (data: CreatePostType) => {
    handleConfirm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="flex flex-col gap-2">
        <MenuCustom
          lists={postsTypeList}
          setValue={setValue}
          name="postTypeId"
          value={editData?.postTypeId}
        />
        <p style={{ margin: "4px 0", color: "#d32f2f", fontSize: "0.75rem" }}>
          {errors.postTypeId?.message}
        </p>
        <TextField
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#49A569",
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
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          minRows={10}
          multiline
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#49A569",
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
        <input type="submit" hidden />
      </Box>
    </form>
  );
}
