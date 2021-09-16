import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export default function Test() {
    const [inprop, setInprop] = useState(false)
    return (
        <div className="test">
            <CSSTransition in={inprop} timeout={2000} classNames="box-move">
                <div className="box"></div>
            </CSSTransition>
            <button onClick={() => setInprop(true)}>start</button>
            <button onClick={() => setInprop(false)}>back</button>
        </div>
    )
}


