//imports / requirements
import {useState} from 'react'
import {PageContext} from '../App'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5555'
//UI functions
function backButtonText(currentUser) {
    if (currentUser == 'Guest') {
        return 'Back to Main'
    }
    else {
        return 'Logout'
    }
}
//API functions
//get all inventory for all users
export async function getAllInventory({setItems}) {
    axios.get('/items').then((response) => {
        var newItems = [];
        //console.log("requesting all items")
        const regResult = response.data;
            regResult.forEach(element => {
                var shortDescription = '';
                if (element.description.length > 100) {
                    shortDescription = (element.description.slice(0, 100) + "...");
                }
                else {
                    shortDescription = element.description;
                }
                newItems.push({id: element.ID, user: element.userID, name: element.itemName, description: element.description, shortDescription: shortDescription, quantity: element.quantity})
        });
        setItems(newItems);
    })
}
//component exports
export function GuestButton() {
    return (
        <PageContext.Consumer>
            {({setCurrentPage, setItems}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => { 
                        setCurrentPage('inventory');
                        getAllInventory({setItems});
                    }}
                >
                Continue as Guest
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function LoginButton() {
    return (
        <button
            style={styles.primaryButton}
        >
        Login
        </button>
    )
}
export function RegisterButton() {
    return (
        <PageContext.Consumer>
            {({setCurrentPage}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => setCurrentPage('main')}
                >
                Register
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function BackButton() {
    var buttonText;
    return (
        <PageContext.Consumer>
            {({setCurrentPage, currentUser}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => setCurrentPage('main')}
                >
                {backButtonText(currentUser)}
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function ItemDetailsButton() {
    //render
    return (
        <PageContext.Consumer>
            {({setCurrentPage, currentUser}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => setCurrentPage('main')}
                >
                "Details"
                </button>
            )}
        </PageContext.Consumer>
    )
}
//styles
const styles = {
  primaryButton: {
    padding: "4px",
    margin: "5px"
  }
}