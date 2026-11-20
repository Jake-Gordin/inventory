//imports and requirements
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5555'
//functions
export async function getAllInventory() {
        axios.get('/items').then((response) => {
            //console.log("requesting all items")
            //console.log(response.data[0])
            return(response.data[0]);
    })
}