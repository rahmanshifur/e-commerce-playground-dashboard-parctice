import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 25000,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ4MWYxODUxNTk2NDk4NGQ5MTJjYjkiLCJmaXJzdE5hbWUiOiJTaWFtIiwibGFzdE5hbWUiOiJIYXdsYWRhciIsImVtYWlsIjoic2lhbUBnbWFpbC5jb20iLCJzdGF0dXMiOjEsInR5cGUiOjEsImlhdCI6MTY4MzI1NDU2OCwiZXhwIjoxNjg0NTUwNTY4fQ.ZT5ke1DXEI7_xHWq7c28tyvvh67hoIdXQ4OaNDEEPYw"

    },
});

// export const setAuthToken = (authToken = null) => {
//     localStorage.setItem('authToken', authToken)
//     api.defaults.headers.common['Authorization'] = authToken;
// }

// export const clearAuthToken = () => {
//     localStorage.removeItem('authToken')
//     api.defaults.headers.common['Authorization'] = '';
// }

export default api;
