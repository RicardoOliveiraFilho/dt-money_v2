import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

import { TransactionsProvider } from "./contexts/TransactionsContext";

import { Transactions } from "./pages/Transactions";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      {/* 5. Envolvemos todos os componentes que queiramos que tenham acesso as informações do Contexto */}
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
