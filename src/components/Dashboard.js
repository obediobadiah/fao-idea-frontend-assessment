import React, { useState } from "react";
import useFetchData from "../customHooks/useFetchData";

const Dashboard = () => {
    const [userPage, setUserPage] = useState(1);
    const [projectPage, setProjectPage] = useState(1);

    const { data: users, loading: usersLoading, error: usersError, totalPages: userTotalPages } = useFetchData(
        "https://jsonplaceholder.typicode.com/users",
        userPage,
        10
    );
    const { data: projects, loading: projectsLoading, error: projectsError, totalPages: projectTotalPages } = useFetchData(
        "https://jsonplaceholder.typicode.com/posts",
        projectPage,
        10
    );

    const handleUserPageChange = (page) => setUserPage(page);
    const handleProjectPageChange = (page) => setProjectPage(page);

    return (
        <div>
            <h2>Dashboard</h2>

            {/* Error handling for users */}
            {usersError && <p style={{ color: "red" }}>Error: {usersError}</p>}
            {(usersLoading || projectsLoading) && <p>Loading...</p>}

            <h3>Users</h3>
            {usersError ? (
                <p style={{ color: "red" }}>Error fetching users: {usersError}</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
            <div>
                {[...Array(userTotalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handleUserPageChange(index + 1)}
                        disabled={userPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <h3>Projects</h3>
            {projectsError ? (
                <p style={{ color: "red" }}>Error fetching projects: {projectsError}</p>
            ) : (
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}>{project.title}</li>
                    ))}
                </ul>
            )}
            <div>
                {[...Array(projectTotalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handleProjectPageChange(index + 1)}
                        disabled={projectPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
