function LoadingSpinner() {
    return React.createElement('div', {
        className: 'flex justify-center items-center py-8'
    }, React.createElement('div', {
        className: 'loading-spinner'
    }));
}

function ErrorMessage({ message, onRetry }) {
    return React.createElement('div', {
        className: 'bg-red-50 border border-red-200 rounded-lg p-4 my-4'
    }, React.createElement('div', {
        className: 'flex'
    }, [
        React.createElement('div', {
            key: 'icon',
            className: 'text-red-600'
        }, React.createElement('svg', {
            className: 'w-5 h-5',
            fill: 'currentColor',
            viewBox: '0 0 20 20'
        }, React.createElement('path', {
            fillRule: 'evenodd',
            d: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z',
            clipRule: 'evenodd'
        }))),
        React.createElement('div', {
            key: 'content',
            className: 'ml-3'
        }, [
            React.createElement('h3', {
                key: 'title',
                className: 'text-sm font-medium text-red-800'
            }, 'Error'),
            React.createElement('div', {
                key: 'message',
                className: 'text-sm text-red-700 mt-1'
            }, message),
            onRetry && React.createElement('button', {
                key: 'retry',
                onClick: onRetry,
                className: 'mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded'
            }, 'Retry')
        ])
    ]));
}

function SearchBox({ onSearch, placeholder = "Search..." }) {
    const [query, setQuery] = React.useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return React.createElement('form', {
        onSubmit: handleSubmit,
        className: 'relative'
    }, [
        React.createElement('input', {
            key: 'input',
            type: 'text',
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: placeholder,
            className: 'w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
        }),
        React.createElement('div', {
            key: 'icon',
            className: 'absolute inset-y-0 left-0 flex items-center pl-3'
        }, React.createElement('svg', {
            className: 'w-5 h-5 text-gray-400',
            fill: 'none',
            stroke: 'currentColor',
            viewBox: '0 0 24 24'
        }, React.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
            d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        })))
    ]);
}

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return React.createElement('div', {
        className: 'flex justify-center items-center space-x-2 mt-12'
    }, [
        React.createElement('button', {
            key: 'prev',
            onClick: () => onPageChange(currentPage - 1),
            disabled: currentPage <= 1,
            className: 'px-3 py-2 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
        }, 'Previous'),
        ...pages.map(page => React.createElement('button', {
            key: page,
            onClick: () => onPageChange(page),
            className: `px-3 py-2 rounded-md text-sm font-medium ${
                page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-500 hover:bg-gray-50'
            }`
        }, page)),
        React.createElement('button', {
            key: 'next',
            onClick: () => onPageChange(currentPage + 1),
            disabled: currentPage >= totalPages,
            className: 'px-3 py-2 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
        }, 'Next')
    ]);
}

window.UIComponents = {
    LoadingSpinner,
    ErrorMessage,
    SearchBox,
    Pagination
};