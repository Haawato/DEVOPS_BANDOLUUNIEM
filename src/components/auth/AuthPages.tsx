import { useState, type FormEvent, type ReactNode } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Eye, EyeOff, Gift, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { useToast } from '../common/toastContext'

function AuthFrame({ children, mode }: { children: ReactNode; mode: 'login' | 'register' }) {
  return (
    <div className="auth-page">
      <aside className="auth-story">
        <Link to="/" className="brand auth-brand"><span className="brand-mark">m.</span><span>tiệm nhà mây<small>NHỮNG MÓN QUÀ CÓ Ý NGHĨA</small></span></Link>
        <div className="auth-story-copy">
          <span className="eyebrow"><Gift size={14} /> NHỮNG ĐIỀU NHỎ BÉ, ĐẦY Ý NGHĨA</span>
          <h1>{mode === 'login' ? <>Một nơi nhỏ<br />dành cho những<br /><em>điều thương mến.</em></> : <>Bắt đầu một<br />hành trình trao<br /><em>điều tử tế.</em></>}</h1>
          <p>Quà thủ công được chọn bằng sự tinh tế, dành cho những người luôn ở trong tim bạn.</p>
        </div>
        <div className="auth-story-bottom"><span>THỦ CÔNG · CHỌN LỌC · GỬI THƯƠNG</span><span>01 — NHÀ MÂY</span></div>
      </aside>
      <main className="auth-main">
        <div className="auth-form-wrap"><Link to="/" className="auth-back"><ArrowLeft size={15} /> Về cửa hàng</Link>{children}</div>
        <div className="auth-footer"><ShieldCheck size={14} /> Tài khoản demo được lưu trên thiết bị này.</div>
      </main>
    </div>
  )
}

function PasswordField({ label, value, onChange, autoComplete }: { label: string; value: string; onChange: (value: string) => void; autoComplete: string }) {
  const [visible, setVisible] = useState(false)
  return (
    <label className="auth-field">
      <span>{label}</span>
      <span className="auth-input-wrap">
        <LockKeyhole size={16} />
        <input type={visible ? 'text' : 'password'} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} required minLength={8} />
        <button type="button" aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} onClick={() => setVisible((current) => !current)}>{visible ? <EyeOff size={16} /> : <Eye size={16} />}</button>
      </span>
    </label>
  )
}

export function LoginPage() {
  const login = useStore((state) => state.login)
  const currentUser = useStore((state) => state.currentUser)
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  if (currentUser) return <Navigate to={currentUser.role === 'admin' ? '/admin/dashboard' : '/'} replace />

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const user = login(email, password)
    if (!user) { setError('Email hoặc mật khẩu chưa chính xác.'); return }
    toast(`Chào mừng ${user.name} trở lại`)
    const returnPath = (location.state as { from?: string } | null)?.from
    navigate(user.role === 'admin' ? (returnPath?.startsWith('/admin') ? returnPath : '/admin/dashboard') : '/', { replace: true })
  }

  return (
    <AuthFrame mode="login">
      <div className="auth-heading"><span className="eyebrow">RẤT VUI ĐƯỢC GẶP LẠI</span><h2>Đăng nhập</h2><p>Tiếp tục hành trình gửi trao những món quà.</p></div>
      <form className="auth-form" onSubmit={submit}>
        <label className="auth-field"><span>Email</span><span className="auth-input-wrap"><Mail size={16} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ban@email.com" autoComplete="username" required /></span></label>
        <PasswordField label="Mật khẩu" value={password} onChange={setPassword} autoComplete="current-password" />
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="button button-dark auth-submit" type="submit">Đăng nhập <ArrowRight size={16} /></button>
      </form>
      <div className="auth-demo"><span><ShieldCheck size={15} /> TÀI KHOẢN QUẢN TRỊ DEMO</span><strong>admin@tiemnhamay.vn</strong><small>Mật khẩu: NhaMay@2026</small></div>
      <p className="auth-switch">Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
    </AuthFrame>
  )
}

export function RegisterPage() {
  const register = useStore((state) => state.register)
  const currentUser = useStore((state) => state.currentUser)
  const navigate = useNavigate()
  const toast = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState('')
  if (currentUser) return <Navigate to={currentUser.role === 'admin' ? '/admin/dashboard' : '/'} replace />

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (password !== confirmation) { setError('Mật khẩu xác nhận chưa trùng khớp.'); return }
    const user = register(name, email, password)
    if (!user) { setError('Email này đã được đăng ký. Hãy đăng nhập hoặc dùng email khác.'); return }
    toast('Tài khoản của bạn đã được tạo')
    navigate('/', { replace: true })
  }

  return (
    <AuthFrame mode="register">
      <div className="auth-heading"><span className="eyebrow">MỘT CHÚT DỊU DÀNG BẮT ĐẦU TỪ ĐÂY</span><h2>Tạo tài khoản</h2><p>Lưu lại những món quà và đơn hàng của bạn.</p></div>
      <form className="auth-form" onSubmit={submit}>
        <label className="auth-field"><span>Họ và tên</span><span className="auth-input-wrap"><UserRound size={16} /><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Tên của bạn" autoComplete="name" required minLength={2} /></span></label>
        <label className="auth-field"><span>Email</span><span className="auth-input-wrap"><Mail size={16} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ban@email.com" autoComplete="email" required /></span></label>
        <PasswordField label="Mật khẩu" value={password} onChange={setPassword} autoComplete="new-password" />
        <PasswordField label="Nhập lại mật khẩu" value={confirmation} onChange={setConfirmation} autoComplete="new-password" />
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="button button-dark auth-submit" type="submit">Tạo tài khoản <ArrowRight size={16} /></button>
      </form>
      <p className="auth-switch">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
    </AuthFrame>
  )
}
