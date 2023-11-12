import React, { useState } from "react";
import { Button, Container, Typography, Avatar, Grid, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import JsBarcode from "jsbarcode";

const TelaCodigoBarras = () => {
  const [codigoAtual, setCodigoAtual] = useState("");
  const [botaoVisivel, setBotaoVisivel] = useState(true);

  const gerarCodigoDeBarras = () => {
    // Gere um novo código de barras aqui
    const novoCodigo = "12321321"; // Substitua por lógica real de geração de código de barras
    setCodigoAtual(novoCodigo);
    JsBarcode("#barcode-svg", novoCodigo, {
      format: "CODE128",
      displayValue: false,
    });

    // Oculta o botão após gerar o código
    setBotaoVisivel(false);
  };

  return (
    <Container component="main" maxWidth="xs" style={{ backgroundColor: "#F6D327", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Código de Barras</Typography>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Conteúdo Principal */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar alt="Imagem de Perfil" src="/profile-image.jpg" sx={{ width: 100, height: 100 }} />
          </Grid>
          <Grid item>
            <div>
              <Typography variant="h6" style={{ marginTop: "10px" }}>
                Nome do Usuário
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Validade: DD/MM/YYYY
              </Typography>
            </div>
          </Grid>
        </Grid>

        {/* Quadrado com bordas arredondadas para o código de barras */}
        <Box
          sx={{
            width: "350px",
            height: "150px",
            border: "2px solid #000",
            borderRadius: "20px",
            margin: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          {/* Código de barras aqui */}
          <svg id="barcode-svg"></svg>
        </Box>

        {/* Botão de geração do código de barras */}
        {botaoVisivel && (
          <Button variant="contained" color="primary" onClick={gerarCodigoDeBarras} style={{ marginTop: "40px", borderRadius:"30px" }}>
            Gerar Código de Barras
          </Button>
        )}
      </div>
    </Container>
  );
};

export default TelaCodigoBarras;
