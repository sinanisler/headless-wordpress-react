function SearchResults({ navigate, params }) {
    const [results, setResults] = React.useState({ posts: [], codex: [] });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [query, setQuery] = React.useState('');
    const [totalResults, setTotalResults] = React.useState(0);

    React.useEffect(() => {
        const searchQuery = params.q;
        if (!searchQuery) {
            navigate('/');
            return;
        }

        setQuery(searchQuery);
        performSearch(searchQuery);
    }, [params.q, navigate]);

    const performSearch = async (searchQuery) => {
        try {
            setLoading(true);
            setError(null);
            
            const searchResults = await window.wpAPI.searchContent(searchQuery, ['posts', 'codex']);
            
            setResults({
                posts: searchResults.posts?.items || [],
                codex: searchResults.codex?.items || []
            });
            
            const total = (searchResults.posts?.total || 0) + (searchResults.codex?.total || 0);
            setTotalResults(total);
            
        } catch (err) {
            setError('Failed to search content. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleNewSearch = (newQuery) => {
        navigate('/search', { q: newQuery });
    };

    if (loading) return React.createElement(window.UIComponents.LoadingSpinner);
    if (error) return React.createElement(window.UIComponents.ErrorMessage, {
        message: error,
        onRetry: () => performSearch(query)
    });

    const hasResults = results.posts.length > 0 || results.codex.length > 0;

    return React.createElement('div', {
        className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
    }, [
        React.createElement('div', {
            key: 'search-header',
            className: 'mb-8'
        }, [
            React.createElement('div', {
                key: 'search-box',
                className: 'max-w-2xl mx-auto mb-6'
            }, React.createElement(window.UIComponents.SearchBox, {
                onSearch: handleNewSearch,
                placeholder: 'Search posts and codex...'
            })),
            
            React.createElement('div', {
                key: 'results-info',
                className: 'text-center'
            }, [
                React.createElement('h1', {
                    key: 'title',
                    className: 'text-2xl font-bold text-gray-900 mb-2'
                }, `Search Results for "${query}"`),
                React.createElement('p', {
                    key: 'count',
                    className: 'text-gray-600'
                }, `Found ${totalResults} result${totalResults !== 1 ? 's' : ''}`)
            ])
        ]),

        !hasResults ? React.createElement('div', {
            key: 'no-results',
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
                d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            }))),
            React.createElement('h3', {
                key: 'title',
                className: 'text-lg font-medium text-gray-900 mb-2'
            }, 'No results found'),
            React.createElement('p', {
                key: 'description',
                className: 'text-gray-500 mb-4'
            }, 'Try adjusting your search terms or browse our latest content.'),
            React.createElement('div', {
                key: 'actions',
                className: 'space-x-4'
            }, [
                React.createElement('button', {
                    key: 'blog',
                    onClick: () => navigate('/'),
                    className: 'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                }, 'Browse Blog'),
                React.createElement('button', {
                    key: 'codex',
                    onClick: () => navigate('/codex'),
                    className: 'bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors'
                }, 'Browse Codex')
            ])
        ]) : React.createElement('div', {
            key: 'results',
            className: 'space-y-12'
        }, [
            results.posts.length > 0 && React.createElement('section', {
                key: 'posts-section',
                className: 'space-y-6'
            }, [
                React.createElement('h2', {
                    key: 'posts-title',
                    className: 'text-xl font-semibold text-gray-900 flex items-center'
                }, [
                    'Blog Posts ',
                    React.createElement('span', {
                        key: 'count',
                        className: 'ml-2 px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full'
                    }, results.posts.length)
                ]),
                React.createElement('div', {
                    key: 'posts-grid',
                    className: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
                }, results.posts.map(post =>
                    React.createElement(window.PostCard, {
                        key: post.id,
                        post: post,
                        navigate: navigate,
                        type: 'post'
                    })
                ))
            ]),

            results.codex.length > 0 && React.createElement('section', {
                key: 'codex-section',
                className: 'space-y-6'
            }, [
                React.createElement('h2', {
                    key: 'codex-title',
                    className: 'text-xl font-semibold text-gray-900 flex items-center'
                }, [
                    'Codex Entries ',
                    React.createElement('span', {
                        key: 'count',
                        className: 'ml-2 px-2 py-1 text-sm bg-purple-100 text-purple-800 rounded-full'
                    }, results.codex.length)
                ]),
                React.createElement('div', {
                    key: 'codex-grid',
                    className: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                }, results.codex.map(item =>
                    React.createElement(window.PostCard, {
                        key: item.id,
                        post: item,
                        navigate: navigate,
                        type: 'codex'
                    })
                ))
            ])
        ])
    ]);
}

window.SearchResults = SearchResults;