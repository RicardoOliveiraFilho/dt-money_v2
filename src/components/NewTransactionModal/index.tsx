import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'

export function NewTransactionModal() {
  return (
    <Dialog.Portal>{/* Abstrai uma funcionalidade do React - 'Portal' que nos permite renderizar um nó filho dentro de um outro local da DOM sem obedecer a hierarquia dos elementos (fora de qualquer div, por exemplo, seja ela do Header ou de outro componente, sendo algo à parte de nossa aplicação.) */}
      <Overlay />

      <Content>
        {/* Caso o modal tenha um título, é interessante usarmos o 'Dialog.Title' porque, por debaixo dos panos, ele informará ao leitor de tela o tipo de modal que está sendo aberto */}
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action=''>
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />

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

          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
