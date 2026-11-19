//imports / requirements
import { useState } from 'react'
import { GuestButton, RegisterButton, LoginButton } from './components/Buttons'
//render
function App() {
  return (
    <div style={styles.mainContainer}>
      <GuestButton/>
      <RegisterButton/>
      <LoginButton/>
    </div>
  )
}
const styles = {
  mainContainer: {
    display: "flex",
    border: "1px solid red"
  }
}
export default App
