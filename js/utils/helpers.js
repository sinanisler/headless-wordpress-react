const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

const truncateText = (text, length = 150) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
};

const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const textContent = stripHtml(content);
    const wordCount = textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

window.helpers = {
    formatDate,
    stripHtml,
    truncateText,
    getReadingTime,
    debounce
};