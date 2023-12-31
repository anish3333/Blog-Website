import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector} from 'react-redux'

//authentication indicates if the children need to be authenticated or not
function Protected({children, authentication = true}) {
    const authStatus = useSelector(state => state.auth.status)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    
    useEffect(()=>{
        
        if(authentication && authentication !== authStatus){
            navigate('/login');
        } else if(!authentication && authentication !== authStatus){
            navigate('/')
        }
        
        setLoading(false);

    }, [authentication, authStatus, navigate])

  
    return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected