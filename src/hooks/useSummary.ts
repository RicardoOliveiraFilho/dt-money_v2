import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  /*
    Mesma modificação realizado no NewTransactionModal.
  */
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  /*
    Aprendemos como evitar a recriação de funções em memória quando não há mudanças nas informações que ela depende (useCallback).
    Lembrando que muitas das vezes será mais performático a recriação da variável, função ou componente em memória do que necessariamente ficar comparando as suas versões.
    O problema pode estar na variável, função ou componente ser repassado para vários outros componentes nos fazendo cair no problema da igualdade referencial.
    Por mais que a variável, função ou componente não tenham seus valores mudados, a recriação altera o endereço de memória e isso faz com que o React renderize novamente eles ou quem os utilize, mesmo sem precisar.

    useMemo: é usado basicamente da mesma forma que useCallback, só que para variáveis.
    Ele recebe como parâmetro uma função que deve retornar a variável em questão e o array de dependências.
    Com o 'useMemo', a nossa variável 'summary' agora só será recriada caso o array de 'transactions' tenha o seu valor alterado e não mais como antes que sempre era criada quando o hook 'useSummary' era renderizado novamente.
  */
  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return summary
}
