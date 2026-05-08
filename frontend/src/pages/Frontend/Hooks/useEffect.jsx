import React, { useState, useEffect } from 'react'

const UseEffect = () => {
    const [count, setCount] = useState(0)
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString())
        }, 1000)

        // Cleanup on unmount
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col text-center">
                    <h1>useEffect Hook</h1>
                    <p className="lead">Handle side effects in functional components.</p>
                    <div className="card shadow-sm p-4 mt-4">
                        <h3>Current Time: {currentTime}</h3>
                        <p className="mt-3">Count: {count}</p>
                        <button className="btn btn-primary" onClick={() => setCount(count + 1)}>Update Count</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UseEffect
