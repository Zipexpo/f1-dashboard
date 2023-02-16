import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';
import {useMemo} from "react";

function App() {
  const customization = useSelector((state) => state.customization);
  const persistKey = useMemo(() => ({}), []);
  return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
            <Routes />
        </ThemeProvider>
      </StyledEngineProvider>
  );
}

export default App;
