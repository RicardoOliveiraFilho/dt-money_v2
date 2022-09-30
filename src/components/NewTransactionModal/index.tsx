import { useContext } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { TransactionsContext } from '../../contexts/TransactionsContext'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'

const NewTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = zod.infer<typeof NewTransactionFormSchema>

export function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext)

  const {
    control /* Nos permite pegar a informação de elementos de formulários não nativos do html. Usado no 'Controller' do React Hook Form */,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset /* Resetar o formulário */,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(NewTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    /* await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(data); */
    const { description, category, price, type } = data

    await createTransaction({
      description,
      category,
      price,
      type,
    })

    reset()
  }

  return (
    <Dialog.Portal>
      {/* Abstrai uma funcionalidade do React - 'Portal' que nos permite renderizar um nó filho dentro de um outro local da DOM sem obedecer a hierarquia dos elementos (fora de qualquer div, por exemplo, seja ela do Header ou de outro componente, sendo algo à parte de nossa aplicação.) */}
      <Overlay />

      <Content>
        {/* Caso o modal tenha um título, é interessante usarmos o 'Dialog.Title' porque, por debaixo dos panos, ele informará ao leitor de tela o tipo de modal que está sendo aberto */}
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />

          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />

          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          {/*
            Na prop 'name' vai o nome do campo do formulário (Definido no Schema).
            Na prop 'render' vai uma função que retorna o conteúdo que se relacionado com o campo informado em 'name'.
            A função dentro do render possui props [field, fieldState, formState] responsáveis por conter informações do formulário como um todo bem como do elemento (field) - vide documentação do React Hook Form.

            'onValueChange' e 'value' são props do Componente 'RadioGroup' do radix (vide documentação) que estilizamos como 'TransactionType'.
          */}
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <TransactionType
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
