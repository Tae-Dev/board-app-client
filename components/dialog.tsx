import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

type PropsType = {
  title: string;
  content?: React.ReactNode;
  open: boolean;
  titleConfirm: string;
  titleCancel: string;
  handleClose: () => void;
  handleConfirmWithData?: () => void;
  cancelButtonColor?: string;
  confirmButtonColor?: string;
};

export default function DialogCustom(props: PropsType) {
  const {
    title,
    content,
    open,
    titleConfirm,
    titleCancel,
    handleClose,
    handleConfirmWithData,
    cancelButtonColor,
    confirmButtonColor,
  } = props;

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: cancelButtonColor ? cancelButtonColor : "#49A569",
              borderColor: cancelButtonColor ? cancelButtonColor : "#49A569",
            }}
            variant="outlined"
            autoFocus
            onClick={handleClose}
          >
            {titleCancel}
          </Button>
          <Button
            sx={{
              backgroundColor: confirmButtonColor
                ? confirmButtonColor
                : "#49A569",
            }}
            variant="contained"
            onClick={handleConfirmWithData}
            autoFocus
          >
            {titleConfirm}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
