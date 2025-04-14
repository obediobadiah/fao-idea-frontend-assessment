import React from "react";
import { useQuery } from "@tanstack/react-query";


const fetchUsers = async () => {
    const res = await fetch("https://dummyjson.com/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    const data = await res.json();
    return data.users;
};

const fetchProjects = async () => {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) throw new Error("Failed to fetch projects");
    const data = await res.json();
    return data.products;
};

const Dashboard = () => {
    const {
        data: users = [],
        isLoading: usersLoading,
        isError: usersError,
    } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    const {
        data: projects = [],
        isLoading: projectsLoading,
        isError: projectsError,
    } = useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
    });

    const loading = usersLoading || projectsLoading;

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Dashboard</h2>
            {loading && <p>Loading...</p>}
            {usersError && <p style={{ color: "red" }}>Failed to load users</p>}
            {projectsError && <p style={{ color: "red" }}>Failed to load projects</p>}

            {!loading && (
                <>
                    <h3>Users</h3>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        ))}
                    </ul>

                    <h3>Projects</h3>
                    <ul>
                        {projects.map((project) => (
                            <li key={project.id}>{project.title}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};
export default Dashboard;