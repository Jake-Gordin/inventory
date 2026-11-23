//imports / requirements
import {createContext, useState} from 'react'
import {MainPage, RegisterPage, InventoryPage, ItemDetailsPage, LoginPage, AddItemPage, EditItemPage} from './components/Pages'
import backgroundImage from '../public/Stars_Background.jpg';
//context
export const PageContext = createContext();
//render
function App() {
  //states
  const [currentPage, setCurrentPage] = useState('main');
  const [currentUser, setCurrentUser] = useState('Guest');
  const [detailsTarget, setDetailsTarget] = useState(0);
  const [items, setItems] = useState([]);
  const [duplicateUserNameMessage, setDuplicateUserNameMessage] = useState(false);
  const [incorrectLoginMessage, setIncorrectLoginMessage] = useState(false);
  //render
  return (
    <div style={styles.mainContainer}>
      <PageContext.Provider value={{currentPage, setCurrentPage, currentUser, setCurrentUser, items, setItems, 
          detailsTarget, setDetailsTarget, duplicateUserNameMessage, setDuplicateUserNameMessage, incorrectLoginMessage, setIncorrectLoginMessage}}>
        {currentPage === 'main' && <MainPage/>}
        {currentPage === 'register' && <RegisterPage duplicateUserNameMessage={duplicateUserNameMessage}/>}
        {currentPage === 'inventory' && <InventoryPage items={items} currentUser={currentUser}/>}
        {currentPage === 'itemDetails' && <ItemDetailsPage detailsTarget={detailsTarget}/>}
        {currentPage === 'login' && <LoginPage incorrectLoginMessage={incorrectLoginMessage}/>}
        {currentPage === 'addItem' && <AddItemPage currentUser={currentUser}/>}
        {currentPage === 'edit' && <EditItemPage detailsTarget={detailsTarget} currentUser={currentUser}/>}
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
    //border: "2px solid gold"
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //border: "2px solid blue",
    fontWeight: "bold"
  }
}
export default App
