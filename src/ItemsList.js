import { Item } from "./Item";

export function ItemsList({ listaCardapio, onSelectedPizza }) {
  return (
    <ul className="pizza-area">
      {listaCardapio.map((item) => (
        <Item item={item} key={item.id} onClick={onSelectedPizza} />
      ))}
    </ul>
  );
}
