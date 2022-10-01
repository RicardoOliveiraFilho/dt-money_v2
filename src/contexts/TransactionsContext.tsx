import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  category: string
  price: number
  type: 'income' | 'outcome'
}

/* 2. Criação da interface do contexto */
interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

/*
  1. Criação do contexto através da função 'createContext()'
  * Para utilizarmos a lib 'use-context-selector', basta utilizarmos sua função 'createContext()' ao invés da função de mesmo nome do próprio React.
  * A API é exatamente a mesma.
*/
export const TransactionsContext = createContext({} as TransactionsContextType)

/* 4. Tipamos também as propriedades do Provider */
interface TransactionsProviderProps {
  children: ReactNode
}

/* 3. Exportamos o 'Provider' do contexto exportando através do 'value' o que queremos que os outros componentes possam acessar */
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  /*
    Mesma modificação da função 'createTransaction' com useCallback.
  */
  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  /*
    useCallback: Esse hook evita que a função passada para ele seja recriada em memória caso nenhuma informação sua ou que ela dependa tenha mudado.
    O hook recebe como primeiro parâmetro a função em si e como segundo parâmetro o seu array de dependências.
    Esse array tem a mesma funcionalidade vista no hook useEffect.
  */
  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((prevState) => [response.data, ...prevState])
    },
    [],
  )

  useEffect(() => {
    /* fetch('http://localhost:3000/transactions')
      .then(response => response.json())
      .then(data => console.log(data)) */
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
