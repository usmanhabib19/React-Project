import React, { useRef } from 'react'

const UseRef = () => {
    const inputRef = useRef(null)

    const handleFocus = () => {
        inputRef.current.focus()
        inputRef.current.style.backgroundColor = "#e9ecef"
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col text-center">
                    <h1>useRef Hook</h1>
                    <p className="lead">Persist values between renders or access DOM elements directly.</p>
                    <div className="card shadow-sm p-4 mt-4">
                        <div className="mb-3">
                            <input ref={inputRef} type="text" className="form-control" placeholder="Click button to focus me..." />
                        </div>
                        <button className="btn btn-info text-white" onClick={handleFocus}>Focus Input</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UseRef
