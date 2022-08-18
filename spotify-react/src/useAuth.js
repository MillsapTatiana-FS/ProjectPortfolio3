import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

    let ignore = false;
    useEffect(() => {
        if (code) {   
        axios.post("http://localhost:3001/login", {
            code,
        }).then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
//             window.history.pushState({}, null, '/')
        }).catch(() => {
            window.location = "/"
            })
        }
        return () => {
            ignore = true;
        }
    }, [code])
  return { accessToken, refreshToken, expiresIn }
}
    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios.post("http://localhost:3001/refresh", {
                refreshToken,
            })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
            })
            .catch(() => {
                })
            }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
        }, [refreshToken, expiresIn]);
    

    
