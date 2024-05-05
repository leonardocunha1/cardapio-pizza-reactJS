export default function CartItem({ item, onUpdateCartQuantity }) {
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
