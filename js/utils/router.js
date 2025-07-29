function useRouter() {
    const [currentPath, setCurrentPath] = React.useState(window.location.pathname);
    const [params, setParams] = React.useState({});

    React.useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
            parseParams();
        };

        const parseParams = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const newParams = {};
            urlParams.forEach((value, key) => {
                newParams[key] = value;
            });
            setParams(newParams);
        };

        parseParams();
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigate = React.useCallback((path, newParams = {}) => {
        const url = new URL(window.location.origin + path);
        Object.entries(newParams).forEach(([key, value]) => {
            if (value) url.searchParams.set(key, value);
        });
        
        window.history.pushState({}, '', url.toString());
        setCurrentPath(path);
        setParams(newParams);
    }, []);

    return { currentPath, params, navigate };
}

window.useRouter = useRouter;