import axios, { AxiosError, AxiosResponse } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📤 Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      })
    }
    
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📥 Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      })
    }
    
    return response.data
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    
    if (error.response?.status === 403) {
      // Forbidden - show access denied message
      console.error('Access denied')
    }
    
    if (error.response?.status && error.response.status >= 500) {
      // Server error - show generic error message
      console.error('Server error occurred')
    }
    
    // Create standardized error object
    const errorObj = {
      message: (error.response?.data as { message?: string })?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status,
      code: error.code,
    }
    
    console.error('API Error:', errorObj)
    return Promise.reject(errorObj)
  }
)

export default axiosClient 