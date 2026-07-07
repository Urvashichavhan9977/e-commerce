import { useState, useEffect } from 'react'
import { settingsApi } from '../api/settingsApi'
import { useAdminAuth } from '../context/AdminAuthContext'
import { IconAlert, IconSettings, IconKey, IconSun, IconMoon, IconEye, IconEyeOff } from '../components/AdminIcons'

const getPasswordStrength = (pw) => {
  if (!pw) return 0
  let score = 0
  if (pw.length >= 8) score++
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  if (score <= 1) return 1
  if (score <= 2) return 2
  return 3
}

const strengthLabel = ['', 'Weak', 'Medium', 'Strong']
const strengthClass = ['', 'is-weak', 'is-medium', 'is-strong']

export default function SettingsPage() {
  const { admin } = useAdminAuth()
  const [theme, setTheme] = useState(() => localStorage.getItem('adm_theme') || 'light')
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')

  useEffect(() => {
    document.documentElement.setAttribute('data-adm-theme', theme)
    localStorage.setItem('adm_theme', theme)
  }, [theme])

  const set = f => e => setPwForm(p => ({ ...p, [f]: e.target.value }))
  const toggleShow = (field) => setShowPw(s => ({ ...s, [field]: !s[field] }))

  const initials = (admin?.name || '?')
    .trim()
    .split(/\s+/)
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const strength = getPasswordStrength(pwForm.newPassword)

  const handlePasswordChange = async (e) => {
    e.preventDefault(); setMsg('')
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setMsg('New passwords do not match.'); setMsgType('error'); return
    }
    if (pwForm.newPassword.length < 8) {
      setMsg('New password must be at least 8 characters.'); setMsgType('error'); return
    }
    setSaving(true)
    try {
      await settingsApi.changePassword(pwForm.currentPassword, pwForm.newPassword)
      setMsg('Password successfully changed!'); setMsgType('success')
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setShowPw({ current: false, new: false, confirm: false })
    } catch (err) {
      setMsg(err.message || 'Failed to change password.'); setMsgType('error')
    } finally { setSaving(false) }
  }

  return (
    <div>
      <div className="adm-page-header">
        <div><h2>Settings</h2><p>Account preferences aur security settings.</p></div>
      </div>

      <div className="adm-settings-grid">

        {/* ── Profile Info ── */}
        <div className="adm-card">
          <h3 className="adm-settings-card-title">
            <IconSettings width={15} height={15} /> Account Info
          </h3>
          <div className="adm-profile-header">
            <div className="adm-profile-avatar">{initials}</div>
            <div className="adm-profile-meta">
              <div className="adm-profile-name-row">
                <span className="adm-profile-name">{admin?.name || '—'}</span>
                <span className="adm-badge adm-badge-success" style={{ textTransform: 'capitalize' }}>{admin?.role || '—'}</span>
              </div>
              <div className="adm-profile-email">{admin?.email || '—'}</div>
            </div>
          </div>
        </div>

        {/* ── Theme Toggle ── */}
        <div className="adm-card">
          <h3 className="adm-settings-card-title">
            {theme === 'dark' ? <IconMoon width={15} height={15} /> : <IconSun width={15} height={15} />} Theme
          </h3>
          <div className="adm-theme-segment">
            <div className={`adm-theme-segment-thumb${theme === 'dark' ? ' is-dark' : ''}`} />
            {['light', 'dark'].map(t => (
              <button key={t} type="button"
                onClick={() => setTheme(t)}
                className={`adm-theme-segment-btn${theme === t ? ' is-active' : ''}`}
              >
                {t === 'light' ? <><IconSun /> Light Mode</> : <><IconMoon /> Dark Mode</>}
              </button>
            ))}
          </div>
          <p className="adm-settings-hint">
            Theme preference is saved in your browser.
          </p>
        </div>

        {/* ── Change Password ── */}
        <div className="adm-card">
          <h3 className="adm-settings-card-title">
            <IconKey width={15} height={15} /> Change Password
          </h3>
          {msg && (
            <div className={`adm-alert ${msgType === 'error' ? 'adm-alert-error' : 'adm-alert-success'}`} style={{ marginBottom: '1rem' }}>
              <IconAlert /><span>{msg}</span>
            </div>
          )}
          <form onSubmit={handlePasswordChange}>
            <div className="adm-form-grid">
              <div className="adm-form-group adm-form-group-full">
                <label>Current Password *</label>
                <div className="adm-input-wrap">
                  <input
                    type={showPw.current ? 'text' : 'password'}
                    className="adm-input"
                    value={pwForm.currentPassword}
                    onChange={set('currentPassword')}
                    required
                  />
                  <button type="button" className="adm-input-eye-btn" onClick={() => toggleShow('current')} aria-label="Toggle current password visibility">
                    {showPw.current ? <IconEyeOff width={16} height={16} /> : <IconEye width={16} height={16} />}
                  </button>
                </div>
              </div>

              <div className="adm-form-group">
                <label>New Password *</label>
                <div className="adm-input-wrap">
                  <input
                    type={showPw.new ? 'text' : 'password'}
                    className="adm-input"
                    value={pwForm.newPassword}
                    onChange={set('newPassword')}
                    placeholder="Min 8 characters"
                    required
                  />
                  <button type="button" className="adm-input-eye-btn" onClick={() => toggleShow('new')} aria-label="Toggle new password visibility">
                    {showPw.new ? <IconEyeOff width={16} height={16} /> : <IconEye width={16} height={16} />}
                  </button>
                </div>
                {pwForm.newPassword && (
                  <div className={`adm-pw-strength ${strengthClass[strength]}`}>
                    <div className="adm-pw-strength-track">
                      <span className="adm-pw-strength-seg" />
                      <span className="adm-pw-strength-seg" />
                      <span className="adm-pw-strength-seg" />
                    </div>
                    <span className="adm-pw-strength-label">{strengthLabel[strength]}</span>
                  </div>
                )}
              </div>

              <div className="adm-form-group">
                <label>Confirm New Password *</label>
                <div className="adm-input-wrap">
                  <input
                    type={showPw.confirm ? 'text' : 'password'}
                    className="adm-input"
                    value={pwForm.confirmPassword}
                    onChange={set('confirmPassword')}
                    required
                  />
                  <button type="button" className="adm-input-eye-btn" onClick={() => toggleShow('confirm')} aria-label="Toggle confirm password visibility">
                    {showPw.confirm ? <IconEyeOff width={16} height={16} /> : <IconEye width={16} height={16} />}
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" className="adm-btn adm-btn-primary adm-btn-sm adm-settings-btn-full" disabled={saving} style={{ marginTop: '.5rem' }}>
              {saving ? 'Changing…' : 'Change Password'}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}