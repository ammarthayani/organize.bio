import React from 'react'
import Button from '@material-ui/core/Button'

function Login ({signin, switchSignin}) {

    if (signin) {
    return(

        <Button onClick={() => switchSignin()} >Sign Up</Button>

    )
    } 
    return (
        <Button onClick={() => switchSignin()} >Sign In</Button>
    )
}

export default Login
