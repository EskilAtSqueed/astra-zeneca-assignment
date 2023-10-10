import { AppBar, Slide, styled } from "@mui/material";
import { useEffect, useState } from "react";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: "auto",
  bottom: 0,
  padding: theme.spacing(1),
  background: theme.palette.error.main,
  color: theme.palette.error.contrastText,
}));

export const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <Slide in={!isOnline} direction="up">
      <StyledAppBar>Connection: Offline</StyledAppBar>
    </Slide>
  );
};
