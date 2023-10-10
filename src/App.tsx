import { Outlet } from "react-router-dom";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { AppBar } from "./components/AppBar";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <Paper component={Stack} height="100%" width="100%" alignItems="center">
      <AppBar />

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <Stack
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
              >
                There was an error!
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
                <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
              </Stack>
            )}
            onReset={reset}
          >
            <Suspense
              fallback={
                <Stack
                  width="100%"
                  height="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography>Loading...</Typography>
                </Stack>
              }
            >
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      <ConnectionStatus />
    </Paper>
  );
}

export default App;
