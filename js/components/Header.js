function Header({ navigate, currentPath }) {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    
    const handleSearch = (query) => {
        navigate('/search', { q: query });
        setIsSearchOpen(false);
    };

    return React.createElement('header', {
        className: 'bg-white shadow-sm border-b'
    }, React.createElement('div', {
        className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
    }, React.createElement('div', {
        className: 'flex justify-between items-center py-6'
    }, [
        React.createElement('div', {
            key: 'logo',
            className: 'flex items-center'
        }, React.createElement('h1', {
            className: 'text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors',
            onClick: () => navigate('/')
        }, 'Sinan İşler')),
        
        React.createElement('nav', {
            key: 'nav',
            className: 'flex items-center space-x-8'
        }, [
            React.createElement('button', {
                key: 'blog',
                onClick: () => navigate('/'),
                className: `${currentPath === '/' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'} pb-2 transition-colors`
            }, 'Blog'),
            
            React.createElement('button', {
                key: 'codex',
                onClick: () => navigate('/codex'),
                className: `${currentPath === '/codex' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'} pb-2 transition-colors`
            }, 'Codex'),
            
            React.createElement('button', {
                key: 'about',
                onClick: () => navigate('/about'),
                className: `${currentPath === '/about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'} pb-2 transition-colors`
            }, 'About'),
            
            React.createElement('button', {
                key: 'search-toggle',
                onClick: () => setIsSearchOpen(!isSearchOpen),
                className: 'text-gray-500 hover:text-gray-700 transition-colors'
            }, React.createElement('svg', {
                className: 'w-5 h-5',
                fill: 'none',
                stroke: 'currentColor',
                viewBox: '0 0 24 24'
            }, React.createElement('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            })))
        ]),
        
        isSearchOpen && React.createElement('div', {
            key: 'search',
            className: 'absolute top-full left-0 right-0 bg-white border-b shadow-lg p-4 z-50'
        }, React.createElement('div', {
            className: 'max-w-7xl mx-auto'
        }, React.createElement(window.UIComponents.SearchBox, {
            onSearch: handleSearch,
            placeholder: 'Search posts and codex...'
        })))
    ])));
}

window.Header = Header;