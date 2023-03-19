import * as React from "react";
import { CssBaseline, Box, Typography, Container, Stack } from "@mui/material";
import Link from "next/link";

export default function StickyFooter() {
  return (
    <>
      <CssBaseline />

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#212121" : "#212121",
        }}
      >
        <Container maxWidth="sm">
          <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            // spacing={2}
            display="flex"
          >
            <Typography variant="body1">
              Data Provided by{" "}
              <Link href="https://www.coingecko.com/en/api/documentation" target="_blank">CoinGecko</Link>.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
