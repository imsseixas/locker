// No arquivo src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button, Container, CssBaseline, Grid, Typography } from "@mui/material";
import JsBarcode from "jsbarcode";
import TelaCodigoBarras from "./TelaCodigoBarras";

function App() {
  const [pares, setPares] = useState([]);
  const [codigoAtual, setCodigoAtual] = useState("");

  useEffect(() => {
    const valorDaAPI = obterValorDaAPI();
    const pares = dividirEmPares(valorDaAPI);
    setPares(pares);
  }, []);

  const obterValorDaAPI = () => "123456789abcdefghijklmn";

  const dividirEmPares = (str) => str.match(/.{1,2}/g) || [];

  const gerarCodigoDeBarras = (par) => {
    setCodigoAtual(par);
    JsBarcode("#barcode-svg", par, {
      format: "CODE128",
      displayValue: false,
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div>
                <Typography variant="h5" align="center" gutterBottom>
                  Gerador de Códigos de Barras
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {pares.map((par, index) => (
                    <Grid item key={index}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => gerarCodigoDeBarras(par)}
                      >
                        Botão {index + 1}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <Typography variant="subtitle1">Código Atual: {codigoAtual}</Typography>
                  <div id="barcode-container" style={{ marginTop: "10px" }}>
                    <svg id="barcode-svg"></svg>
                  </div>
                </div>
                <Link to="/tela-codigo-barras" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: "20px", width: "100%" }}
                  >
                    Ir para Tela de Código de Barras
                  </Button>
                </Link>
              </div>
            </Container>
          }
        />
        <Route path="/tela-codigo-barras" element={<TelaCodigoBarras />} />
      </Routes>
    </Router>
  );
}

export default App;
