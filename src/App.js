import { useState } from "react";
import { cardapio } from "./arrayPizzasInicial";
import "./index.css";

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

function ButtonAddPizza({ onClick }) {
  return (
    <button className="btn-add-pizza" onClick={onClick}>
      Adicionar Pizza ao cardápio
    </button>
  );
}

function ItemsList({ listaCardapio, onSelectedPizza }) {
  return (
    <ul className="pizza-area">
      {listaCardapio.map((item) => (
        <Item item={item} key={item.id} onClick={onSelectedPizza} />
      ))}
    </ul>
  );
}

function Item({ item, onClick }) {
  return (
    <li className="pizzas">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p className="pizzas-desc">{item.description}</p>
      <p className="pizzas-price">R$ {item.prices.large},00</p>
      <button onClick={() => onClick(item)}>+</button>
    </li>
  );
}

function Overlay({ onClick }) {
  return <div className="overlay" onClick={onClick}></div>;
}

function FormAddPizza({ onAddItem, onToggleOpen }) {
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

function ModalPizza({ pizzaSelected, setPizzaSelected, onAddToCart }) {
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

function Cart({ cart, onUpdateCartQuantity }) {
  const subTotalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const entrega = 10;
  const total = subTotalPrice + entrega - subTotalPrice * 0.05;

  return (
    <aside className={cart.length > 0 ? "show" : ""}>
      <div className="cart-area">
        <h2>Pedido</h2>
        <ul>
          {cart.map((item) => (
            <CartItem
              key={item.key}
              item={item}
              onUpdateCartQuantity={onUpdateCartQuantity}
            />
          ))}
        </ul>
        <div className="cart-area-sub">
          <p>Subtotal</p>
          <p>R$ {subTotalPrice.toFixed(2)}</p>
        </div>
        <div className="cart-area-sub">
          <p>Desconto (-5%)</p>
          <p>R$ {(subTotalPrice * 0.05).toFixed(2)}</p>
        </div>
        <div className="cart-area-sub">
          <p>Entrega</p>
          <p>R$ {entrega.toFixed(2)}</p>
        </div>
        <div className="cart-area-sub sem-borda">
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>
        <button className="btn-cart-finish">Finalizar compra</button>
      </div>
    </aside>
  );
}

function CartItem({ item, onUpdateCartQuantity }) {
  return (
    <li>
      <div className="cart-item-left">
        <img src={item.image} alt={item.name} />
        <p>
          <b>{item.name}</b> <span>({item.size})</span>{" "}
          <span>R$ {item.price}.00</span>
        </p>
      </div>
      <div className="cart-item-right">
        <button onClick={() => onUpdateCartQuantity(item.key, -1)}>-</button>
        <p>{item.quantity}</p>
        <button onClick={() => onUpdateCartQuantity(item.key, 1)}>+</button>
      </div>
    </li>
  );
}
