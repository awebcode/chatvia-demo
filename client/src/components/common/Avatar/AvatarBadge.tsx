import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

export interface IAvatarBadgeProps {
  avatar: string | undefined;
  alt?: string;

  status:
    | "online"
    | "leave"
    | "off"
    | "sent"
    | "delivered"
    | "read"
    | "unread"
    | undefined;
}

export function AvatarBadge({ avatar, status }: IAvatarBadgeProps) {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor:
        status === "online"
          ? "#44b700"
          : status === "leave"
          ? "#ffd166"
          : "red",
      color:
        status === "online"
          ? "#44b700"
          : status === "leave"
          ? "#ffd166"
          : "red",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar alt="Remy Sharp" src={avatar} />
    </StyledBadge>
  );
}
