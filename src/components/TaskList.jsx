import AddTask from './AddTask'
import TaskItem from './TaskItem'
import { filterLabels } from '../data'

const weekday = ['日', '一', '二', '三', '四', '五', '六']

export default function TaskList({
  tasks,
  groups,
  selectedGroupId,
  filter,
  onAdd,
  onToggle,
  onDelete
}) {
  const now = new Date()
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`
  const weekStr = '星期' + weekday[now.getDay()]

  const group = groups.find((g) => g.id === selectedGroupId)
  const title = group ? group.name : filterLabels[filter]
  const subtitle = group ? group.nameEn : `${dateStr} · ${weekStr}`

  // 过滤任务：选中分组时只看该分组；否则按筛选条件
  const filtered = tasks
    .filter((t) => !selectedGroupId || t.groupId === selectedGroupId)
    .filter((t) => {
      if (filter === 'all' || selectedGroupId) return true
      if (filter === 'completed') return t.completed
      return !t.completed
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      const order = { high: 0, medium: 1, low: 2 }
      if (order[a.priority] === order[b.priority]) {
        return a.dueTime.localeCompare(b.dueTime)
      }
      return order[a.priority] - order[b.priority]
    })

  const sectionTitle = selectedGroupId
    ? `${group?.name}分组 · 共 ${filtered.length} 项`
    : filter === 'completed'
      ? `已完成 · 共 ${filtered.length} 项`
      : `待办任务 · ${filtered.filter((t) => !t.completed).length} 项待处理`

  return (
    <main className="tasklist">
      <header className="tasklist-header">
        <div>
          <h1 className="tasklist-title">
            {group && <span className="title-dot" style={{ background: group.color }} />}
            {title}
          </h1>
          <div className="tasklist-sub">{subtitle}</div>
        </div>
        <div className="tasklist-summary">
          <span className="summary-num">{filtered.length}</span>
          <span className="summary-lbl">个任务</span>
        </div>
      </header>

      <AddTask groups={groups} defaultGroupId={selectedGroupId ?? undefined} onAdd={onAdd} />

      <div className="task-section-title">{sectionTitle}</div>

      <div className="task-list-scroll">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✨</div>
            <div className="empty-title">
              {filter === 'completed' ? '还没有完成的任务' : '暂无任务'}
            </div>
            <div className="empty-desc">
              {filter === 'completed' ? '加油完成第一个任务吧！' : '在上方输入框创建你的第一个任务'}
            </div>
          </div>
        ) : (
          filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              group={groups.find((g) => g.id === task.groupId)}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </main>
  )
}
