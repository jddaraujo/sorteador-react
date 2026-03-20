import { useEffect, useState } from "react";

export default function Historico() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const hist = JSON.parse(localStorage.getItem("historico")) || [];
    setHistorico(hist.reverse());
  }, []);

  return (
    <div>
      <h3>📜 Histórico</h3>
      <ul>
        {historico.map((item, i) => (
          <li key={i}>Sorteio: {item.join(", ")}</li>
        ))}
      </ul>
    </div>
  );
}
