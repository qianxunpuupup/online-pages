import { Target, TrendingUp, Lightbulb } from 'lucide-react'

const weekday = ['日', '一', '二', '三', '四', '五', '六']

export default function Stats({ tasks, groups }) {
  const total = tasks.length
  const done = tasks.filter((t) => t.completed).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)
  const circumference = 2 * Math.PI * 54
  const dashOffset = circumference * (1 - percent / 100)

  const upcoming = [...tasks]
    .filter((t) => !t.completed)
    .sort((a, b) => a.dueTime.localeCompare(b.dueTime))
    .slice(0, 4)

  const groupStats = groups
    .map((g) => {
      const list = tasks.filter((t) => t.groupId === g.id)
      const gDone = list.filter((t) => t.completed).length
      return { group: g, total: list.length, done: gDone }
    })
    .filter((s) => s.total > 0)

  const now = new Date()
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`
  const weekStr = '星期' + weekday[now.getDay()]

  return (
    <aside className="stats">
      <div className="stats-card">
        <div className="stats-header">
          <div className="stats-title">进度概览</div>
          <div className="stats-date">
            {dateStr} · {weekStr}
          </div>
        </div>

        <div className="progress-wrap">
          <svg viewBox="0 0 120 120" className="progress-ring">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#E2E8F0" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="url(#grad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset .5s ease' }}
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="progress-center">
            <div className="progress-pct">
              {percent}
              <span>%</span>
            </div>
            <div className="progress-sub">
              {done} / {total} 已完成
            </div>
          </div>
        </div>

        <div className="mini-stats">
          <div className="mini-stat">
            <div className="mini-icon" style={{ background: '#EEF2FF', color: '#6366F1' }}>
              <Target size={14} />
            </div>
            <div>
              <div className="mini-val">{total - done}</div>
              <div className="mini-lbl">待完成</div>
            </div>
          </div>
          <div className="mini-stat">
            <div className="mini-icon" style={{ background: '#D1FAE5', color: '#10B981' }}>
              <TrendingUp size={14} />
            </div>
            <div>
              <div className="mini-val">{total === 0 ? '0' : percent + '%'}</div>
              <div className="mini-lbl">完成率</div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-card">
        <div className="stats-title">
          <Lightbulb size={14} /> 分组完成情况
        </div>
        <div className="group-stats">
          {groupStats.map(({ group, total: gt, done: gd }) => {
            const pct = gt === 0 ? 0 : Math.round((gd / gt) * 100)
            return (
              <div className="gstat" key={group.id}>
                <div className="gstat-head">
                  <span className="gstat-name">
                    <span className="gstat-dot" style={{ background: group.color }} />
                    {group.name}
                  </span>
                  <span className="gstat-num">
                    {gd}/{gt}
                  </span>
                </div>
                <div className="gstat-bar">
                  <div
                    className="gstat-fill"
                    style={{ width: pct + '%', background: group.color }}
                  />
                </div>
              </div>
            )
          })}
          {groupStats.length === 0 && <div className="empty-hint">暂无分组任务</div>}
        </div>
      </div>

      <div className="stats-card">
        <div className="stats-title">即将到来的任务</div>
        <div className="upcoming-list">
          {upcoming.map((t) => {
            const g = groups.find((x) => x.id === t.groupId)
            return (
              <div className="upcoming-item" key={t.id}>
                <span
                  className="upcoming-dot"
                  style={{ background: g?.color ?? '#94A3B8' }}
                />
                <div className="upcoming-main">
                  <span className="upcoming-title">{t.title}</span>
                  <span className="upcoming-time">今天 {t.dueTime}</span>
                </div>
              </div>
            )
          })}
          {upcoming.length === 0 && (
            <div className="empty-hint">没有待办任务，干得漂亮！🎉</div>
          )}
        </div>
      </div>
    </aside>
  )
}
