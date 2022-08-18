import React from 'react';
import useAuth from './useAuth';

function Dashboard({code}) {
    const accessToken = useAuth(code)
    return (
        <div>
            <p>Access Granted</p>
        </div>
    );
}

export default Dashboard;
