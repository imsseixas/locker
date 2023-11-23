import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button, Container, CssBaseline, Grid, Typography } from "@mui/material";
import JsBarcode from "jsbarcode";
import TelaCodigoBarras from "./TelaCodigoBarras";

function App() {
  const [qrCodes, setQrCodes] = useState([]);
  const [codigoAtual, setCodigoAtual] = useState("");
  const [codUsuarioAtual, setCodUsuarioAtual] = useState(""); // Novo estado para armazenar o cod_usuario correspondente
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const pagesToShow = 5;

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await fetch("https://dartapi3.onrender.com/dados");
        const data = await response.json();

        console.log(data); // Verifica os dados recebidos da API

        const qrCodes = Array.isArray(data) ? data : [];
        setQrCodes(qrCodes);
      } catch (error) {
        console.error("Erro ao obter dados da API:", error);
      }
    };

    fetchDataFromAPI();
  }, []);

  const gerarCodigoDeBarras = (barsCode) => {
    console.log("Código de barras a ser gerado:", barsCode);

    setCodigoAtual(barsCode);
    JsBarcode("#barcode-svg", barsCode, {
      format: "CODE128",
      displayValue: false,
    });

    // Encontrar o objeto que possui o barsCode igual ao código atual
    const qrCode = qrCodes.find((qr) => qr.bars_code === barsCode);
    if (qrCode) {
      // Atualizar o estado com o cod_usuario correspondente ao código atual
      setCodUsuarioAtual(qrCode.cod_usuario);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = qrCodes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const displayPagination = () => {
    const totalPages = Math.ceil(qrCodes.length / itemsPerPage);
    const activePage = currentPage;

    let startPage = Math.max(1, activePage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (totalPages > pagesToShow && endPage - startPage < pagesToShow - 1) {
      startPage = endPage - pagesToShow + 1;
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    const pages = [
      <Button key="first" onClick={() => paginate(1)}>{"<<"}</Button>,
      <Button key="prev" onClick={() => paginate(Math.max(1, currentPage - 1))}>{"<"}</Button>,
      ...pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => paginate(pageNumber)}
          style={{
            backgroundColor: pageNumber === activePage ? "#007bff" : "",
            color: pageNumber === activePage ? "#ffffff" : "",
            minWidth: "40px", // Define a largura mínima dos botões para evitar quebra de linha
          }}
        >
          {pageNumber}
        </Button>
      )),
      <Button key="next" onClick={() => paginate(Math.min(totalPages, currentPage + 1))}>{">"}</Button>,
      <Button key="last" onClick={() => paginate(totalPages)}>{">>"}</Button>,
    ];

    return <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>{pages}</div>;
  };

  const displayCurrentItems = () => {
    return currentItems.map((qrCode, index) => (
      <Grid item key={index}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => gerarCodigoDeBarras(qrCode.bars_code)}
        >
          {`Porta ${index + 1}`}
        </Button>
      </Grid>
    ));
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
                  {displayCurrentItems()}
                </Grid>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <Typography variant="subtitle1">Código de Barras Atual: {codigoAtual}</Typography>
                  <Typography variant="subtitle1">Cod_usuario: {codUsuarioAtual}</Typography> {/* Exibindo o cod_usuario correspondente */}
                  <div id="barcode-container" style={{ marginTop: "10px" }}>
                    <svg id="barcode-svg"></svg>
                  </div>
                </div>
                {displayPagination()}
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
