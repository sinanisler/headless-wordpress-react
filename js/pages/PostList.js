function PostList({ navigate, params }) {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [totalPages, setTotalPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);

    const fetchPosts = React.useCallback(async (page = 1) => {
        try {
            setLoading(true);
            setError(null);
            const result = await window.wpAPI.fetchPosts({ page, perPage: 9 });
            setPosts(result.posts);
            setTotalPages(result.totalPages);
            setCurrentPage(page);
        } catch (err) {
            setError('Failed to load posts. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        const page = parseInt(params.page) || 1;
        fetchPosts(page);
    }, [fetchPosts, params.page]);

    const handlePageChange = (page) => {
        navigate('/', { page: page > 1 ? page : undefined });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return React.createElement(window.UIComponents.LoadingSpinner);
    if (error) return React.createElement(window.UIComponents.ErrorMessage, {
        message: error,
        onRetry: () => fetchPosts(currentPage)
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
            }, 'Latest Blog Posts'),
            React.createElement('p', {
                key: 'description',
                className: 'text-gray-600'
            }, 'Insights, tutorials, and thoughts on web development and technology.')
        ]),
        
        React.createElement('div', {
            key: 'grid',
            className: 'grid gap-8 md:grid-cols-2 lg:grid-cols-3'
        }, posts.map(post => 
            React.createElement(window.PostCard, {
                key: post.id,
                post: post,
                navigate: navigate,
                type: 'post'
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

window.PostList = PostList;