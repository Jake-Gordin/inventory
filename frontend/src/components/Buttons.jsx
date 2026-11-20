//imports / requirements
import {useState} from 'react'
import {PageContext} from '../App'
import {getAllInventory} from './comms'
//functions
function backButtonText(currentUser) {
    if (currentUser == 'Guest') {
        return 'Back to Main'
    }
    else {
        return 'Logout'
    }
}
async function callAllInventory() {
    return await getAllInventory().resolve;
}
//component exports
export function GuestButton() {
    return (
        <PageContext.Consumer>
            {({setCurrentPage}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => { 
                        setCurrentPage('inventory');
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
//styles
const styles = {
  primaryButton: {
    padding: "4px",
    margin: "5px"
  }
}