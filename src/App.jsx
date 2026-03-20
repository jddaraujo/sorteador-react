import Sorteador from "./components/Sorteador";
import Historico from "./components/Historico";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>🎰 Sorteador React</h1>
      <Sorteador />
      <Historico />
    </div>
  );
}

export default App;
