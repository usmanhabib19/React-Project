import React, { useReducer } from 'react'

const initialState = { count: 0 }

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        case 'reset':
            return initialState
        default:
            throw new Error()
    }
}

const UseReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col text-center">
                    <h1>useReducer Hook</h1>
                    <p className="lead">Manage complex state logic more predictably than useState.</p>
                    <div className="card shadow-sm p-4 mt-4">
                        <h3>Count: {state.count}</h3>
                        <div className="mt-3">
                            <button className="btn btn-primary mx-2" onClick={() => dispatch({ type: 'increment' })}>Increment</button>
                            <button className="btn btn-danger mx-2" onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
                            <button className="btn btn-secondary mx-2" onClick={() => dispatch({ type: 'reset' })}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UseReducer
