//imports / requirements
import {useState} from 'react'
import {PageContext} from '../App'
import axios from 'axios'
axios.defaults.baseURL = 'https://localhost:5555'
//UI functions
function backButtonText(currentUser) {
    if (currentUser == 'Guest') {
        return 'Back to Main'
    }
    else {
        return 'Logout'
    }
}
function editButtonText(currentUser) {
    if (currentUser == 'Guest') {
        return 'Cancel'
    }
    else {
        return 'Edit'
    }
}
function backHandler(setCurrentPage, currentUser, setCurrentUser, setDuplicateUserNameMessage,
    setIncorrectLoginMessage) {
    setDuplicateUserNameMessage(false)
    setIncorrectLoginMessage(false)
    if (currentUser == 'Guest') {
        setCurrentPage('main');
    }
    else {
        setCurrentUser('Guest');
        setCurrentPage('main');
    }
}
function editMenuHandler(currentUser, setCurrentPage) {
    if (currentUser == 'Guest') {
        setCurrentPage('inventory');
    }
    else {
        setCurrentPage('edit');
    }
}
//API functions
//get all inventory for all users
function getAllInventory({setItems}) {
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
                newItems.push({id: element.ID, user: element.userID, name: element.name, description: element.description, shortDescription: shortDescription, quantity: element.quantity})
        });
        setItems(newItems); 
    })
}
//get inventory for a specific user
function getUserInventory(setItems, currentUser) {
    const inventoryPackage = {
            currentUser : currentUser,
    }
    axios.post('/users/items', inventoryPackage).then((response) => {
        var newItems = [];
        const regResult = response.data;
        console.log("user item list:")
        console.log(regResult)
            regResult.forEach(element => {
                var shortDescription = '';
                if (element.description.length > 100) {
                    shortDescription = (element.description.slice(0, 100) + "...");
                }
                else {
                    shortDescription = element.description;
                }
                newItems.push({id: element.ID, user: element.userID, name: element.name, description: element.description, shortDescription: shortDescription, quantity: element.quantity})
        });
        setItems(newItems);
        //console.log(newItems)
    })
}
function addItemHandler(newItemName, newItemDescription, 
                        newItemQuantity, currentUser, setCurrentPage, setItems) {
    const newItemPackage = {
            itemName : newItemName,
            itemDescription : newItemDescription,
            itemQuantity : Number(newItemQuantity),
            currentUser : currentUser
    }
    //console.log("new item package:")
    //console.log(newItemPackage)
    axios.post('/items', newItemPackage).then((response) => {
        const regResult = response.data;
        if (regResult == 'ITEM_ADD_ERROR') {
            console.log("item add error!")
        }
        else {
            console.log("item added!")
        }
        getUserInventory(setItems, currentUser)
        setCurrentPage('inventory') 
    })
}
function editItemHandler(newItemName, newItemDescription, 
                        newItemQuantity, currentUser, setCurrentPage, setItems, itemID) {
    const editItemPackage = {
            itemName : newItemName,
            itemDescription : newItemDescription,
            itemQuantity : Number(newItemQuantity),
            itemID : itemID
    }
    console.log("edit item package:")
    console.log(editItemPackage)
    axios.put('/items', editItemPackage).then((response) => {
        const regResult = response.data;
        if (regResult == 'ITEM_EDIT_OK') {
            console.log("item edit edited!")
        }
        else {
            console.log("item edit error!")
        }
        getUserInventory(setItems, currentUser)
        setCurrentPage('inventory') 
    })
}
function deleteItemHandler(currentUser, setCurrentPage, setItems, itemID) {
    axios.delete('/items', {data: {itemID: itemID}}).then((response) => {
        const regResult = response.data;
        if (regResult == 'ITEM_DELETE_OK') {
            console.log("item deleted!")
        }
        else {
            console.log("item delete error!")
        }
        getUserInventory(setItems, currentUser)
        setCurrentPage('inventory') 
    })
}
//register new user
async function registrationHandler(newUsername, newFirstName, newLastName, registerPassword, 
    setCurrentPage, setCurrentUser, setDuplicateUserNameMessage,
    setItems, currentUser) {
    //console.log("read params as " + newUsername + " " + newFirstName + " " + newLastName + " " + registerPassword)
    const registrationPackage = {
            firstName : newUsername,
            lastName : newFirstName,
            userName : newLastName,
            password : registerPassword
    }
    //console.log("sending registration request")
    //console.log(registrationPackage);
    axios.post('/register', registrationPackage).then((response) => {
            const regResult = response.data;
            if (regResult === 'ER_DUP_ENTRY') {
                console.log("Username already registered")
                setDuplicateUserNameMessage(true)
            }
            else {
                console.log(regResult)
                setCurrentUser(newUsername)
                getUserInventory(setItems, newUsername)
                setCurrentPage('inventory')
                setDuplicateUserNameMessage(false)
            }
        })
}
//login user
async function loginHandler(loginUserName, loginPassword, setCurrentPage, setCurrentUser, setIncorrectLoginMessage, 
    currentUser, setItems) {
    const loginPackage = {
            userName : loginUserName,
            password: loginPassword
    }
    console.log("sending login request")
    console.log(loginPackage);
    axios.post('/login', loginPackage).then( async (response) => {
            const regResult = response.data;
            if (regResult === "ERR_NO_USER") {
                console.log("No username found")
                setIncorrectLoginMessage(true)
            }
            else if (regResult === "mismatch") {
                console.log("incorrect password")
                setIncorrectLoginMessage(true)
            }
            else {
                console.log("login success")
                setIncorrectLoginMessage(false)
                setCurrentUser(loginUserName)
                setCurrentPage('inventory')
                getUserInventory(setItems, loginUserName)
            }
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
        <PageContext.Consumer>
            {({setCurrentPage}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => { 
                        setCurrentPage('login');
                    }}
                >
                Login
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function RegisterButton() {
    return (
        <PageContext.Consumer>
            {({setCurrentPage}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => setCurrentPage('register')}
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
            {({setCurrentPage, currentUser, setCurrentUser, setDuplicateUserNameMessage, 
                setIncorrectLoginMessage, setCurrentUserID}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => backHandler(setCurrentPage, currentUser, setCurrentUser, 
                        setDuplicateUserNameMessage, setIncorrectLoginMessage, setCurrentUserID)}
                >
                {backButtonText(currentUser)}
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function BackToInventoryButton() {
    var buttonText;
    return (
        <PageContext.Consumer>
            {({setCurrentPage}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => setCurrentPage('inventory')}
                >
                Back
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function SubmitRegistrationButton({newUsername, newFirstName, newLastName, registerPassword}) {
    //render
    return (
        <PageContext.Consumer>
            {({setCurrentPage, setCurrentUser, setDuplicateUserNameMessage, setItems, currentUser}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => registrationHandler(newUsername, newFirstName, 
                        newLastName, registerPassword, setCurrentPage, setCurrentUser, 
                        setDuplicateUserNameMessage, setItems, currentUser)}
                >
                Submit Registration
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function SubmitLoginButton({loginUserName, loginPassword}) {
    //render
    return (
        <PageContext.Consumer>
            {({setCurrentPage, setCurrentUser, setIncorrectLoginMessage, currentUser, setItems}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => loginHandler(loginUserName, loginPassword, setCurrentPage, setCurrentUser, setIncorrectLoginMessage, 
                        currentUser, setItems)}
                >
                Login
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function ItemDetailsButton({item}) {
    //render
    return (
        <PageContext.Consumer>
            {({setCurrentPage, setDetailsTarget}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => {
                        //console.log("showing details for: " + item.name)
                        setDetailsTarget(item);
                        //console.log("getting details for item")
                        //console.log(item)
                        setCurrentPage('itemDetails');
                    }}
                >
                View Details
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function EditButton() {
    //render
    return (
        <PageContext.Consumer>
            {({setCurrentPage, currentUser, detailsTarget}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => editMenuHandler(currentUser, setCurrentPage, detailsTarget)}
                >
                {editButtonText(currentUser)}
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function AddItemButton() {
    //render
    return (
        <PageContext.Consumer>
            {({setCurrentPage}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => setCurrentPage('addItem')}
                >
                Add New Item
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function SubmitItemButton({newItemName, newItemDescription, newItemQuantity}) {
    //render
    return (
        <PageContext.Consumer>
            {({setCurrentPage, currentUser, setItems}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => addItemHandler(newItemName, newItemDescription, 
                        newItemQuantity, currentUser, setCurrentPage, setItems)}
                >
                Add New Item
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function SubmitEditItemButton({newItemName, newItemDescription, newItemQuantity, itemId}) {
    //render
    return (
        <PageContext.Consumer>
            {({setCurrentPage, currentUser, setItems}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => editItemHandler(newItemName, newItemDescription, 
                        newItemQuantity, currentUser, setCurrentPage, setItems, itemId)}
                >
                Edit Item
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function DeleteItemButton({itemId}) {
    //render
    return (
        <PageContext.Consumer>
            {({setCurrentPage, setItems, currentUser}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => deleteItemHandler(currentUser, setCurrentPage, setItems, itemId)}
                >
                Delete Item
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