const items = [
    {
      id: 1,
      name: "Mug Super Mario Bros",
      description: "Mug Super Mario Bros avec toutes les générations de Mario à travers le temps",
      price: "10,00€"
    },
    {
      id: 2,
      name: "Sticker ASSE",
      description: "Sticker ASSE pour les fidèles supporters des verts",
      price: "3,00 €"
    },
    {
      id: 3,
      name: "T-Shirt Sum41",
      description: "T-Shirt Sum41 pour les fans de ce groupe qui a bercé de nombreuses enfances/adolescences",
      price: "15,00 €"
    }
  ]

  const browse = (req, res) => {
    res.json(items);
};

module.exports = { browse };