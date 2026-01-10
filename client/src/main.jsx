
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './Plans.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)


/*
sudo rm -rf /var/www/du-digital/client/dist  
sudo mkdir -p /var/www/du-digital/client 
sudo cp -r dist /var/www/du-digital/client/  
sudo chown -R www-data:www-data /var/www/du-digital
sudo chmod -R 755 /var/www/du-digital
sudo nginx -t
sudo systemctl reload nginx

sudo rm -rf /var/www/du-digital/admin/dist  
sudo mkdir -p /var/www/du-digital/admin 
sudo cp -r dist /var/www/du-digital/admin/  
sudo chown -R www-data:www-data /var/www/du-digital
sudo chmod -R 755 /var/www/du-digital
sudo nginx -t
sudo systemctl reload nginx


*/