import React from 'react'

interface HelloProps {
    message: string;
}
const Hello: React.FC<HelloProps> = (props) => {
    return (
        <div>
            {props.message}
        </div>
    )
}
Hello.defaultProps = {
    message: "hh"
}




export default Hello

