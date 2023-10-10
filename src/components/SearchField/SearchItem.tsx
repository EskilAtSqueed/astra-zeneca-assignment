import { ListItem, Stack, Typography, styled } from "@mui/material";
import { Ishow } from "../../tvmaze-api-types";

interface Props {
  props: React.HTMLAttributes<HTMLLIElement>;
  show: Ishow;
}

const Image = styled("img")({ height: "5rem" });

export const SearchItem = ({ show, props }: Props) => {
  return (
    <ListItem {...props}>
      <Stack flexDirection="row" gap={2}>
        <Image src={show.image?.medium} alt={`Show title: ${show.name}`} />
        <Stack>
          <Typography>{show.name}</Typography>
          <Typography variant="caption">
            genres: {show.genres.join(", ")}
          </Typography>
        </Stack>
      </Stack>
    </ListItem>
  );
};
