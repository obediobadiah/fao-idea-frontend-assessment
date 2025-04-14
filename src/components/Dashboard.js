import React, { useState, useCallback, useMemo } from 'react';
import useFetchData from '../customHooks/useFetchData';
import '../styles/Dashboard.css';

const Dashboard = () => {
    // State variables to track the current page for users and projects
    const [userPage, setUserPage] = useState(1);
    const [projectPage, setProjectPage] = useState(1);
    const limit = 10; // Number of items per page

    // Fetch users and projects data using the custom hook
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

    // Handlers for changing pages for users and projects
    const handleUserPageChange = useCallback((page) => setUserPage(page), []);
    const handleProjectPageChange = useCallback((page) => setProjectPage(page), []);

    // Function to get a user-friendly error message based on the error status
    const getErrorMessage = (error) => {
        if (!error) return null;

        if (error.message.includes('HTTP error')) {
            return `Failed to fetch data. Please check your network connection.`;
        } else if (error.message.includes('404')) {
            return `Data not found. Please check the URL or try again later.`;
        } else if (error.message.includes('500')) {
            return `Server error. Please try again later.`;
        }
        return `An unexpected error occurred: ${error.message}`;
    };

    // Memoized list of users to avoid unnecessary re-renders
    const userList = useMemo(() => {
        return users ? users.map((user) => <li key={user.id}>{user.name}</li>) : null;
    }, [users]);

    // Memoized list of projects to avoid unnecessary re-renders
    const projectList = useMemo(() => {
        return projects ? projects.map((project) => <li key={project.id}>{project.title}</li>) : null;
    }, [projects]);

    // Memoized pagination buttons for users, depending on the total number of pages and current page
    const userPaginationButtons = useMemo(() => {
        return [...Array(userTotalPages || 0)].map((_, index) => (
            <button key={index + 1} onClick={() => handleUserPageChange(index + 1)} disabled={userPage === index + 1}>
                {index + 1}
            </button>
        ));
    }, [userTotalPages, userPage, handleUserPageChange]);

    // Memoized pagination buttons for projects, depending on the total number of pages and current page
    const projectPaginationButtons = useMemo(() => {
        return [...Array(projectTotalPages || 0)].map((_, index) => (
            <button key={index + 1} onClick={() => handleProjectPageChange(index + 1)} disabled={projectPage === index + 1}>
                {index + 1}
            </button>
        ));
    }, [projectTotalPages, projectPage, handleProjectPageChange]);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            {usersLoading && <p className="loading" />}
            {usersError && <p className="error">{getErrorMessage(usersError)}</p>}

            <div className="card">
                <h3>Users</h3>
                {users && <ul className="user-list">{userList}</ul>}
                <div className="pagination">{userPaginationButtons}</div>
            </div>

            {projectsLoading && <p className="loading" />}
            {projectsError && <p className="error">{getErrorMessage(projectsError)}</p>}

            <div className="card">
                <h3>Projects</h3>
                {projects && <ul className="project-list">{projectList}</ul>}
                <div className="pagination">{projectPaginationButtons}</div>
            </div>
        </div>
    );
};

export default Dashboard;
