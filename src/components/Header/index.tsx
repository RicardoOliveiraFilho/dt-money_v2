import * as Dialog from '@radix-ui/react-dialog'

import { NewTransactionModal } from '../NewTransactionModal'

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

import logoImg from '../../assets/dt-money-logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          {' '}
          {/* O Contexto para a existência do Modal */}
          {/* 'asChild' faz com que o 'Dialog.Trigger' não crie um novo botão, mas sim aproveita o botão passado como seu 'filho' */}
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
