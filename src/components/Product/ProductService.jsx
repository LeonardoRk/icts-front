import axios from 'axios';

const resource = "produtos"
const api = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER_URL
});

class ProductService {


    static async listAllProducts() {
        let response;
        try {
            response = await api.get(resource)
            return response.data;
        } catch (error) {
            return null;
        }
    }

    static async deleteProduct(id) {
        let response;
        try {
            response = await api.delete(resource + `/${id}`)
            return response.data;
        } catch (error) {
            return null;
        }
    }

    static async createProduct(product) {
        try {
            let response;
            response = await api.post(resource, product)
            return response.data
        } catch (error) {
            return null
        }
    }

    static async updateProduct(product, id) {
        try {
            let response;
            response = await api.put(resource + "/" + id, product)
            return response.data
        } catch (error) {
            return null
        }
    }
}

export default ProductService;