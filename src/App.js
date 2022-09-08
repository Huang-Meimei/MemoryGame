import logo from './logo.svg';
import './App.css';
import Card from './components/Card'
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Dashboard num='5' size='25' />
      </div>
    </Provider>
  );
}

export default App;
