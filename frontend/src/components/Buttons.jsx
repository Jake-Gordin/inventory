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
function editHandler(currentUser, setCurrentPage, detailsTarget) {
    if (currentUser == 'Guest') {
        setCurrentPage('inventory');
    }
    else {
        //edit function
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
                newItems.push({id: element.ID, user: element.userID, name: element.itemName, description: element.description, shortDescription: shortDescription, quantity: element.quantity})
        });
        setItems(newItems); 
    })
}
//register new user
async function registrationHandler(newUsername, newFirstName, newLastName, newPassword, setCurrentPage, setCurrentUser, setDuplicateUserNameMessage) {
    const registrationPackage = {
            firstName : newUsername,
            lastName : newFirstName,
            userName : newLastName,
            password : newPassword
    }
    console.log("sending registration request")
    console.log(registrationPackage);
    axios.post('/register', registrationPackage).then((response) => {
            const regResult = response.data;
            if (regResult === 'ER_DUP_ENTRY') {
                console.log("Username already registered")
                setDuplicateUserNameMessage(true)
            }
            else {
                console.log(regResult)
                setCurrentUser(newUsername)
                setCurrentPage('inventory')
                setDuplicateUserNameMessage(false)
            }
        })
}
//login user
async function loginHandler(loginUserName, loginPassword, setCurrentPage, setCurrentUser, setIncorrectLoginMessage) {
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
            else if (regResult === "match") {
                console.log("login success")
                setIncorrectLoginMessage(false)
            }
            else {
                console.log("incorrect password")
                setIncorrectLoginMessage(true)
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
            {({setCurrentPage, currentUser, setCurrentUser, setDuplicateUserNameMessage, setIncorrectLoginMessage}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => backHandler(setCurrentPage, currentUser, setCurrentUser, setDuplicateUserNameMessage, setIncorrectLoginMessage)}
                >
                {backButtonText(currentUser)}
                </button>
            )}
        </PageContext.Consumer>
    )
}
export function SubmitRegistrationButton({newUsername, newFirstName, newLastName, newPassword}) {
    //render
    return (
        <PageContext.Consumer>
            {({setCurrentPage, setCurrentUser, setDuplicateUserNameMessage}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => registrationHandler(newUsername, newFirstName, newLastName, 
                        newPassword, setCurrentPage, setCurrentUser, setDuplicateUserNameMessage)}
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
            {({setCurrentPage, setCurrentUser, setIncorrectLoginMessage}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => loginHandler(loginUserName, loginPassword, setCurrentPage, setCurrentUser, setIncorrectLoginMessage)}
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
                    onClick={() => editHandler(currentUser, setCurrentPage, detailsTarget)}
                >
                {editButtonText(currentUser)}
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