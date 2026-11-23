import { useState } from 'react';
import {GuestButton, RegisterButton, LoginButton, BackButton, EditButton, SubmitRegistrationButton,
    SubmitLoginButton, SubmitItemButton, BackToInventoryButton, SubmitEditItemButton, DeleteItemButton} from './Buttons'
import {InventoryTable} from './Data'
import {PageContext} from '../App'
//UI functions
function editColumnText(currentUser) {
    if (currentUser == 'Guest') {
        return 'Cancel'
    }
    else {
        return 'Edit'
    }
}
//pages
export function MainPage() {
    //render
    return (
        <div style={styles.centerContainer}>
            <h1>Welcome to the inventory!</h1>
            <h2>Click below to view all items as a guest</h2>
            <GuestButton/>
            <h2>Or, click below to login / register</h2>
            <RegisterButton/>
            <LoginButton/>
        </div>
    )
}
export function InventoryPage({items, currentUser}) {
    //render
    //console.log("items as seen by page: ")
    //console.log(items)
    return (
        <div style={styles.centerContainer}>
            <h2>Currently logged in as: {currentUser}</h2>
            <h2>Current Inventory:</h2>
            <InventoryTable items={items} currentUser={currentUser}/>
            <BackButton/>
        </div>
    )
}
export function ItemDetailsPage({detailsTarget}) {
    //render
    return (
        <PageContext.Consumer>
        {({currentUser}) => (
        <div style={styles.centerContainer}>
            <h2>Currently logged in as: {currentUser}</h2>
            <h2>Details for {detailsTarget.name}:</h2>
             <table style={styles.inventoryTable}>
                <thead>
                <tr style={styles.inventoryTableRow}>
                    <th style={styles.inventoryTableHeader}>Name</th>
                    <th style={styles.inventoryTableHeader}>Description</th>
                    <th style={styles.inventoryTableHeader}>Quantity</th>
                    {(currentUser != 'Guest') && <th style={styles.inventoryTableHeader}>{editColumnText(currentUser)}</th>}
                </tr>
                </thead>
                <tbody>
                <tr key={detailsTarget.id} style={styles.inventoryTableRow}>
                    <th style={styles.inventoryTableData}>{detailsTarget.name}</th>
                    <td style={styles.inventoryTableData}>{detailsTarget.description}</td>
                    <td style={styles.inventoryTableData}>{detailsTarget.quantity}</td>
                    {(currentUser != 'Guest') && <td style={styles.inventoryTableData}><EditButton buttonText={"Cancel"}/></td>}
                </tr>
                </tbody>
            </table>
            <BackToInventoryButton/>
        </div>
        )}
        </PageContext.Consumer>
    )
}
export function RegisterPage({duplicateUserNameMessage}) {
    //states
    const [newUserName, setNewUserName] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    //monitor fields
    const changeNewUserName = (e) => {
        setNewUserName(e.target.value);
    }
    const changeNewFirstName = (e) => {
        setNewFirstName(e.target.value);
    }
    const changeNewLastName = (e) => {
        setNewLastName(e.target.value);
    }
    const changeNewPassword = (e) => {
        setRegisterPassword(e.target.value);
    }
    //render
    return (
        <div style={styles.centerContainer}>
            <h1>New User Registration</h1>
            <h2>Please complete the following fields:</h2>
            {duplicateUserNameMessage && <h3>Username is already registered! Please select another.</h3>}
            <input name='newUsername' onChange={changeNewUserName} placeholder="Username"></input>
            <input name='newFirstName' onChange={changeNewFirstName} placeholder="First Name"></input>
            <input name='newLastName' onChange={changeNewLastName} placeholder="Last Name"></input>
            <input name='newPassword' onChange={changeNewPassword} placeholder="Password"></input>
            <SubmitRegistrationButton newUsername={newUserName} newFirstName={newFirstName} newLastName={newLastName} registerPassword={registerPassword}/>
            <BackButton/>
        </div>
    )
}
export function LoginPage({incorrectLoginMessage}) {
    //states
    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    //monitor fields
    const changeLoginUserName = (e) => {
        setLoginUserName(e.target.value);
    }
    const changeLoginPassword = (e) => {
        setLoginPassword(e.target.value);
    }
    //render
    return (
        <div style={styles.centerContainer}>
            <h1>Login:</h1>
            {incorrectLoginMessage && <h3>Login error: please check Username and Password.</h3>}
            <input name='loginUsername' onChange={changeLoginUserName} placeholder="Username"></input>
            <input name='loginPassword' onChange={changeLoginPassword} placeholder="Password"></input>
            <SubmitLoginButton loginUserName={loginUserName} loginPassword={loginPassword}/>
            <BackButton/>
        </div>
    )
}
export function AddItemPage({currentUser}) {
    //states
    const [newItemName, setNewItemName] = useState('');
    const [newItemDescription, setNewItemDescription] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState(0);
    //monitor fields
    const changeItemName = (e) => {
        setNewItemName(e.target.value);
    }
    const changeItemDescription = (e) => {
        setNewItemDescription(e.target.value);
    }
    const changeItemQuantity = (e) => {
        setNewItemQuantity(e.target.value);
    }
    //render
    return (
        <div style={styles.centerContainer}>
            <h1>Logged in as: {currentUser}</h1>
            <h1>New Item:</h1>
            <h3>Add item details:</h3>
            <input style={styles.editField} name='newItemName' onChange={changeItemName} placeholder="Item Name"></input>
            <textarea style={styles.editDescriptionField} name='newItemDescription' onChange={changeItemDescription} placeholder="Description"></textarea>
            <input style={styles.editField} type='number' name='newItemQuantity' onChange={changeItemQuantity} placeholder="Quantity"></input>
            <SubmitItemButton newItemName={newItemName} newItemDescription={newItemDescription} newItemQuantity={newItemQuantity}/>
            <BackToInventoryButton/>
        </div>
    )
}
export function EditItemPage({detailsTarget, currentUser}) {
    //states
    console.log("current details target:")
    //console.log(detailsTarget.id.data)
    console.log(detailsTarget.id)
    const [newItemName, setNewItemName] = useState(detailsTarget.name);
    const [newItemDescription, setNewItemDescription] = useState(detailsTarget.description);
    const [newItemQuantity, setNewItemQuantity] = useState(detailsTarget.quantity);
    //monitor fields
    const changeItemName = (e) => {
        setNewItemName(e.target.value);
    }
    const changeItemDescription = (e) => {
        setNewItemDescription(e.target.value);
    }
    const changeItemQuantity = (e) => {
        setNewItemQuantity(e.target.value);
    }
    //console.log(detailsTarget)
    //render
    return (
        <div style={styles.centerContainer}>
            <h1>Logged in as: {currentUser}</h1>
            <h1>New Item:</h1>
            <h3>Edit item details:</h3>
            <input style={styles.editField} name='newItemName' onChange={changeItemName} value={newItemName}></input>
            <textarea style={styles.editDescriptionField} name='newItemDescription' onChange={changeItemDescription} value={newItemDescription}></textarea>
            <input style={styles.editField} type='number' name='newItemQuantity' onChange={changeItemQuantity} value={newItemQuantity}></input>
            <SubmitEditItemButton newItemName={newItemName} newItemDescription={newItemDescription} newItemQuantity={newItemQuantity} itemId={detailsTarget.id}/>
            <DeleteItemButton itemId={detailsTarget.id}/>
            <BackToInventoryButton/>
        </div>
    )
}
//styles
const styles = {
  centerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid azure",
    marginTop: "15vh",
    padding: "2vw"
  },
  usernameInput: {
    padding: "4px",
    margin: "5px"
  },
  inventoryTable: {
   
  },
  inventoryTableRow: {
   
  },
  inventoryTableHeader: {
    padding: "4vw"
  },
  inventoryTableData: {
   textAlign: "center",
   maxWidth: "20vw"
  },
  editDescriptionField: {
    padding: "1vh",
    marginTop: "1vh",
    minHeight: "20vh"
  },
  editField: {
    padding: "1vh",
    marginTop: "1vh"
  }
}