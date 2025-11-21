
import './App.css';
import Expedientes from './app/pages/Expedientes.jsx';
import Login from './app/pages/Login.jsx';
import AppRouter from "./app/router/AppRouter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppRouter />
      </header>
    </div>
  );
}

export default App;
