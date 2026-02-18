// Mock sync service - replace with real API calls later
export const mockSyncNow = async () => {
  // simulate network latency
  await new Promise((res) => setTimeout(res, 700))
  const now = new Date().toLocaleString()
  try {
    localStorage.setItem('lastSync', now)
  } catch (e) {}
  return { ok: true, message: `Last synced: ${now}`, date: now }
}

export default { mockSyncNow }
