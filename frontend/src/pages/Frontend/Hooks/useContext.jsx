import React from 'react'
import { useAuth } from '../../../context/Auth'

const UseContext = () => {
    const { user, dispatch } = useAuth()

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col text-center">
                    <h1>useContext Hook</h1>
                    <p className="lead">Access shared state across the component tree without prop drilling.</p>
                    <div className="card shadow-sm p-4 mt-4">
                        {user.isAuthenticated ? (
                            <div>
                                <h3 className="text-success">User is Logged In</h3>
                                <p>Email: {user.email}</p>
                                <button className="btn btn-warning" onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-danger">User is NOT Logged In</h3>
                                <p>Please login to see context in action.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UseContext
