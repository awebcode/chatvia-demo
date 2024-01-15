import "../../pages/Dashboard.scss";

import * as React from "react";

import { BREAK_POINTS_NUMBER, socket } from "../../../../constants";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  onOpenConversation,
  selectMode,
  selectOpenConversation,
} from "../../dashboardSlice";
import { styled, useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Conversation } from "./Conversation";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { Header } from "./Header";
import IconButton from "@mui/material/IconButton";
import { Section } from "./Section";
import { Settings } from "../Setting/Settings";
import Toolbar from "@mui/material/Toolbar";
import { useWindowSize } from "../../../../hooks/useWindow";

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1.5),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),

  position: "relative",
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: "70%",
  ...(open && {
    width: `calc(70% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export function ConversationMain() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const openConversation = useAppSelector(selectOpenConversation);
  const { windowInnerWidth } = useWindowSize();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  //   const handleDrawerOpen = () => {
  //     setOpen(true);
  //   };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <AppBar
        sx={{ background: "transparent" }}
        className={`${openConversation ? "active" : ""} appbar`}
        open={open}
      >
        <Toolbar>
          {windowInnerWidth < BREAK_POINTS_NUMBER.md && (
            <IconButton
              sx={{ color: mode === "dark" ? "#fff" : "" }}
              onClick={() => dispatch(onOpenConversation(false))}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Header open={open} openDrawer={setOpen} />
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <Conversation />
        <Section />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Settings />
      </Drawer>
    </div>
  );
}
