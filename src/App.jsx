import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TaskList from './components/TaskList'
import Stats from './components/Stats'
import { useLocalStorage, generateId } from './hooks/useLocalStorage'
import { defaultGroups, defaultTasks, groupColorPalette } from './data'

export default function App() {
  const [groups, setGroups] = useLocalStorage('todo:groups', defaultGroups)
  const [tasks, setTasks] = useLocalStorage('todo:tasks', defaultTasks)
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('today')

  const handleAddGroup = () => {
    const name = prompt('请输入分组名称：')
    if (!name || !name.trim()) return
    const nameEn = prompt('请输入分组英文名（可选）：', '') || ''
    const color = groupColorPalette[groups.length % groupColorPalette.length]
    setGroups((prev) => [
      ...prev,
      { id: generateId(), name: name.trim(), nameEn: nameEn.trim(), color }
    ])
  }

  const handleDeleteGroup = (groupId) => {
    if (!confirm('删除此分组？该分组下的所有任务也会被删除。')) return
    setGroups((prev) => prev.filter((g) => g.id !== groupId))
    setTasks((prev) => prev.filter((t) => t.groupId !== groupId))
    if (selectedGroupId === groupId) setSelectedGroupId(null)
  }

  const handleAddTask = (title, priority, dueTime, groupId) => {
    const newTask = {
      id: generateId(),
      title,
      priority,
      dueTime: dueTime || '18:00',
      groupId,
      completed: false,
      createdAt: Date.now()
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="app-shell">
      <Sidebar
        groups={groups}
        tasks={tasks}
        selectedGroupId={selectedGroupId}
        selectedFilter={selectedFilter}
        onSelectGroup={setSelectedGroupId}
        onSelectFilter={setSelectedFilter}
        onAddGroup={handleAddGroup}
        onDeleteGroup={handleDeleteGroup}
      />
      <TaskList
        tasks={tasks}
        groups={groups}
        selectedGroupId={selectedGroupId}
        filter={selectedFilter}
        onAdd={handleAddTask}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
      <Stats tasks={tasks} groups={groups} />
    </div>
  )
}
