import * as React from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { selectMode } from "../../../features/dashboard/dashboardSlice";
import { useAppSelector } from "../../../app/store";

export interface IModalProps {
  isOpen: boolean;

  onClose: (isOpen: boolean) => void;

  children: React.ReactNode;
  styles?: React.CSSProperties;
}

export default function CustomModal({
  isOpen,
  onClose,
  children,
  styles,
}: IModalProps) {
  const mode = useAppSelector(selectMode);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  const style = (style?: React.CSSProperties) => {
    return {
      position: "absolute",

      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",

      bgcolor: mode === "dark" ? "#303841" : "background.paper",
      border: "none",
      borderRadius: "1rem",

      boxShadow: 24,

      ...style,
    };
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style(styles)}>{children}</Box>
      </Fade>
    </Modal>
  );
}
