import { memo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { TransactionsContext } from '../../../../contexts/TransactionsContext'

import { SearchFormContainer } from './styles'

/**
 * Por que um componente renderiza?
 * - Hooks changed (mudou estado, contexto, reducer, etc);
 * - Props changed (mudou propriedades);
 * _ Parent rerendered (componente pai renderizou);
 *
 * Qual o fluxo de renderização?
 * 1. O React recria o HTML da interface daquele componente;
 * 2. Compara a versão do HTML recriada com a versão anterior;
 * 3. SE mudou alguma coisa, ele reescreve o HTML na tela;
 *
 * Memo: É uma função do React usada em componentes para conseguirmos memorizá-los.
 * É aconselhável usar somente em componentes realmente que tenham HTML muito pesado.
 *
 * Com ele o fluxo de renderização muda um pouco.
 * Ele adiciona um passo a mais antes dos já conhecidos.
 *
 * 0. Ele verifica se houve 'Hooks changed' ou 'Props changed' (analisando usando o que chamamos de deep comparison);
 * 0.1. Ele compara com a versão anterior dos hooks e das props;
 * 0.2. SE algo mudou, ele permite a nova renderização realizando os passos já conhecidos anteriormente;
 */

/* 2.Criando o esquema do formulário (formato de seus dados) */
const searchFormSchema = zod.object({
  query: zod.string(),
})

/* 3.Tipagem do formulário */
type SearchFormInputs = zod.infer<typeof searchFormSchema>

/*
  Utilizando o 'memo'
*/
function SearchFormComponent() {
  /*
    Mesma modificação realizado no NewTransactionModal.
  */
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  /* 1.Criação do form controlado pelo react-hook-form */
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    /* await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(data); */
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
