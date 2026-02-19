// Migration script to migrate old todo and planner data to new tasks system
export const migrateOldData = () => {
  try {
    const oldTodos = localStorage.getItem('todos')
    const oldDailyPlans = localStorage.getItem('dailyPlans')
    
    let migrated = false
    const newTasks = []
    
    // Migrate todos
    if (oldTodos) {
      const todos = JSON.parse(oldTodos)
      if (Array.isArray(todos) && todos.length > 0) {
        todos.forEach(todo => {
          newTasks.push({
            id: todo.id || Date.now() + Math.random(),
            title: todo.text || todo.title,
            priority: 'medium',
            category: 'todo',
            completed: todo.completed || false,
            dueDate: todo.dueDate || new Date().toISOString().split('T')[0],
            createdAt: todo.createdAt || new Date().toISOString()
          })
        })
        migrated = true
        console.log(`Migrated ${todos.length} todos`)
      }
    }
    
    // Migrate daily plans
    if (oldDailyPlans) {
      const plans = JSON.parse(oldDailyPlans)
      if (Array.isArray(plans) && plans.length > 0) {
        plans.forEach(plan => {
          newTasks.push({
            id: plan.id || Date.now() + Math.random(),
            title: plan.title || plan.text,
            priority: plan.priority || 'medium',
            category: 'planner',
            completed: plan.completed || false,
            dueDate: plan.dueDate || new Date().toISOString().split('T')[0],
            createdAt: plan.createdAt || new Date().toISOString()
          })
        })
        migrated = true
        console.log(`Migrated ${plans.length} daily plans`)
      }
    }
    
    // Save migrated tasks
    if (migrated && newTasks.length > 0) {
      // Merge with existing tasks if any
      const existingTasks = localStorage.getItem('tasks')
      let allTasks = newTasks
      
      if (existingTasks) {
        const parsed = JSON.parse(existingTasks)
        if (Array.isArray(parsed)) {
          // Avoid duplicates by checking IDs
          const existingIds = new Set(parsed.map(t => t.id))
          const uniqueNewTasks = newTasks.filter(t => !existingIds.has(t.id))
          allTasks = [...parsed, ...uniqueNewTasks]
        }
      }
      
      localStorage.setItem('tasks', JSON.stringify(allTasks))
      console.log(`Total tasks after migration: ${allTasks.length}`)
      
      // Optionally remove old data (commented out for safety)
      // localStorage.removeItem('todos')
      // localStorage.removeItem('dailyPlans')
      
      return {
        success: true,
        migratedCount: newTasks.length,
        totalCount: allTasks.length
      }
    }
    
    return { success: false, migratedCount: 0, totalCount: 0 }
  } catch (error) {
    console.error('Migration error:', error)
    return { success: false, error: error.message, migratedCount: 0 }
  }
}

// Auto-run migration on import
if (typeof window !== 'undefined') {
  setTimeout(() => {
    const result = migrateOldData()
    if (result.success && result.migratedCount > 0) {
      console.log('✅ Data migration completed:', result)
    }
  }, 1000)
}

export default migrateOldData
