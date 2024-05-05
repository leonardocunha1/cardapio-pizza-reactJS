// https://freeimage.host/pt site para hospedar imagens
// https://iili.io/JrJ47pa.png  link de uma imagem de pizza para teste

const cardapio = [
  {
    id: 1,
    name: "Margherita",
    description: "Classic Italian pizza with tomato, mozzarella, and basil.",
    image: "https://iili.io/JgsUV5u.png",
    sizes: ["Pequena", "Média", "Grande"],
    prices: {
      small: 20,
      medium: 30,
      large: 40,
    },
  },
  {
    id: 2,
    name: "Pepperoni",
    description:
      "Pizza with tomato sauce, mozzarella cheese, and pepperoni slices.",
    image: "https://iili.io/JgsgPyu.png",
    sizes: ["Pequena", "Média", "Grande"],
    prices: {
      small: 25,
      medium: 35,
      large: 45,
    },
  },
  {
    id: 3,
    name: "Quattro Formaggi",
    description:
      "A combination of four cheeses: mozzarella, parmesan, gorgonzola, and provolone.",
    image: "https://iili.io/Jgsrdua.png",
    sizes: ["Pequena", "Média", "Grande"],
    prices: {
      small: 30,
      medium: 40,
      large: 50,
    },
  },
];

export { cardapio };
