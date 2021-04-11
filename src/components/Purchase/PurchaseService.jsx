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
            console.log("enviando compra")
            response = await api.post(resource, purchase)
            console.log("compra voltou")
            return response.data
        }catch(error) {
            console.log("compra erro")
            return null;
        }
    }
}

export default PurchaseService;