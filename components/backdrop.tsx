import { Backdrop, CircularProgress } from "@mui/material";

type PropsType = {
  open: boolean;
};

export default function BackdropCustom(props: PropsType) {
  const { open } = props;
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: 1400 })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
