import { useQuery } from '@tanstack/react-query';

// Fetch data for users or projects with pagination
const fetchData = async (url, page, limit) => {
    const response = await fetch(`${url}?_page=${page}&_limit=${limit}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
};

// Fetch total count of users or projects to calculate pagination
const fetchTotalCount = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.length;
};

// Custom hook to fetch data with pagination and calculate total pages
const useFetchData = (url, page, limit) => {
    // Fetch paginated data using react-query
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['data', url, page, limit],
        queryFn: () => fetchData(url, page, limit),
        keepPreviousData: true, // Keep previous data while fetching new data
    });

    // Fetch total count to calculate the total number of pages
    const { data: totalCount } = useQuery({
        queryKey: ['totalCount', url],
        queryFn: () => fetchTotalCount(url),
    });

    // Calculate total pages
    const totalPages = totalCount ? Math.ceil(totalCount / limit) : 0;

    return { data, isLoading, isError, error, totalPages };
};

export default useFetchData;
