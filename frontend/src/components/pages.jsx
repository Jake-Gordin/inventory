import {GuestButton, RegisterButton, LoginButton} from '../components/buttons'
//pages
export function MainPage() {
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
export function RegisterPage() {
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
    border: "1px solid red"
  }
}