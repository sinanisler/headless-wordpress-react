# Headless WordPress React Frontend

A modular headless WordPress frontend built with React and powered by the WordPress REST API. This application demonstrates for building scalable, maintainable single-page applications without requiring a build process.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![WordPress](https://img.shields.io/badge/WordPress-REST%20API-21759b.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

### Core Features
- **Modular Architecture** - Clean separation of concerns with organized file structure
- **Real-time Rendering** - Dynamic content loading with React hooks
- **Client-side Routing** - SPA navigation with browser history support
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **No Build Process** - Runs directly in browser using CDN libraries
- **Advanced Search** - Cross-content search across multiple post types
- **Pagination** - Efficient content browsing with page navigation
- **Error Handling** - Graceful error states with retry mechanisms
- **Fast Loading** - Optimized performance with loading states

### Content Types
- **Blog Posts** - Traditional WordPress posts with full metadata
- **Codex Entries** - Technical documentation with specialized styling
- **Pages** - Static content pages
- **Search Results** - Unified search across all content types

### WordPress Integration
- **REST API** - Full integration with WordPress REST API v2
- **Featured Images** - Automatic image handling with responsive sizing
- **Author Information** - Complete author metadata display
- **Categories & Tags** - Taxonomy support with navigation
- **Publication Dates** - Formatted date display
- **Reading Time** - Automatic reading time calculation

## Quick Start

### Prerequisites
- A WordPress website with REST API enabled (default in WordPress 4.7+)
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/headless-wordpress-react.git
   cd headless-wordpress-react/v1
   ```

2. **Configure WordPress URL**
   Edit `js/services/WordPressAPI.js` or update the initialization in `index.html`:
   ```javascript
   // Change this line to your WordPress site URL
   window.wpAPI = new WordPressAPI('https://your-wordpress-site.com');
   ```

3. **Serve the Files**
   
   **Option A: Simple HTTP Server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
   
   **Option B: Live Server (VS Code)**
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

4. **Open in Browser**
   Navigate to `http://localhost:8000` (or your chosen port)

## 📁 Project Structure

```
v1/
├── index.html                 # Main entry point
├── README.md                  # This file
└── js/
    ├── services/
    │   └── WordPressAPI.js    # WordPress REST API service
    ├── utils/
    │   ├── router.js          # Client-side routing utilities
    │   └── helpers.js         # Utility functions
    ├── components/
    │   ├── UI.js              # Reusable UI components
    │   ├── Header.js          # Navigation header component
    │   └── PostCard.js        # Post/Codex card component
    └── pages/
        ├── PostList.js        # Blog posts listing page
        ├── CodexList.js       # Codex entries listing page
        ├── SinglePost.js      # Single post/codex view page
        ├── SearchResults.js   # Search results page
        └── AboutPage.js       # About page component
```

## Configuration

### WordPress Setup

1. **Ensure REST API is Enabled**
   The WordPress REST API is enabled by default in WordPress 4.7+. Test your endpoint:
   ```
   https://your-site.com/wp-json/wp/v2/posts
   ```

2. **Custom Post Types**
   If you have custom post types (like 'codex'), ensure they're exposed to the REST API:
   ```php
   // In your theme's functions.php or plugin
   register_post_type('codex', array(
       'public' => true,
       'show_in_rest' => true,
       'rest_base' => 'codex',
       // ... other arguments
   ));
   ```

3. **CORS Configuration**
   If serving from a different domain, you may need to configure CORS:
   ```php
   // In your WordPress functions.php
   function add_cors_http_header(){
       header("Access-Control-Allow-Origin: *");
   }
   add_action('init','add_cors_http_header');
   ```

### Application Configuration

#### WordPress API URL
Update the WordPress site URL in `index.html`:
```javascript
window.wpAPI = new WordPressAPI('https://your-wordpress-site.com');
```

#### Pagination Settings
Modify posts per page in respective components:
```javascript
// In PostList.js or CodexList.js
const result = await window.wpAPI.fetchPosts({ page, perPage: 12 }); // Change 12 to desired number
```

#### Search Configuration
Customize search behavior in `js/services/WordPressAPI.js`:
```javascript
async searchContent(query, postTypes = ['posts', 'codex', 'pages'], params = {}) {
    // Add or remove post types as needed
}
```

## Customization

### Styling

The application uses Tailwind CSS for styling. Key style files:

1. **Global Styles** (`index.html` `<style>` section)
   - Typography and base styles
   - Animation keyframes
   - Custom component styles

2. **Component Styles**
   - Tailwind utility classes throughout components
   - Responsive breakpoints
   - Color schemes and theming

### Custom Post Types

To add a new post type:

1. **Add API Methods** (`js/services/WordPressAPI.js`)
   ```javascript
   async fetchCustomType(params = {}) {
       // Implementation
   }
   
   async fetchCustomTypeBySlug(slug) {
       // Implementation
   }
   ```

2. **Create Components** (`js/pages/CustomTypeList.js`, etc.)
   ```javascript
   function CustomTypeList({ navigate, params }) {
       // Implementation
   }
   ```

3. **Update Router** (`index.html`)
   ```javascript
   case '/custom-type':
       return React.createElement(CustomTypeList, { 
           navigate: navigate, 
           params: params 
       });
   ```

4. **Add Navigation** (`js/components/Header.js`)
   ```javascript
   React.createElement('button', {
       onClick: () => navigate('/custom-type'),
       className: 'nav-button-classes'
   }, 'Custom Type')
   ```

### Theming

#### Color Schemes
The application uses a consistent color palette:
- **Primary**: Blue (`blue-600`, `blue-700`)
- **Codex**: Purple (`purple-600`, `purple-700`)
- **Success**: Green (`green-600`)
- **Error**: Red (`red-600`)
- **Neutral**: Gray shades

#### Typography
- **Body**: System font stack (San Francisco, Segoe UI, etc.)
- **Codex Content**: Monospace fonts (JetBrains Mono, Fira Code, etc.)
- **Headings**: Inherit from body with increased weight

## API Reference

### WordPressAPI Class

#### Constructor
```javascript
const api = new WordPressAPI('https://your-site.com');
```

#### Methods

##### `fetchPosts(params = {})`
Fetch blog posts with optional parameters.
```javascript
const result = await api.fetchPosts({
    page: 1,
    perPage: 10,
    search: 'query',
    categories: '1,2,3'
});
// Returns: { posts: Array, totalPages: Number, total: Number }
```

##### `fetchPostBySlug(slug)`
Fetch a single post by slug.
```javascript
const post = await api.fetchPostBySlug('my-post-slug');
// Returns: Post object or null
```

##### `fetchCodex(params = {})`
Fetch codex entries.
```javascript
const result = await api.fetchCodex({ page: 1, perPage: 12 });
// Returns: { codex: Array, totalPages: Number, total: Number }
```

##### `fetchCodexBySlug(slug)`
Fetch a single codex entry by slug.
```javascript
const codex = await api.fetchCodexBySlug('my-codex-slug');
// Returns: Codex object or null
```

##### `searchContent(query, postTypes, params)`
Search across multiple post types.
```javascript
const results = await api.searchContent('react', ['posts', 'codex']);
// Returns: { posts: {...}, codex: {...} }
```

### Router Hook

#### `useRouter()`
Custom hook for client-side routing.
```javascript
const { currentPath, params, navigate } = useRouter();

// Navigate to a new path
navigate('/codex', { page: 2 });

// Access current path and parameters
console.log(currentPath); // '/codex'
console.log(params);      // { page: '2' }
```

### Helper Functions

#### `formatDate(dateString)`
Format WordPress date strings.
```javascript
const formatted = window.helpers.formatDate('2024-01-15T10:30:00');
// Returns: "January 15, 2024"
```

#### `stripHtml(html)`
Remove HTML tags from content.
```javascript
const plain = window.helpers.stripHtml('<p>Hello <strong>world</strong></p>');
// Returns: "Hello world"
```

#### `getReadingTime(content)`
Calculate estimated reading time.
```javascript
const minutes = window.helpers.getReadingTime(htmlContent);
// Returns: Number (reading time in minutes)
```

## SEO Considerations

### Current SEO Features
- **Semantic HTML** - Proper use of article, header, main, footer elements
- **Meta Tags** - Basic meta tags in the HTML head
- **Clean URLs** - Client-side routing with meaningful paths
- **Structured Content** - Proper heading hierarchy

### SEO Limitations (SPA)
- **Server-side Rendering** - Content is rendered client-side
- **Meta Tag Updates** - Dynamic meta tags require additional implementation
- **Social Media Sharing** - Open Graph tags are static

### SEO Improvements
To improve SEO, consider:
1. **Server-side Rendering** - Use Next.js or similar framework
2. **Static Site Generation** - Pre-render pages at build time
3. **Meta Tag Management** - Dynamically update page titles and descriptions
4. **Structured Data** - Add JSON-LD structured data

## Performance Optimization

### Current Optimizations
- **CDN Libraries** - React and utilities loaded from CDN
- **Image Optimization** - Responsive images from WordPress
- **Lazy Loading** - Content loaded on demand
- **Efficient Re-renders** - React hooks with proper dependencies

### Further Optimizations
1. **Code Splitting** - Split JavaScript into smaller chunks
2. **Service Workers** - Cache resources for offline access
3. **Image Lazy Loading** - Implement intersection observer
4. **Bundle Optimization** - Use webpack or similar for production

## Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works between all routes
- [ ] Search functionality returns results
- [ ] Pagination works on listing pages
- [ ] Individual posts/codex entries display properly
- [ ] Responsive design works on mobile devices
- [ ] Error states display when API is unavailable
- [ ] Loading states show during API calls

### Automated Testing
To add automated testing:

1. **Unit Tests** - Test individual components
   ```bash
   npm install --save-dev jest @testing-library/react
   ```

2. **Integration Tests** - Test component interactions

3. **E2E Tests** - Test complete user flows
   ```bash
   npm install --save-dev cypress
   ```

## Security Considerations

### Current Security Measures
- **HTTPS** - Use HTTPS for all API calls
- **Input Sanitization** - WordPress handles content sanitization
- **XSS Prevention** - React's built-in XSS protection

### Security Best Practices
1. **Content Security Policy** - Add CSP headers
2. **API Rate Limiting** - Implement on WordPress side
3. **Input Validation** - Validate search queries
4. **CORS Configuration** - Properly configure CORS on WordPress

## Browser Support

### Supported Browsers
- **Chrome** 70+
- **Firefox** 70+
- **Safari** 12+
- **Edge** 79+

### Required Features
- ES6+ JavaScript features
- Fetch API
- CSS Grid and Flexbox
- CSS Custom Properties

### Polyfills
For older browser support, add polyfills:
```html
<!-- Polyfill.io -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6,fetch"></script>
```

## Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- **JavaScript** - ES6+ syntax, functional components
- **CSS** - Tailwind utility classes, minimal custom CSS
- **HTML** - Semantic markup, accessibility considerations

### Commit Messages
Use conventional commit format:
```
feat: add new component
fix: resolve routing issue
docs: update README
style: format code
refactor: improve performance
test: add unit tests
```

## Troubleshooting

### Common Issues

#### WordPress API Not Accessible
```
Error: Failed to load posts
```
**Solutions:**
- Verify WordPress site URL is correct
- Check if REST API is enabled: `/wp-json/wp/v2/posts`
- Configure CORS if accessing from different domain

#### Custom Post Type Not Found
```
Error: 404 - Not Found
```
**Solutions:**
- Ensure custom post type has `'show_in_rest' => true`
- Verify `rest_base` is set correctly
- Check permalink structure in WordPress

#### Search Not Working
```
Error: Search results empty
```
**Solutions:**
- Verify search endpoint: `/wp-json/wp/v2/posts?search=query`
- Check if content exists in WordPress
- Ensure post types are publicly accessible

#### Styling Issues
```
Tailwind classes not applying
```
**Solutions:**
- Verify Tailwind CDN is loading
- Check browser console for CSS errors
- Ensure class names are spelled correctly

### Debug Mode
Enable debug logging:
```javascript
// In WordPressAPI.js, add console.log statements
console.log('API Response:', response.data);
```

## Learning Resources

### React
- [React Documentation](https://react.dev/)
- [React Hooks Guide](https://react.dev/learn/state-a-components-memory)

### WordPress REST API
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [REST API Reference](https://developer.wordpress.org/rest-api/reference/)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

### JavaScript ES6+
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [ES6 Features](https://github.com/lukehoban/es6features)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **WordPress Team** - For the excellent REST API
- **React Team** - For the amazing JavaScript library
- **Tailwind CSS** - For the utility-first CSS framework
- **Axios** - For the HTTP client library

## Support

### Getting Help
- **GitHub Issues** - For bug reports and feature requests
- **Documentation** - Check this README and inline comments
- **Community** - WordPress and React communities

### Commercial Support
For commercial support, custom development, or consulting:
- Email: [your-email@example.com]
- Website: [your-website.com]

---

**Made with React and WordPress REST API**

*Last updated: January 2024*
