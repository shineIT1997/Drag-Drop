export const isPromise = (obj) => {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

const callAxiosApi = async (api) => {
  try {
    await api
  } catch (error) {

  }
}
