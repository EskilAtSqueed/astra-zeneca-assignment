import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { teal } from "@mui/material/colors";
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useMatches,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./page/Home";
import { Info } from "./page/Info";

const queryClient = new QueryClient();

const theme = createTheme({
  components: {
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
  palette: {
    primary: {
      main: teal[200],
    },
  },
});

const isRouteHandel = (handle: any): handle is { hideSearch: boolean } =>
  typeof handle === "object" && "hideSearch" in handle;

export const useRouteHandle = () => {
  const location = useLocation();
  let matches = useMatches();
  const match = matches.reverse().find((m) => m.pathname === location.pathname);
  return match && isRouteHandel(match.handle) ? match.handle : undefined;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        handle: { hideSearch: true },
      },
      {
        path: ":id",
        element: <Info />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
