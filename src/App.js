import { useState } from "react";
import { cardapio } from "./arrayPizzasInicial";
import "./index.css";
import Cart from "./Cart";
import ModalPizza from "./ModalPizza";
import { FormAddPizza } from "./FormAddPizza";
import { ItemsList } from "./ItemsList";
import { ButtonAddPizza } from "./ButtonAddPizza";
import { Overlay } from "./Overlay";

export default function App() {
  const [listaCardapio, setListaCardapio] = useState(cardapio);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [pizzaSelected, setPizzaSelected] = useState(null);
  const [cart, setCart] = useState([]);

  function ToggleOpenForm() {
    setFormIsOpen((prev) => !prev);
  }

  function handleAddItems(item) {
    setListaCardapio((items) => [...items, item]);
    setFormIsOpen(false);
  }

  function handleSelectedPizza(item) {
    setPizzaSelected((prev) => (prev?.id === item.id ? null : item));
  }

  // Mapeamento dos tamanhos em português para chaves de preços
  const sizeToPriceKey = {
    Pequena: "small",
    Média: "medium",
    Grande: "large",
  };

  const sizeAbreviado = {
    Pequena: "P",
    Média: "M",
    Grande: "G",
  };

  function handleAddToCart(pizza, quantity, size) {
    const priceKey = sizeToPriceKey[size];
    const price = pizza.prices[priceKey];
    // console.log(price);
    const cartItemKey = `${pizza.id}-${size}`; // chave única para cada item no carrinho. Ex: 1-Grande, dessa forma evita que o mesmo item seja adicionado mais de uma vez no carrinho
    const existingCartItem = cart.find((item) => item.key === cartItemKey);

    if (existingCartItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.key === cartItemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newCartItem = {
        key: cartItemKey,
        ...pizza,
        size: sizeAbreviado[size],
        quantity,
        price: price,
      };

      setCart((prev) => [...prev, newCartItem]);
    }
  }

  function handleUpdateCartQuantity(itemKey, change) {
    setCart(
      (prev) =>
        prev
          .map((item) => {
            if (item.key === itemKey) {
              const newQuantity = item.quantity + change;
              if (newQuantity <= 0) {
                // Remove o item se a quantidade chegar a zero ou menos
                return null;
              }
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
          .filter(Boolean) // o filter remove os itens nulos
    );
  }

  return (
    <div>
      <ButtonAddPizza onClick={ToggleOpenForm} />
      <div className="main-area">
        <ItemsList
          listaCardapio={listaCardapio}
          onSelectedPizza={handleSelectedPizza}
        />
        <Cart cart={cart} onUpdateCartQuantity={handleUpdateCartQuantity} />
      </div>
      {formIsOpen && (
        <>
          <Overlay onClick={ToggleOpenForm} />
          <FormAddPizza
            onAddItem={handleAddItems}
            onToggleOpen={ToggleOpenForm}
          />
        </>
      )}
      {pizzaSelected && (
        <>
          <Overlay onClick={() => setPizzaSelected(null)} />
          <ModalPizza
            pizzaSelected={pizzaSelected}
            setPizzaSelected={setPizzaSelected}
            onAddToCart={handleAddToCart}
          />
        </>
      )}
    </div>
  );
}
