import { createRoot } from 'react-dom/client'
import { MantineProvider, Title } from '@mantine/core';
import './index.css'
import App from './App.jsx'
function Provider() {
  return (
    <MantineProvider>
      <App/>
    </MantineProvider>
  );
}
createRoot(document.getElementById('root')).render(
   <Provider/>
)