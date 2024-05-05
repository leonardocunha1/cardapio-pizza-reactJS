import CartItem from "./CartItem";

export default function Cart({ cart, onUpdateCartQuantity }) {
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
