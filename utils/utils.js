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
            console.log("Error while fetching all lists from backend: ", error);
        }
    }

    async postNewList(newListData) {
        try {
            const response = await axios.post(`${url}/lists`, newListData);
            return response.data;
        } catch (error) {
            console.log("Error while posting new list to the backend: ", error);
        }
    }

    async getListById(id) {
        try {
            const response = await axios.get(`${this.url}/lists/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error while getting list by id");
        }
    }

    async postItems(id, items) {
        try {
            const response = await axios.post(`${this.url}/lists/${id}/items`, {items});
            return response.data;
        } catch (error) {
            console.error("Could not add items to the list", error);
        }
    }

    async getListItemsByListId(id) {
        try {
            const response = await axios.get(`${this.url}/lists/${id}/items`);
            return response.data;
        } catch (error) {
            console.error("Could not add items to the database", error);
        }
    }
}

export { Api }