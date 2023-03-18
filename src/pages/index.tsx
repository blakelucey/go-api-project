import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
  createTheme,
  Pagination,
} from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0f0",
    },
    background: {
      default: "#111111",
      paper: "#212121",
    },
  },
  typography: {
    fontFamily: "Open Sans",
    h1: {
      fontFamily: "Ubuntu Mono",
    },
    h2: {
      fontFamily: "Ubuntu Mono",
    },
    h3: {
      fontFamily: "Ubuntu Mono",
    },
    h4: {
      fontFamily: "Ubuntu Mono",
    },
    h6: {
      fontFamily: "Ubuntu Mono",
    },
    h5: {
      fontFamily: "Ubuntu Mono",
    },
    subtitle1: {
      fontFamily: "Ubuntu Mono",
    },
    subtitle2: {
      fontFamily: "Ubuntu Mono",
    },
    button: {
      fontFamily: "Ubuntu Mono",
      fontWeight: 900,
    },
    overline: {
      fontFamily: "Ubuntu Mono",
    },
  },
});

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/coins`)
      .then((response) => setCoins(response.data))
      .catch((error) => console.error(error));
  }, []);

  console.log("Coins: ", coins);

  const coinsPerPage = 10;
  const totalCoins = coins.length;
  const totalPages = Math.ceil(totalCoins / coinsPerPage);

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const start = (page - 1) * coinsPerPage;
  const end = start + coinsPerPage;
  const displayCoins = coins.slice(start, end);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Typography variant="h1" align="center">
          Coins
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography color="#fff">Name</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="#fff">Symbol</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayCoins.map((coin: any) => (
              <TableRow key={coin.id}>
                <TableCell align="center">
                  <Typography color="#fff">{coin.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="#fff">{coin.symbol}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={totalPages}
          color="secondary"
          sx={{ my: 5, display: "flex", justifyContent: "center" }}
          onChange={handleChange}
          page={page}
        />
      </Container>
    </ThemeProvider>
  );
}
