import React, { useEffect, useState, useCallback } from "react";

const Dashboard = () => {
    // State for users, projects, loading, and pagination
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userPage, setUserPage] = useState(1);  // Pagination for users
    const [projectPage, setProjectPage] = useState(1); // Pagination for projects
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProjects, setTotalProjects] = useState(0);
    const usersPerPage = 10;

    // Fetch users and projects based on the current page
    const fetchData = useCallback(async () => {
        setLoading(true);

        // Fetch users for the current user page (10 users per page)
        const usersResponse = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${userPage}&_limit=${usersPerPage}`);
        const usersData = await usersResponse.json();
        console.log("Users Data for Page", userPage, ":", usersData);
        setUsers(usersData);

        const totalUsersResponse = await fetch("https://jsonplaceholder.typicode.com/users");
        const totalUsersData = await totalUsersResponse.json();
        setTotalUsers(totalUsersData.length);

        // Fetch projects for the current project page (10 projects per page)
        const projectsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${projectPage}&_limit=10`);
        const projectsData = await projectsResponse.json();
        console.log("Projects Data for Page", projectPage, ":", projectsData); // Log projects data
        setProjects(projectsData);

        // Fetch total number of pages for projects
        const totalProjectsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
        const totalProjectsData = await totalProjectsResponse.json();
        setTotalProjects(totalProjectsData.length);

        setLoading(false);
    }, [userPage, projectPage]);

    // Call fetchData whenever the page changes (for either users or projects)
    useEffect(() => {
        fetchData();
    }, [userPage, projectPage, fetchData]);

    // Handle user page change
    const handleUserPageChange = (page) => {
        setUserPage(page);
    };

    // Handle project page change
    const handleProjectPageChange = (page) => {
        setProjectPage(page);
    };

    const totalUserPages = Math.ceil(totalUsers / usersPerPage);
    const totalProjectPages = Math.ceil(totalProjects / 10);

    return (
        <div>
            <h2>Dashboard</h2>
            {loading && <p>Loading...</p>}

            <h3>Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>

            {/* Pagination for Users */}
            <div>
                <span>Pages: </span>
                {[...Array(totalUserPages)].map((_, index) => (
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

            {/* Pagination for Projects */}
            <div>
                <span>Pages: </span>
                {[...Array(totalProjectPages)].map((_, index) => (
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
