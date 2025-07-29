function SinglePost({ slug, navigate, type = 'post' }) {
    const [post, setPost] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError(null);
                
                let postData;
                if (type === 'codex') {
                    postData = await window.wpAPI.fetchCodexBySlug(slug);
                } else {
                    postData = await window.wpAPI.fetchPostBySlug(slug);
                }
                
                if (!postData) {
                    setError(`${type === 'codex' ? 'Codex entry' : 'Post'} not found`);
                    return;
                }
                
                setPost(postData);
            } catch (err) {
                setError(`Failed to load ${type === 'codex' ? 'codex entry' : 'post'}. Please try again.`);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, type]);

    if (loading) return React.createElement(window.UIComponents.LoadingSpinner);
    if (error) return React.createElement(window.UIComponents.ErrorMessage, { message: error });
    if (!post) return React.createElement(window.UIComponents.ErrorMessage, { 
        message: `${type === 'codex' ? 'Codex entry' : 'Post'} not found` 
    });

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
    const author = post._embedded?.author?.[0];
    const categories = post._embedded?.['wp:term']?.[0] || [];

    const getBackUrl = () => {
        return type === 'codex' ? '/codex' : '/';
    };

    const getBackLabel = () => {
        return type === 'codex' ? 'Back to Codex' : 'Back to Posts';
    };

    const getTypeLabel = () => {
        return type === 'codex' ? 'Codex' : 'Blog Post';
    };

    const getTypeColor = () => {
        return type === 'codex' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
    };

    return React.createElement('div', {
        className: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
    }, [
        React.createElement('button', {
            key: 'back',
            onClick: () => navigate(getBackUrl()),
            className: 'mb-6 text-blue-600 hover:text-blue-800 transition-colors flex items-center'
        }, `← ${getBackLabel()}`),

        React.createElement('article', {
            key: 'article',
            className: 'bg-white rounded-lg shadow-sm border p-8 fade-in'
        }, [
            React.createElement('header', {
                key: 'header',
                className: 'mb-8'
            }, [
                React.createElement('div', {
                    key: 'meta',
                    className: 'flex items-center justify-between mb-4'
                }, [
                    React.createElement('div', {
                        key: 'date-cats',
                        className: 'flex items-center'
                    }, [
                        React.createElement('time', {
                            key: 'date',
                            className: 'text-sm text-gray-500'
                        }, window.helpers.formatDate(post.date)),
                        
                        categories.length > 0 && React.createElement('span', {
                            key: 'separator',
                            className: 'mx-2 text-gray-300'
                        }, '•'),
                        
                        categories.slice(0, 3).map((category, index) =>
                            React.createElement('span', {
                                key: category.id,
                                className: 'text-sm text-blue-600'
                            }, [
                                category.name,
                                index < Math.min(categories.length, 3) - 1 && ', '
                            ])
                        )
                    ]),
                    
                    React.createElement('span', {
                        key: 'type',
                        className: `px-3 py-1 text-sm font-medium rounded-full ${getTypeColor()}`
                    }, getTypeLabel())
                ]),

                React.createElement('h1', {
                    key: 'title',
                    className: 'text-4xl font-bold text-gray-900 mb-4',
                    dangerouslySetInnerHTML: { __html: post.title.rendered }
                }),

                React.createElement('div', {
                    key: 'author-info',
                    className: 'flex items-center justify-between text-gray-600'
                }, [
                    author && React.createElement('div', {
                        key: 'author',
                        className: 'flex items-center'
                    }, React.createElement('span', {
                        className: 'font-medium'
                    }, `By ${author.name}`)),
                    
                    React.createElement('div', {
                        key: 'reading-time',
                        className: 'text-sm'
                    }, `${window.helpers.getReadingTime(post.content.rendered)} min read`)
                ])
            ]),

            featuredImage && React.createElement('div', {
                key: 'featured-image',
                className: 'mb-8'
            }, React.createElement('img', {
                src: featuredImage.source_url,
                alt: featuredImage.alt_text || post.title.rendered,
                className: 'w-full h-auto rounded-lg'
            })),

            React.createElement('div', {
                key: 'content',
                className: `post-content prose prose-lg max-w-none text-gray-700 ${
                    type === 'codex' ? 'codex-content' : ''
                }`,
                dangerouslySetInnerHTML: { __html: post.content.rendered }
            })
        ])
    ]);
}

window.SinglePost = SinglePost;