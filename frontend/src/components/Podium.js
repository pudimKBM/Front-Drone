import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Howl } from 'howler';
import ReactConfetti from 'react-confetti';
import dingSound from '../assets/sounds/ding.mp3'; // Import your sound file
import trophyImage from '../assets/images/trophy.png'; // Import trophy image
import '../styles.css';

function Podium() {
  const [topGroups, setTopGroups] = useState([]);
  const navigate = useNavigate();

  // Get the window dimensions for confetti
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

  useEffect(() => {
    // Play sound when component mounts
    const sound = new Howl({ src: [dingSound] });
    sound.play();

    // Get window dimensions
    setDimensions({ width: window.innerWidth*2, height: window.innerHeight });

    const socket = io('http://localhost:5000');

    // Emit an event to get the top 3 groups
    socket.emit('get_podium');

    // Listen for the 'podium' event
    socket.on('podium', (data) => {
      setTopGroups(data.groups);
    });

    // Clean up the socket connection
    return () => {
      socket.disconnect();
      sound.unload(); // Optional: Unload the sound to free resources
    };
  }, []);

  const handleResults = () => {
    navigate('/results');
  };

  return (
    <Container
      maxWidth="false"
      sx={{ textAlign: 'center', mt: 5, position: 'relative' }}
    >
      {/* Confetti */}
      <ReactConfetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={6400}
        recycle={false}
      />

      <Typography variant="h3" gutterBottom>
        🎉 Parabéns aos Vencedores! 🎉
      </Typography>
      <div className="podium">
        {/* First Place Podium */}
        {topGroups.length >= 1 && (
          <div
            className=" expandable podium-step first"
            style={{ '--final-height': '250px' }}
          >
            <img src={trophyImage} alt="Trophy" className="trophy" />
            <Typography variant="h5">1º Lugar</Typography>
            <Typography variant="h6">{topGroups[0].name}</Typography>
            <Typography variant="body1">
              Acurácia: {topGroups[0].max_accuracy.toFixed(2)}%
            </Typography>
          </div>
        )}
        {/* Second Place Podium */}
        {topGroups.length >= 2 && (
          <div
            className=" expandable podium-step second"
            style={{ '--final-height': '200px' }}
          >
            <Typography variant="h5">2º Lugar</Typography>
            <Typography variant="h6">{topGroups[1].name}</Typography>
            <Typography variant="body1">
              Acurácia: {topGroups[1].max_accuracy.toFixed(2)}%
            </Typography>
          </div>
        )}
        {/* Third Place Podium */}
        {topGroups.length >= 3 && (
          <div
            className="expandable podium-step third"
            style={{ '--final-height': '160px' }}
          >
            <Typography variant="h5">3º Lugar</Typography>
            <Typography variant="h6">{topGroups[2].name}</Typography>
            <Typography variant="body1">
              Acurácia: {topGroups[2].max_accuracy.toFixed(2)}%
            </Typography>
          </div>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleResults}
        sx={{ mt: 4 }}
      >
        Ver Resultados
      </Button>
    </Container>
  );
}

export default Podium;
