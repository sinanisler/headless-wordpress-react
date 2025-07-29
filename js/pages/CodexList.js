function CodexList({ navigate, params }) {
    const [codex, setCodex] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [totalPages, setTotalPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);

    const fetchCodex = React.useCallback(async (page = 1) => {
        try {
            setLoading(true);
            setError(null);
            const result = await window.wpAPI.fetchCodex({ page, perPage: 12 });
            setCodex(result.codex);
            setTotalPages(result.totalPages);
            setCurrentPage(page);
        } catch (err) {
            setError('Failed to load codex entries. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        const page = parseInt(params.page) || 1;
        fetchCodex(page);
    }, [fetchCodex, params.page]);

    const handlePageChange = (page) => {
        navigate('/codex', { page: page > 1 ? page : undefined });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return React.createElement(window.UIComponents.LoadingSpinner);
    if (error) return React.createElement(window.UIComponents.ErrorMessage, {
        message: error,
        onRetry: () => fetchCodex(currentPage)
    });

    return React.createElement('div', {
        className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
    }, [
        React.createElement('div', {
            key: 'header',
            className: 'mb-8'
        }, [
            React.createElement('h1', {
                key: 'title',
                className: 'text-3xl font-bold text-gray-900 mb-2'
            }, 'Codex'),
            React.createElement('p', {
                key: 'description',
                className: 'text-gray-600'
            }, 'Code snippets, documentation, and technical references for developers.')
        ]),
        
        codex.length === 0 ? React.createElement('div', {
            key: 'empty',
            className: 'text-center py-12'
        }, [
            React.createElement('div', {
                key: 'icon',
                className: 'mx-auto h-12 w-12 text-gray-400 mb-4'
            }, React.createElement('svg', {
                fill: 'none',
                stroke: 'currentColor',
                viewBox: '0 0 24 24'
            }, React.createElement('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
            }))),
            React.createElement('h3', {
                key: 'title',
                className: 'text-lg font-medium text-gray-900 mb-2'
            }, 'No codex entries found'),
            React.createElement('p', {
                key: 'description',
                className: 'text-gray-500'
            }, 'Check back later for new code snippets and documentation.')
        ]) : React.createElement('div', {
            key: 'grid',
            className: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }, codex.map(item => 
            React.createElement(window.PostCard, {
                key: item.id,
                post: item,
                navigate: navigate,
                type: 'codex'
            })
        )),

        React.createElement(window.UIComponents.Pagination, {
            key: 'pagination',
            currentPage: currentPage,
            totalPages: totalPages,
            onPageChange: handlePageChange
        })
    ]);
}

window.CodexList = CodexList;