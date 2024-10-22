import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Howl } from 'howler';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import titacSound from '../assets/sounds/tic-tac-27828.mp3';
import Results from './Results';
function LiveFeed() {
  const [groupName, setGroupName] = useState('');
  const [started, setStarted] = useState(false);
  const [frame, setFrame] = useState('');
  const [accuracy, setAccuracy] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [remainingTime, setRemainingTime] = useState(0);
  const [rankings, setRankings] = useState([]);
  const [groupAccuracy, setGroupAccuracy] = useState(0);

  const socketRef = useRef(null);

  useEffect(() => {
    let timer;
    if (started && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !socketRef.current) {
    const sound = new Howl({ src: [titacSound], loop: true
    });
    sound.play()
      // Initialize socket connection here
      socketRef.current = io('http://localhost:5000');

      // Set up event listeners
      socketRef.current.on('new_frame', (data) => {
        setFrame('data:image/jpeg;base64,' + data.frame);
        const currentAccuracy = parseFloat(data.accuracy.toFixed(2));
        setAccuracy(currentAccuracy);

        // Update group's max accuracy
        if (currentAccuracy > groupAccuracy) {
          setGroupAccuracy(currentAccuracy);
        }
      });

      socketRef.current.on('play_sound', () => {
        const sound = new Howl({ src: [titacSound] });
        sound.play();
      });

      socketRef.current.on('update_rankings', (data) => {
        setRankings(data.rankings);
      });

      socketRef.current.on('time_limit', (data) => {
        setRemainingTime(data.time_limit);
      });

      socketRef.current.on('time_up', () => {
        sound.stop()
        alert('O tempo acabou!');
        socketRef.current.disconnect();
        window.location.href = '/results';
      });

      // Emit start_stream event
      socketRef.current.emit('start_stream', { group_name: groupName });
    }
    return () => clearTimeout(timer);
  }, [started, countdown, groupName, groupAccuracy]);

  // Separate useEffect for handling the remainingTime countdown
  useEffect(() => {
    if (remainingTime > 0) {
      const timerId = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [remainingTime]);

  // Cleanup socket when component unmounts
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const startStream = () => {
    if (groupName.trim() !== '') {
      setStarted(true);
    }
  };

  const handleResults = () => {
    window.location.href = '/results';
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {!started ? (
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Bem-vindo à Competição!
          </Typography>
          <TextField
            label="Nome do Grupo"
            variant="outlined"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            sx={{ mb: 2, width: '300px' }}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={startStream}
            disabled={!groupName.trim()}
          >
            Iniciar
          </Button>
          <Results></Results>
        </Box>
      ) : countdown > 0 ? (
        <Box textAlign="center">
          <Typography variant="h3">Iniciando em {countdown}...</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {/* Left Side - Live Feed */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Detecção Ao Vivo
              </Typography>
              {frame ? (
                <img
                  src={frame}
                  alt="Live Feed"
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              ) : (
                <CircularProgress />
              )}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Acurácia Atual: <strong>{accuracy}%</strong>
              </Typography>
              <Typography variant="h6">
                Tempo Restante: <strong>{remainingTime} segundos</strong>
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleResults}
                sx={{ mt: 2 }}
              >
                Ver Resultados
              </Button>
            </Paper>
          </Grid>

          {/* Right Side - Rankings and Current Group Results */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Ranking em Tempo Real
              </Typography>
              <List>
                {rankings.map((group, index) => (
                  <ListItem
                    key={group.name}
                    selected={group.name === groupName}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">
                          {index + 1}. {group.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2">
                          Acurácia Máxima: {group.max_accuracy.toFixed(2)}%
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Seu Grupo: <strong>{groupName}</strong>
              </Typography>
              <Typography variant="h6">
                Sua Acurácia Máxima:{' '}
                <strong>{groupAccuracy.toFixed(2)}%</strong>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default LiveFeed;
