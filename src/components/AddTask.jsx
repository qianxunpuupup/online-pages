import { useState } from 'react'
import { Plus, ChevronDown } from 'lucide-react'

const priorities = [
  { k: 'high', l: '高', c: '#EF4444' },
  { k: 'medium', l: '中', c: '#F59E0B' },
  { k: 'low', l: '低', c: '#10B981' }
]

export default function AddTask({ groups, defaultGroupId, onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueTime, setDueTime] = useState('18:00')
  const [groupId, setGroupId] = useState(defaultGroupId ?? groups[0]?.id ?? '')
  const [showOptions, setShowOptions] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    onAdd(t, priority, dueTime, groupId || groups[0].id)
    setTitle('')
    setShowOptions(false)
  }

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <div className="add-task-main">
        <span className="add-icon">
          <Plus size={18} />
        </span>
        <input
          className="add-input"
          placeholder="添加新任务，按回车创建..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setShowOptions(true)}
        />
        <button
          type="button"
          className="options-toggle"
          onClick={() => setShowOptions((v) => !v)}
        >
          <ChevronDown
            size={16}
            style={{ transform: showOptions ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}
          />
        </button>
      </div>

      {showOptions && (
        <div className="add-options">
          <div className="opt-row">
            <span className="opt-label">分组</span>
            <div className="opt-chips">
              {groups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={groupId === g.id ? 'chip chip-active' : 'chip'}
                  style={
                    groupId === g.id
                      ? { background: g.color + '18', borderColor: g.color, color: g.color }
                      : undefined
                  }
                  onClick={() => setGroupId(g.id)}
                >
                  <span className="chip-dot" style={{ background: g.color }} />
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          <div className="opt-row">
            <span className="opt-label">优先级</span>
            <div className="opt-chips">
              {priorities.map((p) => (
                <button
                  key={p.k}
                  type="button"
                  className={priority === p.k ? 'chip chip-active' : 'chip'}
                  style={
                    priority === p.k
                      ? { background: p.c + '18', borderColor: p.c, color: p.c }
                      : undefined
                  }
                  onClick={() => setPriority(p.k)}
                >
                  {p.l}
                </button>
              ))}
            </div>
          </div>

          <div className="opt-row">
            <span className="opt-label">截止时间</span>
            <input
              type="time"
              className="time-input"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>
        </div>
      )}
    </form>
  )
}
