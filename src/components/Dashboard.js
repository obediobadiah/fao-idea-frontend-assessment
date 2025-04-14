import React, { useState, useCallback } from 'react';
import useFetchData from '../customHooks/useFetchData';

const Dashboard = () => {
    const [userPage, setUserPage] = useState(1);
    const [projectPage, setProjectPage] = useState(1);
    const limit = 10;

    const { data: users, totalPages: userTotalPages, isLoading: usersLoading, error: usersError } = useFetchData(
        'https://jsonplaceholder.typicode.com/users',
        userPage,
        limit
    );

    const { data: projects, totalPages: projectTotalPages, isLoading: projectsLoading, error: projectsError } = useFetchData(
        'https://jsonplaceholder.typicode.com/posts',
        projectPage,
        limit
    );

    const handleUserPageChange = useCallback((page) => setUserPage(page), []);
    const handleProjectPageChange = useCallback((page) => setProjectPage(page), []);

    const isLoading = usersLoading || projectsLoading;

    return (
        <div>
            <h2>Dashboard</h2>
            {isLoading && <p>Loading...</p>}
            {usersError && <p style={{ color: 'red' }}>Error: {usersError.message}</p>}
            {projectsError && <p style={{ color: 'red' }}>Error: {projectsError.message}</p>}
            <h3>Users</h3>
            {users && (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
            <div>
                {[...Array(userTotalPages || 0)].map((_, index) => (
                    <button key={index + 1} onClick={() => handleUserPageChange(index + 1)} disabled={userPage === index + 1}>
                        {index + 1}
                    </button>
                ))}
            </div>
            <h3>Projects</h3>
            {projects && (
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}>{project.title}</li>
                    ))}
                </ul>
            )}
            <div>
                {[...Array(projectTotalPages || 0)].map((_, index) => (
                    <button key={index + 1} onClick={() => handleProjectPageChange(index + 1)} disabled={projectPage === index + 1}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;