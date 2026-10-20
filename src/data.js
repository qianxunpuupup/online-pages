// 默认分组数据
export const defaultGroups = [
  { id: 'work', name: '工作', nameEn: 'Work', color: '#8B5CF6' },
  { id: 'personal', name: '个人', nameEn: 'Personal', color: '#3B82F6' },
  { id: 'study', name: '学习', nameEn: 'Study', color: '#10B981' },
  { id: 'shopping', name: '购物', nameEn: 'Shopping', color: '#F59E0B' }
]

// 默认任务数据
export const defaultTasks = [
  { id: 't1', title: '完成项目提案', completed: false, priority: 'high', dueTime: '14:00', groupId: 'work', createdAt: Date.now() },
  { id: 't2', title: '安排团队同步会', completed: false, priority: 'medium', dueTime: '16:00', groupId: 'work', createdAt: Date.now() + 1 },
  { id: 't3', title: '回复客户邮件', completed: true, priority: 'medium', dueTime: '10:00', groupId: 'work', createdAt: Date.now() + 2 },
  { id: 't4', title: '健身房锻炼', completed: false, priority: 'low', dueTime: '19:00', groupId: 'personal', createdAt: Date.now() + 3 },
  { id: 't5', title: '给家人打电话', completed: false, priority: 'medium', dueTime: '20:30', groupId: 'personal', createdAt: Date.now() + 4 },
  { id: 't6', title: '复习 Python 笔记', completed: false, priority: 'low', dueTime: '20:00', groupId: 'study', createdAt: Date.now() + 5 },
  { id: 't7', title: '阅读《代码整洁之道》第 5 章', completed: true, priority: 'medium', dueTime: '22:00', groupId: 'study', createdAt: Date.now() + 6 },
  { id: 't8', title: '买牛奶和面包', completed: true, priority: 'medium', dueTime: '18:00', groupId: 'shopping', createdAt: Date.now() + 7 },
  { id: 't9', title: '整理桌面文件', completed: false, priority: 'low', dueTime: '22:00', groupId: 'personal', createdAt: Date.now() + 8 },
  { id: 't10', title: '完成算法练习 3 道', completed: false, priority: 'high', dueTime: '21:00', groupId: 'study', createdAt: Date.now() + 9 }
]

// 新建分组时可选的颜色调色板
export const groupColorPalette = [
  '#EC4899', '#8B5CF6', '#3B82F6', '#14B8A6',
  '#F59E0B', '#EF4444', '#6366F1', '#10B981'
]

// 筛选类型
export const filterLabels = {
  all: '全部任务',
  today: '今日任务',
  upcoming: '即将到来',
  completed: '已完成'
}

// 优先级配置
export const priorityConfig = {
  high: { label: '高优先级', cls: 'prio prio-high' },
  medium: { label: '中优先级', cls: 'prio prio-medium' },
  low: { label: '低优先级', cls: 'prio prio-low' }
}
