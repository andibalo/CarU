import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/theme";
import { Provider } from "next-auth/client";
import { CartContextProvider } from "../context/cart-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CartContextProvider>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </CartContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
