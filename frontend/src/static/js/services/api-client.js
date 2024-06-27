export class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async fetch(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.text();
        } catch (error) {
            console.error('Fetch failed:', error);
            throw error;
        }
    }
}

const apiClient = new ApiClient('http://localhost:8000/api');
export default apiClient;
