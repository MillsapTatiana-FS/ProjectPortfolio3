import React from 'react';
import useAuth from './useAuth';

function Dashboard({code}) {
    const accessToken = useAuth(code)
    return (
        <div>
            <p>Let's Jam!</p>
        </div>
    );
}

export default Dashboard;
