import { useState } from 'react';
import {GuestButton, RegisterButton, LoginButton, BackButton} from '../components/buttons'
import {ItemListEntry} from './data'
import {PageContext} from '../App'
//pages
export function MainPage() {
    //render
    return (
        <div style={styles.centerContainer}>
            <h1>Welcome to the inventory!</h1>
            <h2>You can click the button below to continue as guest obviously</h2>
            <GuestButton/>
            <h2>Or, click below to login / register</h2>
            <RegisterButton/>
            <LoginButton/>
        </div>
    )
}
export function InventoryPage({items}) {
    //render
    return (
        <PageContext.Consumer>
        {({currentUser}) => (
        <div style={styles.centerContainer}>
            <h2>Currently logged in as: {currentUser}</h2>
            <h2>Current Inventory:</h2>
             <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <ItemListEntry item={item} key={item.id}/>
                ))}
                </tbody>
            </table>
            <BackButton/>
        </div>
        )}
        </PageContext.Consumer>
    )
}
export function RegisterPage() {
    //render
    return (
        <RegisterButton/>
    )
}
//styles
const styles = {
  centerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid pink"
  }
}