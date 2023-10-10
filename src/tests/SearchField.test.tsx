import { PropsWithChildren } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SearchField } from "../components/SearchField/SearchField";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as RouterDom from "react-router-dom";
import { IshowSearch } from "../tvmaze-api-types";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const show1 = {
  score: 1,
  show: {
    id: 0,
    name: "Test title",
    genres: ["Drama"],
    summary: "lorem ipsum",
  },
} as IshowSearch;

const show2 = {
  score: 1,
  show: {
    id: 1,
    name: "Title",
    genres: ["Drama"],
    summary: "lorem ipsum",
  },
} as IshowSearch;

test("SearchField", async () => {
  const fetchMock = jest.fn(() =>
    Promise.resolve<Response>(new Response(JSON.stringify([show1, show2])))
  );
  jest.spyOn(global, "fetch").mockImplementation(fetchMock);

  jest.spyOn(RouterDom, "useNavigate").mockImplementation(jest.fn());

  render(<SearchField />, { wrapper });
  const inputElement = screen.queryByPlaceholderText("Search…");

  expect(inputElement).toBeInTheDocument();
  if (!inputElement) return;

  fireEvent.change(inputElement, { target: { value: "test" } });

  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock).toHaveBeenCalledWith(
    `https://api.tvmaze.com/search/shows?q=test`,
    expect.objectContaining({ isArray: true })
  );

  await waitFor(() => {
    expect(screen.getByText("Test title")).toBeInTheDocument();
  });

  let el = screen.queryByText("Test title");
  expect(el).toBeInTheDocument();
  el = screen.queryByText("Title");
  expect(el).not.toBeInTheDocument();
});
