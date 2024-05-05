import { useState } from "react";

export default function ModalPizza({
  pizzaSelected,
  setPizzaSelected,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);
  const [sizePizzaSelected, setSizePizzaSelected] = useState(
    pizzaSelected.sizes[2]
  );
  const [price, setPrice] = useState(pizzaSelected.prices.large);

  function handleSizeChange(size) {
    setSizePizzaSelected(size);
    setQuantity(1);

    if (size === "Pequena") {
      setPrice(pizzaSelected.prices.small);
    } else if (size === "Média") {
      setPrice(pizzaSelected.prices.medium);
    } else {
      setPrice(pizzaSelected.prices.large);
    }
  }

  function handleIncrease() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecrease() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function handleAddToCartClick() {
    onAddToCart(pizzaSelected, quantity, sizePizzaSelected);
    setPizzaSelected(null); // Fechar modal após adicionar ao carrinho
  }

  return (
    <div className="modal-pizza">
      <button className="btn-form-close" onClick={() => setPizzaSelected(null)}>
        X
      </button>
      <h3>{pizzaSelected.name}</h3>
      <img src={pizzaSelected.image} alt={pizzaSelected.name} />
      <div className="modal-pizza-sizes">
        {pizzaSelected.sizes.map((size, index) => (
          <p
            key={index}
            className={`model-pizza-size ${
              sizePizzaSelected === size ? "active-size" : ""
            }`}
            onClick={() => handleSizeChange(size)}
          >
            {size}
          </p>
        ))}
      </div>
      <p className="modal-pizza-desc">{pizzaSelected.description}</p>
      <div className="modal-pizza-area-qtd-adc">
        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <p>{quantity}</p>
          <button onClick={handleIncrease}>+</button>
        </div>
        <div className="modal-pizza-addcart-price">
          <p>R${price * quantity}.00</p>
          <button onClick={handleAddToCartClick}>Adicionar</button>
        </div>
      </div>
    </div>
  );
}
