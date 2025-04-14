import React, { useEffect, useState } from "react";
const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch("https://api.example.com/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            });
        fetch("https://api.example.com/projects")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            <h2>Dashboard</h2>
            {loading && <p>Loading...</p>}
            <h3>Users</h3>
            <ul>{users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>
            <h3>Projects</h3>
            <ul>{projects.map((project) =>
                <li key={project.id}>{project.name}</li>)}</ul>
        </div>
    );
};
export default Dashboard;