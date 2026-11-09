import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux';
import store from './redux/store.js'
import AppRoot from './AppRoot.jsx'
import ThemeProvider from './context/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ThemeProvider>
        <AppRoot />
      </ThemeProvider>
    </Provider>
)
