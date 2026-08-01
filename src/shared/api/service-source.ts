// Forcado para mock temporariamente a pedido do usuario
const dataSource: string = 'mock' // (window as any)._env_?.VITE_DATA_SOURCE ?? import.meta.env.VITE_DATA_SOURCE
export const shouldUseApi = dataSource === 'api'
