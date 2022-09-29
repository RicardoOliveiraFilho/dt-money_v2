import { createContext, ReactNode, useEffect, useState } from "react";

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
  transactions: Transaction[]
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

  async function loadTransactions() {
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    /*fetch('http://localhost:3000/transactions')
      .then(response => response.json())
      .then(data => console.log(data))*/
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
