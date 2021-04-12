import axios from 'axios';

const resource = "compras"
const api = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER_URL
});

class PurchaseService {
    

    static async listAllPurchases() {
        let response;
        try{
            response = await api.get(resource)
            return response.data;
        }catch(error) {
            return null;
        }
    }

    static async createPurchase(purchase) {
        let response;
        try {
            response = await api.post(resource, purchase)
            return response.data
        }catch(error) {
            return null;
        }
    }

    static async editPurchase(purchase, id) {
        let response;
        try {
            response = await api.put(resource + "/" + id, purchase)
            return response.data
        }catch(error) {
            return null;
        }
    }

    static async deletePurchase(id) {
        let response;
        try {
            response = await api.delete(resource + `/${id}`)
            return response.data;
        } catch(error) {
            return  null;
        }
    }
}

export default PurchaseService;