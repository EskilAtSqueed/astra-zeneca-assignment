import {
  Toolbar,
  AppBar as MuiAppBar,
  styled,
  Fade,
  IconButton,
} from "@mui/material";
import { PropsWithChildren, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchField } from "./SearchField/SearchField";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useRouteHandle } from "..";

const StyledToolbar = styled(Toolbar)({
  justifyContent: "space-between",
  alignItems: "center",
});

const Image = styled("img")({
  cursor: "pointer",
  height: 32,
});

export const AppBar = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const handle = useRouteHandle();

  const [searchOpen, setSearchOpen] = useState(false);

  const handleClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <>
      <MuiAppBar>
        <StyledToolbar>
          <Image onClick={handleClick} src="./tvm_api.png" alt="TV maze logo" />
          {handle?.hideSearch ? null : (
            <IconButton onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </IconButton>
          )}
        </StyledToolbar>
      </MuiAppBar>
      <Fade in={searchOpen && !handle?.hideSearch}>
        <MuiAppBar>
          <StyledToolbar>
            <SearchField onSelect={() => setSearchOpen(false)} />
            <IconButton onClick={() => setSearchOpen(false)}>
              <CloseIcon />
            </IconButton>
          </StyledToolbar>
        </MuiAppBar>
      </Fade>
      <Toolbar />
    </>
  );
};
