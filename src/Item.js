export function Item({ item, onClick }) {
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
