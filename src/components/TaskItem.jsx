import { Check, Clock, Trash2 } from 'lucide-react'
import { priorityConfig } from '../data'

export default function TaskItem({ task, group, onToggle, onDelete }) {
  const prio = priorityConfig[task.priority]

  return (
    <div className={task.completed ? 'task task-done' : 'task'}>
      <button
        className={task.completed ? 'check check-done' : 'check'}
        onClick={() => onToggle(task.id)}
        style={!task.completed && group ? { borderColor: group.color + '80' } : undefined}
        aria-label={task.completed ? '标记未完成' : '标记完成'}
      >
        {task.completed && <Check size={14} />}
      </button>

      <div className="task-body">
        <div className="task-main">
          <span className="task-title">{task.title}</span>
          <span className={prio.cls}>{prio.label}</span>
        </div>
        <div className="task-meta">
          {group && (
            <span className="task-group" style={{ color: group.color }}>
              <span className="task-group-dot" style={{ background: group.color }} />
              {group.name}
            </span>
          )}
          <span className="task-due">
            <Clock size={12} />
            截止 {task.dueTime}
          </span>
        </div>
      </div>

      <button
        className="task-delete"
        onClick={() => onDelete(task.id)}
        title="删除任务"
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}
