import React, { useState } from "react";
import useFetchData from "../customHooks/useFetchData"; // Import the custom hook

const Dashboard = () => {
    const [userPage, setUserPage] = useState(1);
    const [projectPage, setProjectPage] = useState(1);

    const { data: users, loading: usersLoading, totalPages: userTotalPages } = useFetchData(
        "https://jsonplaceholder.typicode.com/users",
        userPage,
        10
    );
    const { data: projects, loading: projectsLoading, totalPages: projectTotalPages } = useFetchData(
        "https://jsonplaceholder.typicode.com/posts",
        projectPage,
        10
    );

    const handleUserPageChange = (page) => setUserPage(page);
    const handleProjectPageChange = (page) => setProjectPage(page);

    return (
        <div>
            <h2>Dashboard</h2>
            {(usersLoading || projectsLoading) && <p>Loading...</p>}

            <h3>Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
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
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>{project.title}</li>
                ))}
            </ul>
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
