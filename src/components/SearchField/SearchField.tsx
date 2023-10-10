import { Autocomplete } from "@mui/material";
import { SyntheticEvent, useCallback } from "react";
import { Ishow, IshowSearch } from "../../tvmaze-api-types";
import { useNavigate } from "react-router-dom";
import { SearchItem } from "./SearchItem";
import { SearchWrapper } from "./SearchWrapper";
import { StyledInputBase } from "./StyledInputBase";
import { useSearchShow } from "../../apiHooks/useSearchShow";

interface Props {
  onSelect?: (e: Ishow) => void;
}

export const SearchField = ({ onSelect }: Props) => {
  const navigate = useNavigate();

  const { data, isLoading, setSearch } = useSearchShow();

  const handleSelect = useCallback(
    (event: SyntheticEvent, show: string | IshowSearch | null) => {
      if (!show || typeof show === "string") return;

      onSelect?.(show.show);
      navigate(`/${show.show.id}`);
    },
    [navigate, onSelect]
  );

  const handleSearch = useCallback(
    (event: SyntheticEvent, value: string) => setSearch(value),
    [setSearch]
  );

  return (
    <Autocomplete
      fullWidth
      freeSolo
      loading={isLoading}
      options={data}
      onInputChange={handleSearch}
      onChange={handleSelect}
      renderInput={({
        InputLabelProps,
        InputProps: { endAdornment, className, ...InputProps },
        ...rest
      }) => (
        <SearchWrapper>
          <StyledInputBase
            {...InputProps}
            {...rest}
            type="search"
            placeholder="Search…"
          />
        </SearchWrapper>
      )}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.show.name
      }
      renderOption={(props, option) => (
        <SearchItem key={option.show.id} props={props} show={option.show} />
      )}
    />
  );
};
