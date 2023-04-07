import React from 'react'
import "../CSS/bootstrap.min.css"

export default function Alert(props) {
    return (
        props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{props.alert.msg}</strong> 
        </div>
    )
}

Alert.defaultProps = {alert : "Please Enter Some Text"};
