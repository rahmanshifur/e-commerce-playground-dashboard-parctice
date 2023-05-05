import { useStoreActions, useStoreState } from 'easy-peasy'
import { useEffect, useState } from 'react'
import { PAGE_SIZE } from '../const'
import api from '../service'

const useData = (baseUrl = '/') => {
    const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE)
    const dataAction = useStoreActions(action => action.data)
    const dataState = useStoreState(state => state.data.data)


    // Clear Data Local Sotorage
    const clearData = () => {
        dataAction.clearData()
    }

    // Fatch Data
    const fatchData = async (customUrl) => {
        try {
            const res = await api.get(customUrl)
            dataAction.setData({
                key: customUrl.split('?')[0],
                value: res.data.payload
            })

        } catch (error) {
            console.log('error', error.response.data.massage)
        }
    }

    // Create Data
    const createHandler = async (value, customUrl = null, headers = {}) => {
        if (!customUrl) {
            customUrl = baseUrl.split('?')[0]
        }
        try {
            const { data } = await api.post(customUrl, value, { headers })
            const newArr = dataState[customUrl] ? dataState[customUrl].data.concat(data.payload) : [data.payload]
            dataAction.setData({
                key: customUrl,
                value: {
                    data: newArr,
                    currentPage: 1,
                    totalDocument: 1
                }
            })
            return true
        } catch (error) {
            console.log('error', error)
            return false
        }
    }

    // update Data
    const updateHandler = async (value, id, headers = {}) => {
        const customUrl = baseUrl.split('?')[0]
        try {
            const { data } = await api.put(`${customUrl}/${id}`, value, { headers })
            const dataId = data.payload._id
            const updatedData = dataState[customUrl]
            updatedData.data.forEach(item => {
                if (item._id === dataId) {
                    item = data.payload
                }
                return item
            })
            dataAction.setData({
                key: customUrl,
                value: updatedData
            })
        } catch (error) {
            console.log("error", error)
        }
    }


    // Delete Data
    const deleteData = async (id, customUrl = null) => {
        if (!customUrl) {
            customUrl = baseUrl.split('?')[0]
        }
        try {
            const { data } = await api.delete(`${customUrl}/${id}`)
            const oldData = dataState[customUrl]
            const filterArr = oldData.data.filter(item => item._id !== id)
            dataAction.setData({
                key: customUrl,
                value: {
                    ...oldData,
                    data: filterArr
                },
            })
        } catch (error) {
            console.log("error", error.toString())
        }
    }

    // Get Data Details
    const getDetails = (url) => {
        url = url.split('/')
        const key = `/${url[1]}`
        const dataId = url[2]
        const data = dataState[key].data
        if (!data || data.length === 0) return null
        const findData = data?.filter(item => item._id === dataId)
        if (findData.length === 0) return null
        return findData[0]
    }

    const handleChangePage = (_e, newPage) => {
        fatchData(`${baseUrl.split('?')[0]}?page=${newPage + 1}&limit=${rowsPerPage}`)
    }

    const handleChangeRowsPerPage = (event) => {
        const pageSize = parseInt(event.target.value, 10)
        setRowsPerPage(pageSize);
        fatchData(`${baseUrl.split('?')[0]}?page=1&limit=${pageSize}`)
    };

    useEffect(() => {
        if (baseUrl.length > 1 && !dataState[baseUrl]) {
            fatchData(baseUrl)
        }
    }, [])

    return {
        data: dataState[baseUrl.split('?')[0]],
        rowsPerPage,
        clearData,
        createHandler,
        updateHandler,
        deleteData,
        getDetails,
        handleChangePage,
        handleChangeRowsPerPage
    }
}

export default useData