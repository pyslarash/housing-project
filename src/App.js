import './App.css';
import Layout from './js/layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './js/store/store';
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
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Helmet>
            <title>LocationPro</title>
          </Helmet>
          <Layout />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
