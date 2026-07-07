import { useEffect, useState } from 'react'
  import { concernsApi } from '../api/concernsApi'
  import { productsApi } from '../api/productsApi'
  import Modal from '../components/Modal'
  import ConfirmDialog from '../components/ConfirmDialog'
  import { IconAlert, IconEdit, IconTrash, IconPlus } from '../components/AdminIcons'

  const EMOJI_OPTIONS = ['🌿','💚','🌙','❤️','🧠','💧','🌸','⚡','🛡️','🌺','🍃','✨','🌱','💊','🔥']

  function ConcernFormModal({ initial, products, onClose, onSaved }) {
    const isEdit = Boolean(initial?._id)
    const [form, setForm] = useState({
      name: initial?.name || '', emoji: initial?.emoji || '🌿',
      description: initial?.description || '',
      products: (initial?.products || []).map(p => p._id || p),
      isActive: initial?.isActive ?? true, order: initial?.order ?? 0,
    })
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const set = f => e => setForm(p => ({ ...p, [f]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

    const toggleProduct = (id) => setForm(p => ({
      ...p, products: p.products.includes(id) ? p.products.filter(x => x !== id) : [...p.products, id]
    }))

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

    const handleSubmit = async (e) => {
      e.preventDefault(); setError(''); setSaving(true)
      try {
        const res = isEdit ? await concernsApi.update(initial._id, form) : await concernsApi.create(form)
        onSaved(res.concern)
      } catch (err) { setError(err.message || 'Failed to save concern.') }
      finally { setSaving(false) }
    }

    return (
      <Modal title={isEdit ? 'Edit Concern' : 'New Concern'} onClose={onClose}
        footer={<>
          <button type="button" className="adm-btn adm-btn-outline adm-btn-sm" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" form="concern-form" className="adm-btn adm-btn-primary adm-btn-sm" disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Concern'}
          </button>
        </>}>
        {error && <div className="adm-alert adm-alert-error"><IconAlert /><span>{error}</span></div>}
        <form id="concern-form" onSubmit={handleSubmit}>
          <div className="adm-form-grid">
            <div className="adm-form-group"><label>Concern Name *</label>
              <input className="adm-input" value={form.name} onChange={set('name')} placeholder="e.g. Immunity, Sleep, Digestion" required />
            </div>
            <div className="adm-form-group"><label>Emoji</label>
              <select className="adm-select" style={{width:'100%'}} value={form.emoji} onChange={set('emoji')}>
                {EMOJI_OPTIONS.map(e => <option key={e} value={e}>{e} {e}</option>)}
              </select>
            </div>
            <div className="adm-form-group adm-form-group-full"><label>Description</label>
              <input className="adm-input" value={form.description} onChange={set('description')} />
            </div>
            <div className="adm-form-group"><label>Order</label>
              <input type="number" className="adm-input" value={form.order} onChange={set('order')} />
            </div>
            <div className="adm-form-group"><label>Status</label>
              <label className="adm-checkbox-row" style={{marginTop:'.5rem'}}>
                <input type="checkbox" checked={form.isActive} onChange={set('isActive')} /> Active
              </label>
            </div>
            <div className="adm-form-group adm-form-group-full">
              <label>Products ({form.products.length} selected)</label>
              <input className="adm-input" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} style={{marginBottom:'.5rem'}} />
              <div style={{maxHeight:200,overflowY:'auto',border:'1.5px solid #e5e7eb',borderRadius:8,padding:'.5rem'}}>
                {filtered.map(p => (
                  <label key={p._id} style={{display:'flex',alignItems:'center',gap:'.5rem',padding:'.3rem .4rem',cursor:'pointer',borderRadius:6,background:form.products.includes(p._id)?'#f0fdf4':'transparent'}}>
                    <input type="checkbox" checked={form.products.includes(p._id)} onChange={() => toggleProduct(p._id)} />
                    {p.img && <img src={p.img} alt={p.name} style={{width:28,height:28,objectFit:'cover',borderRadius:4}} />}
                    <span style={{fontSize:'.85rem'}}>{p.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </form>
      </Modal>
    )
  }

  export default function ShopByConcernPage() {
    const [concerns, setConcerns] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [formTarget, setFormTarget] = useState(null)
    const [deleteTarget, setDeleteTarget] = useState(null)
    const [deleteError, setDeleteError] = useState('')
    const [deleting, setDeleting] = useState(false)
    const [togglingId, setTogglingId] = useState(null)

    const load = async () => {
      setLoading(true); setError('')
      try {
        const [cRes, pRes] = await Promise.all([concernsApi.list(), productsApi.list({ limit: 200 })])
        setConcerns(cRes.concerns || [])
        setProducts((pRes.products || []).map(p => ({ _id: p.id, name: p.name, img: p.img })))
      } catch (err) { setError(err.message) }
      finally { setLoading(false) }
    }

    useEffect(() => { load() }, [])

    const handleToggle = async (c) => {
      setTogglingId(c._id)
      try { const res = await concernsApi.toggleStatus(c._id); setConcerns(p => p.map(x => x._id === c._id ? res.concern : x)) }
      catch (err) { setError(err.message) }
      finally { setTogglingId(null) }
    }

    const handleDelete = async () => {
      setDeleting(true); setDeleteError('')
      try { await concernsApi.remove(deleteTarget._id); setDeleteTarget(null); load() }
      catch (err) { setDeleteError(err.message) }
      finally { setDeleting(false) }
    }

    return (
      <div>
        <div className="adm-page-header">
          <div><h2>Shop by Concern</h2><p>Concerns banao aur unme products assign karo — homepage pe dikhega.</p></div>
        </div>
        {error && <div className="adm-alert adm-alert-error" style={{marginBottom:'1.25rem'}}><IconAlert /><span>{error}</span></div>}
        <div className="adm-toolbar">
          <div className="adm-toolbar-filters" />
          <div className="adm-toolbar-right">
            <button type="button" className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => setFormTarget({})}>
              <IconPlus width={16} height={16} /> Add Concern
            </button>
          </div>
        </div>
        <div className="adm-card">
          {loading ? <div className="adm-loading-cell">Loading…</div>
          : concerns.length === 0 ? <div className="adm-empty-state">Koi concern nahi. "Add Concern" se banao!</div>
          : <div className="adm-table-wrap"><table className="adm-table">
              <thead><tr><th>Concern</th><th>Products</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {concerns.map(c => (
                  <tr key={c._id}>
                    <td><strong>{c.emoji} {c.name}</strong>{c.description && <div className="adm-table-cell-muted">{c.description}</div>}</td>
                    <td className="adm-table-cell-muted">{c.products?.length || 0} products</td>
                    <td className="adm-table-cell-muted">{c.order}</td>
                    <td><label className="adm-switch"><input type="checkbox" checked={c.isActive} disabled={togglingId===c._id} onChange={() => handleToggle(c)} /><span className="adm-switch-track" /></label></td>
                    <td><div className="adm-row-actions">
                      <button type="button" className="adm-icon-btn" onClick={() => setFormTarget(c)}><IconEdit width={16} height={16} /></button>
                      <button type="button" className="adm-icon-btn adm-icon-danger" onClick={() => { setDeleteTarget(c); setDeleteError('') }}><IconTrash width={16} height={16} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table></div>}
        </div>
        {formTarget !== null && <ConcernFormModal initial={formTarget} products={products} onClose={() => setFormTarget(null)} onSaved={() => { setFormTarget(null); load() }} />}
        {deleteTarget && <ConfirmDialog title="Delete Concern" message={<>Delete <strong>{deleteTarget.emoji} {deleteTarget.name}</strong>?</>} error={deleteError} loading={deleting} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      </div>
    )
  }
  