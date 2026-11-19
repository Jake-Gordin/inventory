//imports / requirements
import { useState } from 'react'
import { PageContext } from '../App'
//component exports

export function GuestButton() {
    return (
        <PageContext.Consumer>
            {({currentPage, setCurrentPage}) => (
                <button onClick={() => setCurrentPage('register')}>Continue as Guest</button>
            )}
        </PageContext.Consumer>
    )
}
export function LoginButton() {
    return (
        <button>Login</button>
    )
}
export function RegisterButton() {
    return (
        <PageContext.Consumer>
            {({currentPage, setCurrentPage}) => (
                <button onClick={() => setCurrentPage('main')}>Register</button>
            )}
        </PageContext.Consumer>
    )
}