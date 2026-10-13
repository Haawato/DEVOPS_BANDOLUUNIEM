import type { ReactNode } from 'react'
import { Check, X } from 'lucide-react'
import type { ToastMessage } from './toastContext'

export function ToastStack({ toasts, onDismiss }: { toasts: ToastMessage[]; onDismiss: (id: number) => void }) {
  return <div className="toast-stack" aria-live="polite">{toasts.map((toast) => <div className="toast" key={toast.id}><span className="toast-check"><Check size={15} /></span><span>{toast.message}</span><button className="icon-button" aria-label="Đóng thông báo" onClick={() => onDismiss(toast.id)}><X size={15} /></button></div>)}</div>
}

export function Modal({ title, children, onClose, wide = false }: { title: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className={`modal ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}><div className="modal-heading"><h2>{title}</h2><button className="icon-button" aria-label="Đóng" onClick={onClose}><X size={19} /></button></div>{children}</section></div>
}