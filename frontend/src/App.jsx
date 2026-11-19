//imports / requirements
import { createContext, useState } from 'react'
import { MainPage, RegisterPage } from './components/pages';
//context
export const PageContext = createContext();
//render
function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [currentUser, setCurrentUser] = useState('Guest');
  const [currentUserID, setCurrentUserID] = useState(0);
  return (

    <PageContext.Provider value={{currentPage, setCurrentPage}}>
      {currentPage === 'main' && <MainPage/>}
      {currentPage === 'register' && <RegisterPage/>}
    </PageContext.Provider>
  )
}
//styling
const styles = {
  mainContainer: {
    display: "flex",
    border: "1px solid red"
  }
}
export default App
