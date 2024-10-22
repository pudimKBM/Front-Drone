import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LiveFeed from './components/LiveFeed';
import Results from './components/Results';
import Podium from './components/Podium';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Adjust the primary color as desired
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LiveFeed />} />
          <Route path="/results" element={<Results />} />
          <Route path="/podium" element={<Podium />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
