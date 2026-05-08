import React, { useState } from 'react'

const UseState = () => {
    const [count, setCount] = useState(0)

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col text-center">
                    <h1>useState Hook</h1>
                    <p className="lead">Manage local state in functional components.</p>
                    <div className="card shadow-sm p-4 mt-4">
                        <h3>Count: {count}</h3>
                        <div className="mt-3">
                            <button className="btn btn-primary mx-2" onClick={() => setCount(count + 1)}>Increment</button>
                            <button className="btn btn-danger mx-2" onClick={() => setCount(count - 1)}>Decrement</button>
                            <button className="btn btn-secondary mx-2" onClick={() => setCount(0)}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UseState
