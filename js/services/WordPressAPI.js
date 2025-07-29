class WordPressAPI {
    constructor(baseUrl) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.apiUrl = `${this.baseUrl}/wp-json/wp/v2`;
    }

    async fetchPosts(params = {}) {
        try {
            const queryParams = new URLSearchParams({
                _embed: true,
                per_page: params.perPage || 10,
                page: params.page || 1,
                ...params
            });
            
            const response = await axios.get(`${this.apiUrl}/posts?${queryParams}`);
            return {
                posts: response.data,
                totalPages: parseInt(response.headers['x-wp-totalpages']) || 1,
                total: parseInt(response.headers['x-wp-total']) || 0
            };
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    async fetchPost(id) {
        try {
            const response = await axios.get(`${this.apiUrl}/posts/${id}?_embed=true`);
            return response.data;
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
    }

    async fetchPostBySlug(slug) {
        try {
            const response = await axios.get(`${this.apiUrl}/posts?slug=${slug}&_embed=true`);
            return response.data[0] || null;
        } catch (error) {
            console.error('Error fetching post by slug:', error);
            throw error;
        }
    }

    async fetchPages(params = {}) {
        try {
            const queryParams = new URLSearchParams({
                _embed: true,
                per_page: params.perPage || 10,
                page: params.page || 1,
                ...params
            });
            
            const response = await axios.get(`${this.apiUrl}/pages?${queryParams}`);
            return {
                pages: response.data,
                totalPages: parseInt(response.headers['x-wp-totalpages']) || 1,
                total: parseInt(response.headers['x-wp-total']) || 0
            };
        } catch (error) {
            console.error('Error fetching pages:', error);
            throw error;
        }
    }

    async fetchCategories() {
        try {
            const response = await axios.get(`${this.apiUrl}/categories?per_page=100`);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }

    async fetchCodex(params = {}) {
        try {
            const queryParams = new URLSearchParams({
                _embed: true,
                per_page: params.perPage || 10,
                page: params.page || 1,
                ...params
            });
            
            const response = await axios.get(`${this.apiUrl}/codex?${queryParams}`);
            return {
                codex: response.data,
                totalPages: parseInt(response.headers['x-wp-totalpages']) || 1,
                total: parseInt(response.headers['x-wp-total']) || 0
            };
        } catch (error) {
            console.error('Error fetching codex:', error);
            throw error;
        }
    }

    async fetchCodexBySlug(slug) {
        try {
            const response = await axios.get(`${this.apiUrl}/codex?slug=${slug}&_embed=true`);
            return response.data[0] || null;
        } catch (error) {
            console.error('Error fetching codex by slug:', error);
            throw error;
        }
    }

    async fetchCustomPostType(postType, params = {}) {
        try {
            const queryParams = new URLSearchParams({
                _embed: true,
                per_page: params.perPage || 10,
                page: params.page || 1,
                ...params
            });
            
            const response = await axios.get(`${this.apiUrl}/${postType}?${queryParams}`);
            return {
                posts: response.data,
                totalPages: parseInt(response.headers['x-wp-totalpages']) || 1,
                total: parseInt(response.headers['x-wp-total']) || 0
            };
        } catch (error) {
            console.error(`Error fetching ${postType}:`, error);
            throw error;
        }
    }

    async searchContent(query, postTypes = ['posts', 'codex'], params = {}) {
        try {
            const results = {};
            
            for (const postType of postTypes) {
                const queryParams = new URLSearchParams({
                    search: query,
                    _embed: true,
                    per_page: params.perPage || 10,
                    page: params.page || 1,
                    ...params
                });
                
                const endpoint = postType === 'posts' ? 'posts' : postType;
                const response = await axios.get(`${this.apiUrl}/${endpoint}?${queryParams}`);
                
                results[postType] = {
                    items: response.data,
                    totalPages: parseInt(response.headers['x-wp-totalpages']) || 1,
                    total: parseInt(response.headers['x-wp-total']) || 0
                };
            }
            
            return results;
        } catch (error) {
            console.error('Error searching content:', error);
            throw error;
        }
    }
}

window.WordPressAPI = WordPressAPI;