//imports / requirements
import {createContext, useState} from 'react'
import {MainPage, RegisterPage} from './components/pages';
//context
export const PageContext = createContext();
//render
function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [currentUser, setCurrentUser] = useState('Guest');
  const [currentUserID, setCurrentUserID] = useState(0);
  return (
    <div style={styles.mainContainer}>
      <PageContext.Provider value={{currentPage, setCurrentPage}}>
        {currentPage === 'main' && <MainPage/>}
        {currentPage === 'register' && <RegisterPage/>}
      </PageContext.Provider>
      <footer style={styles.footer}>
        Created by 2d Lt George "Jake" Gordin for Supra Coders RAP Crud Application - Nov 2026
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
    border: "1px solid gold"
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid blue"
  }
}
export default App
