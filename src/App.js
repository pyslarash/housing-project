import './App.css';
import Layout from './js/layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { Provider } from "react-redux";
import store from "./js/store/store";
import "./styles/links.css"

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
      <Provider store={store}>
        <Helmet>
          <title>LocationPro</title>
        </Helmet>
        <Layout />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
