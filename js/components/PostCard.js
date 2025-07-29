function PostCard({ post, navigate, type = 'post' }) {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
    const author = post._embedded?.author?.[0];
    const categories = post._embedded?.['wp:term']?.[0] || [];
    
    const getPostUrl = () => {
        switch (type) {
            case 'codex':
                return `/codex/${post.slug}`;
            default:
                return `/post/${post.slug}`;
        }
    };

    const getTypeLabel = () => {
        switch (type) {
            case 'codex':
                return 'Codex';
            default:
                return 'Post';
        }
    };

    const getTypeColor = () => {
        switch (type) {
            case 'codex':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    return React.createElement('article', {
        className: 'bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300 fade-in'
    }, [
        featuredImage && React.createElement('div', {
            key: 'image',
            className: 'aspect-w-16 aspect-h-9'
        }, React.createElement('img', {
            src: featuredImage.source_url,
            alt: featuredImage.alt_text || post.title.rendered,
            className: 'w-full h-48 object-cover rounded-t-lg'
        })),
        
        React.createElement('div', {
            key: 'content',
            className: 'p-6'
        }, [
            React.createElement('div', {
                key: 'meta',
                className: 'flex items-center justify-between mb-3'
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
                    
                    categories.slice(0, 2).map((category, index) => 
                        React.createElement('span', {
                            key: category.id,
                            className: 'text-sm text-blue-600 hover:text-blue-800'
                        }, [
                            category.name,
                            index < Math.min(categories.length, 2) - 1 && ', '
                        ])
                    )
                ]),
                
                React.createElement('span', {
                    key: 'type',
                    className: `px-2 py-1 text-xs font-medium rounded-full ${getTypeColor()}`
                }, getTypeLabel())
            ]),
            
            React.createElement('h2', {
                key: 'title',
                className: 'text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors'
            }, React.createElement('button', {
                onClick: () => navigate(getPostUrl()),
                className: 'text-left w-full',
                dangerouslySetInnerHTML: { __html: post.title.rendered }
            })),
            
            React.createElement('div', {
                key: 'excerpt',
                className: 'text-gray-600 mb-4 line-clamp-3'
            }, window.helpers.truncateText(window.helpers.stripHtml(post.excerpt.rendered), 150)),
            
            React.createElement('div', {
                key: 'footer',
                className: 'flex items-center justify-between'
            }, [
                React.createElement('div', {
                    key: 'author',
                    className: 'flex items-center'
                }, [
                    author && React.createElement('span', {
                        key: 'author-name',
                        className: 'text-sm text-gray-500'
                    }, `By ${author.name}`),
                    
                    React.createElement('span', {
                        key: 'reading-time',
                        className: 'text-sm text-gray-500 ml-2'
                    }, `${window.helpers.getReadingTime(post.content.rendered)} min read`)
                ]),
                
                React.createElement('button', {
                    key: 'read-more',
                    onClick: () => navigate(getPostUrl()),
                    className: 'text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors'
                }, 'Read More →')
            ])
        ])
    ]);
}

window.PostCard = PostCard;