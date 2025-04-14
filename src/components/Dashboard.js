import React, { useState, useCallback } from 'react';
import useFetchData from '../customHooks/useFetchData';
import './Dashboard.css';

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

    const getErrorMessage = (error) => {
        if (!error) return null; // No error

        if (error.message.includes('HTTP error')) {
            return `Failed to fetch data. Please check your network connection.`;
        }
        return `An unexpected error occurred: ${error.message}`;
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            {usersLoading && <p className="loading" />}
            {usersError && <p className="error">{getErrorMessage(usersError)}</p>}

            <div className="card">
                <h3>Users</h3>
                {users && (
                    <ul className="user-list">
                        {users.map((user) => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                )}
                <div className="pagination">
                    {[...Array(userTotalPages || 0)].map((_, index) => (
                        <button key={index + 1} onClick={() => handleUserPageChange(index + 1)} disabled={userPage === index + 1}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {projectsLoading && <p className="loading" />}
            {projectsError && <p className="error">{getErrorMessage(projectsError)}</p>}

            <div className="card">
                <h3>Projects</h3>
                {projects && (
                    <ul className="project-list">
                        {projects.map((project) => (
                            <li key={project.id}>{project.title}</li>
                        ))}
                    </ul>
                )}
                <div className="pagination">
                    {[...Array(projectTotalPages || 0)].map((_, index) => (
                        <button key={index + 1} onClick={() => handleProjectPageChange(index + 1)} disabled={projectPage === index + 1}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;