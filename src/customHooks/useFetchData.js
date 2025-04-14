import { useState, useEffect } from "react";

const useFetchData = (url, page, limit) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(`${url}?_page=${page}&_limit=${limit}`);
            const result = await response.json();
            setData(result);

            const totalResponse = await fetch(url);
            const totalData = await totalResponse.json();
            setTotalPages(Math.ceil(totalData.length / limit));
            setLoading(false);
        };
        fetchData();
    }, [url, page, limit]);

    return { data, loading, totalPages };
};

export default useFetchData;
