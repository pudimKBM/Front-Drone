import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import FiapLogo from '../assets/images/logo-fiap.png'
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Results() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('update_rankings', (data) => {
      setResults(data.rankings);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  // Add a handler to navigate to the Podium page
  const handlePodium = () => {
    navigate('/podium');
  };

  return (
    <>
      {/* Logo in the top-right corner */}
      <img
        src={FiapLogo}
        alt="Logo"
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          width: '250px', // Adjust size as needed
          height: 'auto',
        }}
      />
      
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Resultados da Competição
        </Typography>
        <Table
         sx={{
          maxHeight: '750px',  // Set the maximum height you want
          overflowY: 'auto',   // Enable vertical scrolling if content exceeds maxHeight
        }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Posição</TableCell>
              <TableCell>Grupo</TableCell>
              <TableCell>Acurácia Máxima</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, idx) => (
              <TableRow key={result.name}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{result.name}</TableCell>
                <TableCell>{result.max_accuracy.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBack}
          sx={{ mt: 2, mr: 2 }}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePodium}
          sx={{ mt: 2 }}
        >
          Ver Pódio
        </Button>
      </Container>
    </>
  );
}

export default Results;
