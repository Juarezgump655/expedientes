import logo from './logo.svg';
import './App.css';
import Login from './app/components/Login.jsx';
import Expedientes from './app/components/Expedientes.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Expedientes />
      </header>
    </div>
  );
}

export default App;
