import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'

const NewTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  // type: zod.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = zod.infer<typeof NewTransactionFormSchema>;

export function NewTransactionModal() {
  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
    },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(NewTransactionFormSchema),
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(data);
  }

  return (
    <Dialog.Portal>{/* Abstrai uma funcionalidade do React - 'Portal' que nos permite renderizar um nó filho dentro de um outro local da DOM sem obedecer a hierarquia dos elementos (fora de qualquer div, por exemplo, seja ela do Header ou de outro componente, sendo algo à parte de nossa aplicação.) */}
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
            { ...register('description') }
          />

          <input
            type="number"
            placeholder="Preço"
            required
            { ...register('price', { valueAsNumber: true }) }
          />

          <input
            type="text"
            placeholder="Categoria"
            required
            { ...register('category') }
          />

          <TransactionType>
            <TransactionTypeButton variant='income' value='income'>
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>
            <TransactionTypeButton variant='outcome' value='outcome'>
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
