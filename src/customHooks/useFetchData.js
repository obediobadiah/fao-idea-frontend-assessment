import { useQuery } from '@tanstack/react-query';

const fetchData = async (url, page, limit) => {
    const response = await fetch(`${url}?_page=${page}&_limit=${limit}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const fetchTotalCount = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.length;
};

const useFetchData = (url, page, limit) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['data', url, page, limit],
        queryFn: () => fetchData(url, page, limit),
        keepPreviousData: true,
    });

    const { data: totalCount } = useQuery({
        queryKey: ['totalCount', url],
        queryFn: () => fetchTotalCount(url),
    });

    const totalPages = totalCount ? Math.ceil(totalCount / limit) : 0;

    return { data, isLoading, isError, error, totalPages };
};

export default useFetchData;