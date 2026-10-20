import { LayoutDashboard, Calendar, Clock, CircleCheck, Plus } from 'lucide-react'

const filters = [
  { key: 'all', label: '全部任务', icon: LayoutDashboard },
  { key: 'today', label: '今日任务', icon: Calendar },
  { key: 'upcoming', label: '即将到来', icon: Clock },
  { key: 'completed', label: '已完成', icon: CircleCheck }
]

export default function Sidebar({
  groups,
  tasks,
  selectedGroupId,
  selectedFilter,
  onSelectGroup,
  onSelectFilter,
  onAddGroup,
  onDeleteGroup
}) {
  const countByGroup = (groupId) => tasks.filter((t) => t.groupId === groupId).length
  const doneByGroup = (groupId) =>
    tasks.filter((t) => t.groupId === groupId && t.completed).length

  const countByFilter = (filterKey) => {
    switch (filterKey) {
      case 'all':
        return tasks.length
      case 'today':
      case 'upcoming':
        return tasks.filter((t) => !t.completed).length
      case 'completed':
        return tasks.filter((t) => t.completed).length
      default:
        return 0
    }
  }

  const isGroupSelected = selectedGroupId !== null

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">
          <CircleCheck size={20} />
        </div>
        <div className="brand-text">
          <div className="brand-title">TaskFlow</div>
          <div className="brand-sub">待办清单</div>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="section-label">快捷筛选</div>
        <div className="filter-list">
          {filters.map((f) => {
            const Icon = f.icon
            const active = !isGroupSelected && selectedFilter === f.key
            return (
              <button
                key={f.key}
                className={active ? 'filter-item filter-item-active' : 'filter-item'}
                onClick={() => {
                  onSelectGroup(null)
                  onSelectFilter(f.key)
                }}
              >
                <span className="filter-icon">
                  <Icon size={16} />
                </span>
                <span className="filter-label">{f.label}</span>
                <span className="filter-count">{countByFilter(f.key)}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="section-label-row">
          <div className="section-label">任务分组</div>
          <button className="icon-btn" title="新建分组" onClick={onAddGroup}>
            <Plus size={14} />
          </button>
        </div>
        <div className="group-list">
          {groups.map((g) => {
            const active = selectedGroupId === g.id
            const total = countByGroup(g.id)
            const done = doneByGroup(g.id)
            const canDelete = !['work', 'personal', 'study', 'shopping'].includes(g.id)
            return (
              <div
                key={g.id}
                className={active ? 'group-item group-item-active' : 'group-item'}
                onClick={() => {
                  onSelectGroup(g.id)
                  onSelectFilter('all')
                }}
              >
                <span className="group-dot" style={{ background: g.color }} />
                <span className="group-name">
                  {g.name}
                  <span className="group-en">{g.nameEn}</span>
                </span>
                <span className="group-count">
                  {total > 0 ? (done > 0 ? `${done}/${total}` : `${total}`) : '0'}
                </span>
                {canDelete && (
                  <button
                    className="group-delete"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteGroup(g.id)
                    }}
                    title="删除分组"
                  >
                    ×
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="footer-total">
          <span>总任务</span>
          <strong>{tasks.length}</strong>
        </div>
        <div className="footer-done">
          <span>已完成</span>
          <strong>{tasks.filter((t) => t.completed).length}</strong>
        </div>
      </div>
    </aside>
  )
}
