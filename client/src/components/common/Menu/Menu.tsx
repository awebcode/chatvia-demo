import * as React from "react";

import Avatar from "@mui/material/Avatar";
import { Icon } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Options } from "../../../models";
import { selectMode } from "../../../features/dashboard/dashboardSlice";
import { useAppSelector } from "../../../app/store";
import { useTranslation } from "react-i18next";

export interface IMenuProps {
  menu: Options[];

  img?: string;

  isActive?: boolean;

  direction: "rtl" | "ltr";

  icon?: React.ReactNode;
  menuItemStyle?: React.CSSProperties;

  onChange?: (value: any) => void;
}

export function CustomMenu({
  menu,
  img,
  icon,
  direction,
  menuItemStyle,
  onChange,
  isActive,
}: IMenuProps) {
  const mode = useAppSelector(selectMode);
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value: string) => {
    setAnchorEl(null);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", textAlign: "center" }}
      >
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            margin: "0 auto",
            color: mode === "dark" ? "#93a7cc" : "",
          }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {icon ? (
            <Icon sx={{ width: 30, height: 30 }}>{icon}</Icon>
          ) : img ? (
            <Avatar sx={{ width: 32, height: 32 }} src={img} />
          ) : null}
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            background: `${mode === "dark" ? "#313a43" : ""}`,
            color: mode === "dark" ? "#93a7cc" : "",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: direction === "ltr" ? 0 : 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before":
              direction === "rtl"
                ? {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: mode === "dark" ? "#313a43" : "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  }
                : {},
          },
        }}
        transformOrigin={{
          horizontal: direction === "rtl" ? "right" : "left",
          vertical: direction === "rtl" ? "top" : "bottom",
        }}
        anchorOrigin={{
          horizontal: direction === "rtl" ? "right" : "left",
          vertical: direction === "rtl" ? "bottom" : "top",
        }}
      >
        {menu.map((item, key) => {
          return (
            <MenuItem
              style={menuItemStyle}
              key={key}
              onClick={() => handleClose(item.name)}
              sx={{
                background: isActive ? `#7a7f9a` : "",
              }}
            >
              <div
                className={`w-full backdrop-blur-md h-full p-2 text-base capitalize font-medium flex justify-between`}
              >
                {item.img && (
                  <div className="img mr-4">
                    {" "}
                    <img
                      className="w-4 h-4 object-contain"
                      src={item.img}
                      alt=""
                    />{" "}
                  </div>
                )}
                <p className="text-left">{t(item.name)}</p>{" "}
                <div className="icon ml-4">
                  <Icon
                    sx={{ color: mode === "dark" ? "dark-mode-color" : "" }}
                  >
                    {" "}
                    {item.icon}{" "}
                  </Icon>
                </div>
              </div>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
