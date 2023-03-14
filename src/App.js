import './App.css';
import Layout from './js/layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';

// Can change theme colors here:
const theme = createTheme({
  palette: {
    primary: {
      main: '#1b90ce',
    },
    secondary: {
      main: '#0d4e85',
    },
  },
});

function App() {
  return (
    // ThemeProvider applies the colors to the whole app
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>LocationPro</title>
      </Helmet>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
