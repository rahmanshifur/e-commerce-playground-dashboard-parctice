import { useStoreActions, useStoreState } from 'easy-peasy'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import api from '../service'
import useData from './useData'

const useAuth = () => {

    const authAction = useStoreActions((action) => action.auth)
    const isAuth = useStoreState(state => state.auth.isAuth)
    const authUser = useStoreState(state => state.auth.user)
    const token = useStoreState(state => state.auth.token)

    const Navigate = useNavigate()

    const { clearData } = useData()

    // Handel login
    const handelLogin = async (value) => {
        try {
            const res = await api.post('/auth/login', value)
            const token = res.data.payload
            const user = jwtDecode(token)
            authAction.login({
                user,
                token
            })
            // setAuthToken(token)
            return true
        } catch (error) {
            console.log('e', error)
            return false
        }

    }

    // Handel Register

    const handelRegister = async (value) => {
        try {
            const res = await api.post('/auth/register', value)
            console.log('res', res)
        } catch (e) {
            console.log(e.response.data.massage)
        }
    }

    // Hendel Logout

    const handelLogout = () => {
        authAction.logout()
        // clearAuthToken()
        // clearData()
        Navigate('/')
    }

    return {
        isAuth,
        authUser,
        token,
        handelLogin,
        handelRegister,
        handelLogout
    }
}
export default useAuth