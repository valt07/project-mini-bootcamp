import React from 'react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-900 text-gray-100">
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-gray-800 shadow-xl overflow-hidden sm:rounded-lg border border-gray-700">
                {children}
            </div>
        </div>
    );
}
