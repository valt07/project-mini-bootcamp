import React from 'react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-900">
            <div>
                <a href="/">
                    <h1 className="text-4xl font-bold text-indigo-500">CMS News</h1>
                </a>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-gray-800 shadow-md overflow-hidden sm:rounded-lg border border-gray-700">
                {children}
            </div>
            
            <p className="mt-4 text-gray-500 text-sm">
                &copy; 2026 Bootcamper Project
            </p>
        </div>
    );
}