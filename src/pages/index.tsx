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
  Stack,
} from "@mui/material";
import StickyFooter from "../components/Footer";
import styles from "./index.module.css";

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
    const intervalId = setInterval(() => {
      axios
        .get(`http://localhost:8080/coins`)
        .then((response) => setCoins(response.data))
        .catch((error) => console.error(error));
    }, 2000); // 2 seconds in milliseconds
  
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
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
      <Container maxWidth="md" sx={{ my: 10 }}>
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={4}
          display="flex"
        >
          <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            display="flex"
          >
            <Typography variant="h1">Cryptocurrency</Typography>
            <Typography variant="h4">
              <i>
                <u className={styles.underline}>Current Market Prices</u>
              </i>
            </Typography>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" className={styles.underline}>
                  <Typography color="#fff" variant="h5">
                    Name
                  </Typography>
                </TableCell>
                <TableCell align="center" className={styles.underline}>
                  <Typography color="#fff" variant="h5">
                    Current Price
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayCoins.map((coin: any) => (
                <TableRow key={coin.id}>
                  <TableCell align="center" className={styles.underline}>
                    <Typography color="#fff">
                      {coin.name} ({coin.symbol})
                    </Typography>
                  </TableCell>
                  <TableCell align="center" className={styles.underline}>
                    <Typography color="#fff">{`$${coin.current_price.toFixed(
                      2
                    )}`}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={totalPages}
            color="primary"
            onChange={handleChange}
            page={page}
          />
        </Stack>
      </Container>
      <StickyFooter />
    </ThemeProvider>
  );
}
