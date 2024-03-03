import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import Notifier from 'src/components/notifier';
import 'simplebar-react/dist/simplebar.min.css';

// Create an Emotion cache for server-side rendering
const clientSideEmotionCache = createEmotionCache();

// Placeholder component for splash screen
const SplashScreen = () => null;

/**
 * App component is the main component of the application.
 * It wraps the entire application with necessary context providers,
 * theme providers, and global CSS settings.
 * 
 * @param {object} props - The properties of the App component.
 * @param {React.Component} props.Component - The main component to render.
 * @param {object} [props.emotionCache] - Emotion cache for server-side rendering.
 * @param {object} props.pageProps - The props passed to the main component.
 * 
 * @returns {JSX.Element} - JSX element representing the entire application.
 */
const App = (props) => {
  // Destructure props
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Custom hook to manage progress bar
  useNProgress();

  // Get layout function from main component or use default layout
  const getLayout = Component.getLayout ?? ((page) => page);

  // Create MUI theme
  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          IU Alumni Portal
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Check if authentication is loading */}
            <AuthConsumer>
              {
                (auth) => auth.isLoading
                  ? <SplashScreen />  // Show splash screen if authentication is loading
                  : getLayout(<Component {...pageProps} />) // Render main component with layout
              }
            </AuthConsumer>
            {/* Global notifier component */}
            <Notifier />
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
