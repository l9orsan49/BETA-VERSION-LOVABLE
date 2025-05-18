// pages/_app.js
import { useRouter } from 'next/router';
import Parse from 'parse/dist/parse.min.js';
import '../styles/globals.css';
import Layout from '../components/Layout';

// Initialize Parse with your Back4Apps credentials
Parse.initialize(
  process.env.NEXT_PUBLIC_PARSE_APP_ID,
  process.env.NEXT_PUBLIC_PARSE_JS_KEY
);
Parse.serverURL = 'https://parseapi.back4app.com/';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // If we're on the homepage ("/"), render without sidebar/Layout
  if (router.pathname === '/') {
    return <Component {...pageProps} />;
  }

  // All other routes get the shared Layout (with sidebar)
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
