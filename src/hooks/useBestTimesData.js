import { useEffect, useState } from 'react';
const DATA_URL = '/data/best-times.json';
export const useBestTimesData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let cancelled = false;
        const fetchData = async () => {
            try {
                const response = await fetch(DATA_URL, { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error(`Failed to load Best Times data (${response.status})`);
                }
                const payload = (await response.json());
                if (!cancelled) {
                    setData(payload);
                    setError(null);
                }
            }
            catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Unknown error');
                    setData(null);
                }
            }
            finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        fetchData();
        const refreshInterval = window.setInterval(fetchData, 1000 * 60 * 30);
        return () => {
            cancelled = true;
            window.clearInterval(refreshInterval);
        };
    }, []);
    return { data, loading, error };
};
