import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function User({users}) {
    return users.map(({ name }) => (
        <Typography variant={"body1"}>
            {name}
        </Typography>
    ))
}
