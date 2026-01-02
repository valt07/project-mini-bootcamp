import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ArticleList from './Pages/Articles/Index';
import ArticleCreate from './Pages/Articles/Create';
import ArticleEdit from './Pages/Articles/Edit';
import MainLayout from './Components/MainLayout';
import GuestLayout from './Components/GuestLayout';
import LandingPage from './Pages/Landing';

// Simple auth check helper
const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/login',
        element: <GuestLayout><Login /></GuestLayout>,
    },
    {
        element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'articles',
                element: <ArticleList />,
            },
            {
                path: 'articles/create',
                element: <ArticleCreate />,
            },
            {
                path: 'articles/:id/edit',
                element: <ArticleEdit />,
            },
            {
                path: 'users',
                element: <UserIndex />,
            },
        ],
    },
]);

export default router;
