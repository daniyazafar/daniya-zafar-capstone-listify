import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

class Api {
    constructor () {
        this.url = url;
    }

    async getAllLists() {
        try {
            const response = await axios.get(`${this.url}/lists`);
            return response.data;
        } catch (error) {
            console.log("Error while fetching all lists from backend: ", error)
        }
    }

}

export { Api }