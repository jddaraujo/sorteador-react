import { useState } from "react";

export default function Sorteador() {
  const [quantidade, setQuantidade] = useState("");
  const [ganhadores, setGanhadores] = useState("");
  const [contador, setContador] = useState("");
  const [roleta, setRoleta] = useState("");
  const [resultado, setResultado] = useState([]);

  function iniciarSorteio() {
    const q = parseInt(quantidade);
    const g = parseInt(ganhadores);

    if (!q || !g || g > q) {
      alert("Valores inválidos!");
      return;
    }

    const numeros = Array.from({ length: q }, (_, i) => i + 1);
    const sorteados = [];

    for (let i = 0; i < g; i++) {
      const index = Math.floor(Math.random() * numeros.length);
      sorteados.push(numeros.splice(index, 1)[0]);
    }

    contagem(() =>
      animarRoleta(numeros, () => {
        setResultado(sorteados);
        salvarHistorico(sorteados);
      }),
    );
  }

  function contagem(callback) {
    let count = 3;
    setContador(count);

    const i = setInterval(() => {
      count--;
      if (count > 0) {
        setContador(count);
      } else {
        clearInterval(i);
        setContador("");
        callback();
      }
    }, 800);
  }

  function animarRoleta(numeros, callback) {
    let tempo = 0;

    const i = setInterval(() => {
      const rand = numeros[Math.floor(Math.random() * numeros.length)];
      setRoleta(rand);
      tempo++;

      if (tempo > 15) {
        clearInterval(i);
        setRoleta("");
        callback();
      }
    }, 80);
  }

  function salvarHistorico(lista) {
    const hist = JSON.parse(localStorage.getItem("historico")) || [];
    hist.push(lista);
    localStorage.setItem("historico", JSON.stringify(hist));
  }

  return (
    <div>
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />
      <input
        type="number"
        placeholder="Ganhadores"
        value={ganhadores}
        onChange={(e) => setGanhadores(e.target.value)}
      />

      <button onClick={iniciarSorteio}>🎲 Sortear</button>

      <div className="contador">{contador}</div>
      <div className="roleta">{roleta}</div>

      <div className="resultado">
        {resultado.map((num, i) => (
          <div key={i} className={i === 0 ? "primeiro" : ""}>
            {i + 1}º lugar: {num}
          </div>
        ))}
      </div>
    </div>
  );
}
