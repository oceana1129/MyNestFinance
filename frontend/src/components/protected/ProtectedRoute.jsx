import React from 'react'
import { Navigate } from 'react-router'
import { UserAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = UserAuth()

    if (loading) {
        return <div>Loading...</div> // swap for a real spinner/skeleton
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute