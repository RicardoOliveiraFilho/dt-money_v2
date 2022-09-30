import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number,
  description: string,
  type: 'income' | 'outcome',
  price: number,
  category: string,
  createdAt: string,
}

/* 2. Criação da interface do contexto */
interface TransactionsContextType {
  transactions: Transaction[],
  fetchTransactions: (query?: string) => Promise<void>,
}

/* 1. Criação do contexto através da função 'createContext()' */
export const TransactionsContext = createContext({} as TransactionsContextType);

/* 4. Tipamos também as propriedades do Provider */
interface TransactionsProviderProps {
  children: ReactNode
}

/* 3. Exportamos o 'Provider' do contexto exportando através do 'value' o que queremos que os outros componentes possam acessar */
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        q: query,
      },
    });

    setTransactions(response.data)
  }

  useEffect(() => {
    /*fetch('http://localhost:3000/transactions')
      .then(response => response.json())
      .then(data => console.log(data))*/
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}
