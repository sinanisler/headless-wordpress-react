function AboutPage() {
    return React.createElement('div', {
        className: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
    }, React.createElement('div', {
        className: 'bg-white rounded-lg shadow-sm border p-8 fade-in'
    }, [
        React.createElement('h1', {
            key: 'title',
            className: 'text-4xl font-bold text-gray-900 mb-6'
        }, 'About'),
        
        React.createElement('div', {
            key: 'content',
            className: 'prose prose-lg max-w-none text-gray-700 space-y-6'
        }, [
            React.createElement('p', {
                key: 'intro',
                className: 'text-xl text-gray-600 leading-8'
            }, 'Welcome to my headless WordPress frontend, a modern web application built with React and powered by the WordPress REST API.'),
            
            React.createElement('h2', {
                key: 'features-title',
                className: 'text-2xl font-semibold text-gray-900 mt-8 mb-4'
            }, 'Features'),
            
            React.createElement('ul', {
                key: 'features-list',
                className: 'space-y-3'
            }, [
                React.createElement('li', {
                    key: 'feature-1',
                    className: 'flex items-start'
                }, [
                    React.createElement('span', {
                        key: 'icon',
                        className: 'text-blue-600 mr-2 mt-1'
                    }, '✓'),
                    React.createElement('span', {
                        key: 'text'
                    }, 'Modular React architecture with reusable components')
                ]),
                React.createElement('li', {
                    key: 'feature-2',
                    className: 'flex items-start'
                }, [
                    React.createElement('span', {
                        key: 'icon',
                        className: 'text-blue-600 mr-2 mt-1'
                    }, '✓'),
                    React.createElement('span', {
                        key: 'text'
                    }, 'WordPress REST API integration for dynamic content')
                ]),
                React.createElement('li', {
                    key: 'feature-3',
                    className: 'flex items-start'
                }, [
                    React.createElement('span', {
                        key: 'icon',
                        className: 'text-blue-600 mr-2 mt-1'
                    }, '✓'),
                    React.createElement('span', {
                        key: 'text'
                    }, 'Support for multiple post types (Blog posts and Codex)')
                ]),
                React.createElement('li', {
                    key: 'feature-4',
                    className: 'flex items-start'
                }, [
                    React.createElement('span', {
                        key: 'icon',
                        className: 'text-blue-600 mr-2 mt-1'
                    }, '✓'),
                    React.createElement('span', {
                        key: 'text'
                    }, 'Real-time search functionality across all content')
                ]),
                React.createElement('li', {
                    key: 'feature-5',
                    className: 'flex items-start'
                }, [
                    React.createElement('span', {
                        key: 'icon',
                        className: 'text-blue-600 mr-2 mt-1'
                    }, '✓'),
                    React.createElement('span', {
                        key: 'text'
                    }, 'Responsive design with Tailwind CSS')
                ]),
                React.createElement('li', {
                    key: 'feature-6',
                    className: 'flex items-start'
                }, [
                    React.createElement('span', {
                        key: 'icon',
                        className: 'text-blue-600 mr-2 mt-1'
                    }, '✓'),
                    React.createElement('span', {
                        key: 'text'
                    }, 'Client-side routing for fast navigation')
                ]),
                React.createElement('li', {
                    key: 'feature-7',
                    className: 'flex items-start'
                }, [
                    React.createElement('span', {
                        key: 'icon',
                        className: 'text-blue-600 mr-2 mt-1'
                    }, '✓'),
                    React.createElement('span', {
                        key: 'text'
                    }, 'No build process - runs directly in the browser')
                ])
            ]),
            
            React.createElement('h2', {
                key: 'tech-title',
                className: 'text-2xl font-semibold text-gray-900 mt-8 mb-4'
            }, 'Technology Stack'),
            
            React.createElement('div', {
                key: 'tech-grid',
                className: 'grid grid-cols-2 md:grid-cols-4 gap-4 mt-6'
            }, [
                React.createElement('div', {
                    key: 'react',
                    className: 'bg-blue-50 border border-blue-200 rounded-lg p-4 text-center'
                }, [
                    React.createElement('div', {
                        key: 'name',
                        className: 'font-semibold text-blue-900'
                    }, 'React 18'),
                    React.createElement('div', {
                        key: 'desc',
                        className: 'text-sm text-blue-600 mt-1'
                    }, 'Frontend Library')
                ]),
                React.createElement('div', {
                    key: 'wp',
                    className: 'bg-gray-50 border border-gray-200 rounded-lg p-4 text-center'
                }, [
                    React.createElement('div', {
                        key: 'name',
                        className: 'font-semibold text-gray-900'
                    }, 'WordPress'),
                    React.createElement('div', {
                        key: 'desc',
                        className: 'text-sm text-gray-600 mt-1'
                    }, 'Headless CMS')
                ]),
                React.createElement('div', {
                    key: 'tailwind',
                    className: 'bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center'
                }, [
                    React.createElement('div', {
                        key: 'name',
                        className: 'font-semibold text-cyan-900'
                    }, 'Tailwind CSS'),
                    React.createElement('div', {
                        key: 'desc',
                        className: 'text-sm text-cyan-600 mt-1'
                    }, 'Styling')
                ]),
                React.createElement('div', {
                    key: 'axios',
                    className: 'bg-purple-50 border border-purple-200 rounded-lg p-4 text-center'
                }, [
                    React.createElement('div', {
                        key: 'name',
                        className: 'font-semibold text-purple-900'
                    }, 'Axios'),
                    React.createElement('div', {
                        key: 'desc',
                        className: 'text-sm text-purple-600 mt-1'
                    }, 'HTTP Client')
                ])
            ]),
            
            React.createElement('h2', {
                key: 'extensibility-title',
                className: 'text-2xl font-semibold text-gray-900 mt-8 mb-4'
            }, 'Extensibility'),
            
            React.createElement('p', {
                key: 'extensibility-text'
            }, 'This application is designed with modularity in mind. Each component is self-contained and can be easily extended or modified. Adding new post types or pages is straightforward thanks to the modular architecture and the flexible WordPress API integration.')
        ])
    ]));
}

window.AboutPage = AboutPage;