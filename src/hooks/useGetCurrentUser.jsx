import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function useGetCurrentUser() {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/me`,

                    { withCredentials: true }
                )
                dispatch(setUserData(result.data))
                // console.log(result.data);

            } catch (error) {
                console.error(error);

            }

        }
        getCurrentUser()
    }, [])




}

export default useGetCurrentUser
