const items = [
    {
      id: 1,
      name: "Mug Star Wars",
      description: "Mug Star Wars pour tous les fans de la saga",
      price: "10,00€"
    },
    {
      id: 2,
      name: "Sticker Haute-Loire",
      description: "Sticker Haute-Loire histoire de défendre le chauvinisme de cette belle région et de ses charmants habitants",
      price: "3,00 €"
    },
    {
      id: 3,
      name: "Sticker Mario Bros",
      description: "Sticker Mario Bros pour tous ceux qui veulent garder leur adolescence près d'eux avec cette jolie décoration à mettre n'importe où",
      price: "3,00 €"
    },
    {
      id: 4,
      name: "Mug Ardèche",
      description: "Mug Ardèche pour défendre le chauvinisme de cette belle région et de ses charmants habitants",
      price: "10,00 €"
    },
    {
      id: 5,
      name: "Sticker ASSE",
      description: "Sticker ASSE pour les fidèles supporters des verts",
      price: "15,00 €"
    },
    {
      id: 6,
      name: "T-Shirt Ultra Vomit",
      description: "ST-Shirt Ultra Vomit pour les fans ayant un goût spécifique pour le rock",
      price: "15,00 €"
    },
    {
      id: 7,
      name: "T-Shirt Sum41",
      description: "T-Shirt Sum41 pour les fans de ce groupe qui a bercé de nombreuses enfances/adolescences",
      price: "15,00 €"
    },
    {
      id: 8,
      name: "Porte-clé Kenny South Park",
      description: "Porte-clé Kenny South Park pour les puristes de la séries",
      price: "5,00 €"
    },
    {
      id: 9,
      name: "Gourde San Diego",
      description: "Gourde San Diego pour ceux qui n'ont pas pu visiter ce lieu ou qui sont partis en oubliant de ramener un souvenir",
      price: "10,00 €"
    },
    {
      id: 10,
      name: "Casquette LOU Rugby",
      description: "Casquette LOU Rugby pour les fidèles supporters",
      price: "12,00 €"
    },
    {
      id: 11,
      name: "Casquette Hawaï",
      description: "Casquette Hawaï pour un maximum de style avec une nuance exotique",
      price: "12,00 €"
    },
    {
      id: 12,
      name: "Sticker Ardèche",
      description: "Sticker Ardèche pour les puristes du coin",
      price: "3,00 €"
    }
  ]

  const browse = (req, res) => {
    if (req.query.q !=null) {
      const filteredItems = items.filter((item) =>
      item.description.includes(req.query.q)
    );

    res.json(filteredItems);
    } else {
    res.json(items);
  }
};

const read = (req, res) => {
  const parsedId = parseInt(req.params.id, 10);

  const item = items.find((p) => p.id === parsedId);

  if (item != null) {
    res.json(item);
  } else {
    res.sendStatus(404);
  }

  // res.send(`Hello Item ${req.params.id} !`);
};

module.exports = { browse, read };