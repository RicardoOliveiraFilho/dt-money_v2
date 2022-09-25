import * as Dialog from '@radix-ui/react-dialog'

import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import logoImg from '../../assets/dt-money-logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root> {/* O Contexto para a existência do Modal */}
          {/*'asChild' faz com que o 'Dialog.Trigger' não crie um novo botão, mas sim aproveita o botão passado como seu 'filho'*/}
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          {/* Abstrai uma funcionalidade do React - 'Portal' que nos permite renderizar um nó filho dentro de um outro local da DOM sem obedecer a hierarquia dos elementos (fora de qualquer div, por exemplo, seja ela do Header ou de outro componente, sendo algo à parte de nossa aplicação.) */}
          <Dialog.Portal>
            {/* O fundo quando o modal está aberto */}
            <Dialog.Overlay />

            <Dialog.Content>
              {/* Caso o modal tenha um título, é interessante usarmos o 'Dialog.Title' porque, por debaixo dos panos, ele informará ao leitor de tela o tipo de modal que está sendo aberto */}
              <Dialog.Title>Nova transação</Dialog.Title>
              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}