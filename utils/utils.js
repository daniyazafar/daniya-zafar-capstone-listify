import axios from 'axios';

const url = 'http://localhost:8080';

class Api {
    constructor () {
        this.url = url;
    }

    async getAllLists() {
        try {
            const response = await axios.get(`${this.url}/`);
            console.log(typeof (response.data));
            return response.data;
        } catch (error) {
            console.log("Error while fetching all lists from backend: ", error)
        }
    }

}

export { Api }