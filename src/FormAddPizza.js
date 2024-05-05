import { useState } from "react";

export function FormAddPizza({ onAddItem, onToggleOpen }) {
  const [nomePizza, setNomePizza] = useState("");
  const [descricaoPizza, setDescricaoPizza] = useState("");
  const [nomeImagem, setNomeImagem] = useState("");
  const [valorPequeno, setValorPequeno] = useState("");
  const [valorMedio, setValorMedio] = useState("");
  const [valorGrande, setValorGrande] = useState("");

  function handleSubmitPizzaAdd(e) {
    e.preventDefault();

    if (
      !nomePizza ||
      !descricaoPizza ||
      !nomeImagem ||
      !valorPequeno ||
      !valorMedio ||
      !valorGrande
    ) {
      return;
    }

    const id = crypto.randomUUID();
    const novaPizza = {
      id,
      name: nomePizza,
      description: descricaoPizza,
      image: nomeImagem,
      sizes: ["Pequena", "Média", "Grande"],
      prices: { small: valorPequeno, medium: valorMedio, large: valorGrande },
    };

    onAddItem(novaPizza);

    setNomePizza("");
    setDescricaoPizza("");
    setNomeImagem("");
    setValorPequeno("");
    setValorMedio("");
    setValorGrande("");
  }

  return (
    <form className="form-add-pizza" onSubmit={handleSubmitPizzaAdd}>
      <button className="btn-form-close" onClick={onToggleOpen}>
        X
      </button>
      <h3>Nova Pizza</h3>
      <div>
        <label>Nome da pizza</label>
        <input
          type="text"
          value={nomePizza}
          onChange={(e) => setNomePizza(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descrição da pizza</label>
        <input
          type="text"
          value={descricaoPizza}
          onChange={(e) => setDescricaoPizza(e.target.value)}
          required
        />
      </div>
      <div>
        <label>URL da imagem</label>
        <input
          type="text"
          value={nomeImagem}
          onChange={(e) => setNomeImagem(e.target.value)}
          required
        />
      </div>
      <p>Valores das pizzas</p>
      <div>
        <label>Tamanho pequeno (P)</label>
        <input
          type="number"
          value={valorPequeno}
          onChange={(e) => setValorPequeno(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tamanho médio (M)</label>
        <input
          type="number"
          value={valorMedio}
          onChange={(e) => setValorMedio(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tamanho Grande (G)</label>
        <input
          type="number"
          value={valorGrande}
          onChange={(e) => setValorGrande(e.target.value)}
          required
        />
      </div>
      <button className="btn-form-add-pizza">Adicionar</button>
    </form>
  );
}
