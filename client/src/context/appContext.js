import React, { useReducer, useContext } from "react";
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SIDE_BAR,
    LOG_OUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOBS_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE
} from './actions';
import { reducer } from "./reducer";
import axios from 'axios';
//import { header } from "express/lib/request";

//setup user when app loads
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')



const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token || '',
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
    showSidebar: false,
    isEditing: '',
    editedJobId: '',
    position: '',
    company: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['pending', 'declined', 'interview'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
    stats: {},
    monthlyApplications: [],
    search: '',
    searchJobType: 'all',
    searchStatus: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}




//create context
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);



    //axios
    const authFetch = axios.create({
        baseURL: 'api/v1'
    })

    //request
    authFetch.interceptors.request.use((config) => {
        config.headers.common['Authorization'] = `Bearer ${state.token}`
        return config
    }, (error) => {
        return Promise.reject(error)
    })
    authFetch.interceptors.response.use(function (response) {

        return response;
    }, function (error) {
        console.log(error.response);
        if (error.response.status === 401) {
            dispatch({ type: LOG_OUT_USER })
        }
        return Promise.reject(error);
    });

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 4000);
    }
    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDE_BAR })
    }

    const addUserToLocalStorage = (token, user, location) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)

    }
    const removeUserFromLocal = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('location')

    }
    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await authFetch.post('/auth/register', currentUser)
            // console.log(response);
            const { user, location, token } = response.data
            dispatch({
                type: REGISTER_USER_SUCCESS, payload: {
                    user,
                    token,
                    location
                }
            })
            addUserToLocalStorage(token, user, location)
        } catch (error) {
            //console.log(error.response);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }
    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const response = await axios.post('/api/v1/auth/login', currentUser)
            // console.log(response);
            const { user, location, token } = response.data
            dispatch({
                type: LOGIN_USER_SUCCESS, payload: {
                    user,
                    token,
                    location
                }
            })
            addUserToLocalStorage(token, user, location)
        } catch (error) {
            // console.log(error.response);
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }
    const logout = () => {
        dispatch({ type: LOG_OUT_USER })
        removeUserFromLocal()
    }
    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('/auth/updateUser', currentUser)
            //console.log(data)
            const { user, location, token } = data
            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location, token } })
            addUserToLocalStorage(token, user, location)
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({ type: UPDATE_USER_ERROR, payload: { msg: error.response.data.msg } })
                //console.log(error.response);
            }
            dispatch({ type: UPDATE_USER_ERROR, payload: { msg: error.response.data.msg } })
            //console.log(error.response);
        }
        clearAlert()
    }
    const handlechange = ({ name, value }) => {
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
    }

    const clearvalues = () => {
        dispatch({ type: CLEAR_VALUES })
    }

    const createjob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN })
        try {
            const { position, company, status, jobType, jobLocation } = state
            await authFetch.post('/jobs', {
                position, company, status, jobType, jobLocation
            })
            dispatch({ type: CREATE_JOB_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
            clearAlert()
        } catch (error) {
            if (error.response.status === 401) {
                dispatch({ type: CREATE_JOB_ERROR, payload: { msg: error.response.message } })
                clearAlert()
            }
        }
        clearAlert()
    }

    const getJobs = async () => {
        const { search, searchJobType, searchStatus, sort, page } = state
        let url = `/jobs?jobType=${searchJobType}&status=${searchStatus}&sort=${sort}&page=${page}`
        if (search) {
            url = url + `&search=${search}`
        }
        dispatch({ type: GET_JOBS_BEGIN })
        try {
            const { data } = await authFetch.get(url)
            const { jobs, numOfPages, totalJobs } = data
            dispatch({
                type: GET_JOBS_SUCCESS, payload: {
                    jobs, numOfPages, totalJobs
                }
            })

        } catch (error) {
            // console.log(error.response);
            //it doesnt make sense to be getting errors hence will log out user if incase it happens
            logout()
        }
        clearAlert()
    }

    const seteditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: { id } })
    }

    const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN })
        try {
            const { company, position, jobLocation, jobType, status } = state
            await authFetch.patch(`/jobs/${state.editedJobId}`, {
                company,
                position,
                jobLocation,
                jobType,
                status
            })
            dispatch({ type: EDIT_JOB_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: EDIT_JOB_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }


    const deleteJob = async (jobId) => {
        // console.log(`delete job ${id}`);
        dispatch({ type: DELETE_JOBS_BEGIN })
        try {
            //delete the job
            await authFetch.delete(`/jobs/${jobId}`)
            //get the latest jobs after deletion 
            getJobs()
        } catch (error) {
            // console.log(error.response);
            logout()
        }
    }
    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN })
        try {
            const { data } = await authFetch.get('/jobs/stats')
            // console.log(data);
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.defaultStats,
                    monthlyApplications: data.monthlyApplications
                }
            })

        } catch (error) {
            // console.log(error.response);
            //logout user if  500 and 401 status error code
            logout()
        }
        clearAlert()
    }
    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS })
    }
    const changePage = (page) => {
        dispatch({ type: CHANGE_PAGE, payload: { page } })
    }
    return (
        <AppContext.Provider value={{ ...state, displayAlert, registerUser, loginUser, toggleSidebar, logout, updateUser, handlechange, clearvalues, createjob, getJobs, seteditJob, deleteJob, editJob, showStats, clearFilters, changePage }}>
            {children}
        </AppContext.Provider>
    )
}


export const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState }

