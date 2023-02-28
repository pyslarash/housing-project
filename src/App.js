import './App.css';
import Layout from './js/layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Can change theme colors here:
const theme = createTheme({
  palette: {
    primary: {
      main: '#26a69a',
    },
    secondary: {
      main: '#009688',
    },
  },
});

function App() {
  return (
    // ThemeProvider applies the colors to the whole app
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
