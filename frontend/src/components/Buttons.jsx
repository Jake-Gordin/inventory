//imports / requirements
import {useState} from 'react'
import {PageContext} from '../App'
//component exports
export function GuestButton() {
    return (
        <PageContext.Consumer>
            {({setCurrentPage}) => (
                <button
                    style={styles.primaryButton}
                    onClick={() => setCurrentPage('register')}
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
//styles
const styles = {
  primaryButton: {
    padding: "4px",
    margin: "5px"
  }
}