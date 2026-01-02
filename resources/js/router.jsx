import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages (Sesuai Struktur Folder image_b4286a.png)
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ArticleIndex from './Pages/Articles/Index';
import ArticleCreate from './Pages/Articles/Create';
import ArticleEdit from './Pages/Articles/Edit';
import UserIndex from './Pages/Users/Index.jsx'; // FIX: gunakan ekstensi untuk menghindari konflik casing

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Artikel Routes */}
                <Route path="/articles" element={<ArticleIndex />} />
                <Route path="/articles/create" element={<ArticleCreate />} />
                <Route path="/articles/:id/edit" element={<ArticleEdit />} />

                {/* Users Routes */}
                <Route path="/users" element={<UserIndex />} />
            </Routes>
        </BrowserRouter>
    );
}