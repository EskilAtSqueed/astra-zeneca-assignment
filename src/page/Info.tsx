import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, styled, Stack } from "@mui/material";
import { IshowGuard } from "../utils/IshowGuard";
import { apiFetch } from "../utils/apiFetch";

const Header = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

export const Info = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ["show", id],
    queryFn: () => apiFetch(`https://api.tvmaze.com/shows/${id}`, IshowGuard),
    suspense: true,
  });

  if (data === undefined) return null;

  return (
    <Box width="100%" padding={2}>
      <Typography variant="h4">{data.name}</Typography>
      <Typography variant="body2">Genres: {data.genres.join(", ")}</Typography>
      <Header>
        <img src={data.image?.medium} alt={data.name} />

        <Typography
          dangerouslySetInnerHTML={{ __html: data.summary }}
          variant="body1"
        />
      </Header>
    </Box>
  );
};
