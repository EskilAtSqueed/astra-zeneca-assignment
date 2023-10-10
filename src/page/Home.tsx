import { Stack, Typography } from "@mui/material";
import { SearchField } from "../components/SearchField";

export const Home = () => {
  return (
    <Stack width="50%">
      <Typography
        variant="h4"
        textAlign="center"
        marginTop={2}
        marginBottom={2}
      >
        Find your favorite show
      </Typography>
      <SearchField />
    </Stack>
  );
};
