// src/composables/useAuth.js
import { ref } from 'vue'

const accessToken = ref(null)
const refreshToken = ref(null)
const userID = ref(null)

const initAuth = () => {
    accessToken.value = localStorage.getItem('accessToken')
    refreshToken.value = localStorage.getItem('refreshToken')
    userID.value = localStorage.getItem('userID')
}

const setAuth = ({ access, refresh, id }) => {
    accessToken.value = access
    refreshToken.value = refresh
    userID.value = id
    localStorage.setItem('accessToken', access)
    localStorage.setItem('refreshToken', refresh)
    localStorage.setItem('userID', id)
}

const clearAuth = () => {
    accessToken.value = null
    refreshToken.value = null
    userID.value = null
    localStorage.clear()
}

export const useAuth = () => {
    return {
        accessToken,
        refreshToken,
        userID,
        initAuth,
        setAuth,
        clearAuth
    }
}
