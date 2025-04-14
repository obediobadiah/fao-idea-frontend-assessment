import { useState, useEffect } from "react";

const useFetchData = (url, page, limit) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Error state
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${url}?_page=${page}&_limit=${limit}`);
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`); // HTTP error handling
                }
                const result = await response.json();
                setData(result);

                const totalResponse = await fetch(url);
                if (!totalResponse.ok) {
                    throw new Error(`Error fetching total count: ${totalResponse.statusText}`);
                }
                const totalData = await totalResponse.json();
                setTotalPages(Math.ceil(totalData.length / limit)); // Calculate total pages
            } catch (error) {
                setError(error.message || "An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, page, limit]);

    return { data, loading, error, totalPages };
};

export default useFetchData;
