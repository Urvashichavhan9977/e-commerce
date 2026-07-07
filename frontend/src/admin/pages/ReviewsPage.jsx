import { useEffect, useState } from 'react'
import { reviewsApi } from '../api/reviewsApi'
import ConfirmDialog from '../components/ConfirmDialog'
import Pagination from '../components/Pagination'
import { IconAlert, IconTrash, IconSearch, IconStar, IconReviews, IconEye, IconEyeOff } from '../components/AdminIcons'

const Stars = ({ rating }) => (
  <span className="adm-star-rating">
    {'★'.repeat(rating)}
    {'☆'.repeat(5 - rating)}
  </span>
)

function StatCard({ icon: Icon, tone, label, value, sub }) {
  return (
    <div className="adm-stat-card">
      <span className={`adm-stat-icon ${tone}`}><Icon /></span>
      <div className="adm-stat-body">
        <span>{label}</span>
        <strong>{value}</strong>
        {sub && <span className="adm-stat-sub">{sub}</span>}
      </div>
    </div>
  )
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('') // '', 'true', 'false'
  const [ratingFilter, setRatingFilter] = useState('')
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState({ total: 0, pages: 1, count: 0 })

  const [approvingId, setApprovingId] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, avgRating: 0 })

  const loadStats = async () => {
    try {
      const [all, approved, pending] = await Promise.all([
        reviewsApi.list({ limit: 1 }),
        reviewsApi.list({ limit: 100, isApproved: 'true' }),
        reviewsApi.list({ limit: 1, isApproved: 'false' }),
      ])
      const approvedReviews = approved.reviews || []
      const avgRating = approvedReviews.length > 0
        ? approvedReviews.reduce((s, r) => s + r.rating, 0) / approvedReviews.length
        : 0
      setStats({ total: all.total || 0, approved: approved.total || 0, pending: pending.total || 0, avgRating })
    } catch {
      // Non-critical — stat cards simply stay at their previous values.
    }
  }

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const params = { page, limit: 15 }
      if (search) params.search = search
      if (statusFilter) params.isApproved = statusFilter
      if (ratingFilter) params.rating = ratingFilter

      const res = await reviewsApi.list(params)
      setReviews(res.reviews || [])
      setMeta({ total: res.total || 0, pages: res.pages || 1, count: (res.reviews || []).length })
    } catch (err) {
      setError(err.message || 'Failed to load reviews.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter, ratingFilter])

  useEffect(() => {
    loadStats()
  }, [])

  useEffect(() => {
    setPage(1)
    const t = setTimeout(() => load(), 350)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleToggleApproval = async (review) => {
    setApprovingId(review._id)
    try {
      const res = await reviewsApi.setApproved(review._id, !review.isApproved)
      setReviews((prev) => prev.map((r) => (r._id === review._id ? res.review : r)))
      loadStats()
    } catch (err) {
      setError(err.message || 'Failed to update review status.')
    } finally {
      setApprovingId(null)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    setDeleteError('')
    try {
      await reviewsApi.remove(deleteTarget._id)
      setDeleteTarget(null)
      load()
      loadStats()
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete review.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h2>Reviews</h2>
          <p>Moderate customer reviews — approve, unapprove, or remove them.</p>
        </div>
      </div>

      <div className="adm-stat-grid" style={{ marginBottom: '1.5rem' }}>
        <StatCard icon={IconReviews} tone="green" label="Total Reviews" value={stats.total} />
        <StatCard icon={IconEye} tone="gold" label="Approved" value={stats.approved} sub="Visible on storefront" />
        <StatCard icon={IconEyeOff} tone="warning" label="Pending" value={stats.pending} sub="Needs moderation" />
        <StatCard icon={IconStar} tone="muted" label="Avg. Rating" value={stats.avgRating ? stats.avgRating.toFixed(1) : '—'} sub="Across approved reviews" />
      </div>

      {error && (
        <div className="adm-alert adm-alert-error" style={{ marginBottom: '1.25rem' }}>
          <IconAlert />
          <span>{error}</span>
        </div>
      )}

      <div className="adm-toolbar">
        <div className="adm-toolbar-filters">
          <div className="adm-search-wrap">
            <span className="adm-search-icon"><IconSearch width={16} height={16} /></span>
            <input
              className="adm-input"
              placeholder="Search title or comment…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className="adm-select" value={ratingFilter} onChange={(e) => { setRatingFilter(e.target.value); setPage(1) }}>
            <option value="">All Ratings</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div className="adm-toolbar-right">
          <div className="adm-tab-bar">
            <button type="button" className={`adm-tab-btn${statusFilter === '' ? ' active' : ''}`} onClick={() => { setStatusFilter(''); setPage(1) }}>
              All
            </button>
            <button type="button" className={`adm-tab-btn${statusFilter === 'false' ? ' active' : ''}`} onClick={() => { setStatusFilter('false'); setPage(1) }}>
              Pending
            </button>
            <button type="button" className={`adm-tab-btn${statusFilter === 'true' ? ' active' : ''}`} onClick={() => { setStatusFilter('true'); setPage(1) }}>
              Approved
            </button>
          </div>
        </div>
      </div>

      <div className="adm-card">
        {loading ? (
          <div className="adm-loading-cell">Loading reviews…</div>
        ) : reviews.length === 0 ? (
          <div className="adm-empty-state">No reviews match your filters.</div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Photos</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r._id}>
                    <td className="adm-table-cell-muted">{r.product?.name || '—'}</td>
                    <td>
                      <div>{r.user?.name || 'Deleted user'}</div>
                      {r.isVerifiedPurchase && <span className="adm-badge adm-badge-success">Verified</span>}
                    </td>
                    <td><Stars rating={r.rating} /></td>
                    <td style={{ maxWidth: 320 }}>
                      {r.title && <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>{r.title}</div>}
                      <div
                        style={{
                          maxWidth: 320,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: '0.8rem',
                          color: 'var(--adm-muted)',
                        }}
                      >
                        {r.comment}
                      </div>
                    </td>
                    <td>
                      {r.images?.length > 0 ? (
                        <div style={{ display: 'flex', gap: '.3rem' }}>
                          {r.images.slice(0, 3).map((src, i) => (
                            <img
                              key={i}
                              src={src}
                              alt=""
                              style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e0d5' }}
                            />
                          ))}
                          {r.images.length > 3 && (
                            <span style={{ fontSize: '.72rem', color: 'var(--adm-muted)' }}>+{r.images.length - 3}</span>
                          )}
                        </div>
                      ) : (
                        <span style={{ fontSize: '.75rem', color: 'var(--adm-muted)' }}>—</span>
                      )}
                    </td>
                    <td>
                      <label className="adm-switch">
                        <input
                          type="checkbox"
                          checked={r.isApproved}
                          disabled={approvingId === r._id}
                          onChange={() => handleToggleApproval(r)}
                        />
                        <span className="adm-switch-track" />
                      </label>
                    </td>
                    <td>
                      <div className="adm-row-actions">
                        <button
                          type="button"
                          className="adm-icon-btn adm-icon-danger"
                          onClick={() => {
                            setDeleteTarget(r)
                            setDeleteError('')
                          }}
                          aria-label="Delete"
                        >
                          <IconTrash width={16} height={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination page={page} pages={meta.pages} total={meta.total} count={meta.count} onPageChange={setPage} />
      </div>

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Review"
          message="Are you sure you want to permanently delete this review? This cannot be undone."
          error={deleteError}
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}