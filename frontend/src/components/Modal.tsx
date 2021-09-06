import { Portal } from '~/components/Portal'

interface Props {
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Modal({ onClose, title, children }: Props) {
  return (
    <Portal>
      <Portal.Overlay onClick={onClose}>
        <div
          role="dialog"
          onClick={(e) => e.stopPropagation()}
          tw="flex flex-col justify-between items-center w-11/12 max-w-lg bg-white rounded-lg p-6"
        >
          {title && <div tw="font-bold text-lg">{title}</div>}
          <div tw="mt-3">{children}</div>
        </div>
      </Portal.Overlay>
    </Portal>
  )
}
