import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/theme";
import { Provider } from "next-auth/client";
import { CartContextProvider } from "../context/cart-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Provider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </CartContextProvider>
  );
}

export default MyApp;
