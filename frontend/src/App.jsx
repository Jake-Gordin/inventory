//imports / requirements
import {createContext, useState} from 'react'
import {MainPage, RegisterPage, InventoryPage} from './components/pages';
//context
export const PageContext = createContext();
//render
function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [currentUser, setCurrentUser] = useState('Guest');
  const [currentUserID, setCurrentUserID] = useState(0);
  return (
    <div style={styles.mainContainer}>
      <PageContext.Provider value={{currentPage, setCurrentPage, currentUser, setCurrentUser}}>
        {currentPage === 'main' && <MainPage/>}
        {currentPage === 'register' && <RegisterPage/>}
        {currentPage === 'inventory' && <InventoryPage/>}
      </PageContext.Provider>
      <footer style={styles.footer}>
        Created by 2d Lt George "Jake" Gordin for Supra Coders RAP CRUD Application - Nov 2026
      </footer>
    </div>
  )
}
//styles
const styles = {
  mainContainer: {
     display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "98vh",
    border: "2px solid gold"
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid blue"
  }
}
export default App
