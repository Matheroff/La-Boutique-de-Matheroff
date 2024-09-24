const categories = [
    {
        id: 1,
        name: "Mugs"
    },
    {
        id: 2,
        name: "T-Shirts"
    },
    {
        id: 3,
        name: "Gourdes"
    },
    {
        id: 4,
        name: "Casquettes"
    },
    {
        id: 5,
        name: "Stickers"
    },
    {
        id: 6,
        name: "Porte-clés"
    }
]

const browse = (req, res) => {
    if (req.query.q !=null) {
      const filteredCategories = categories.filter((category) =>
      category.description.includes(req.query.q)
    );

    res.json(filteredCategories);
    } else {
    res.json(categories);
  }
};

const read = (req, res) => {
  const parsedId = parseInt(req.params.id, 10);

  const category = categories.find((p) => p.id === parsedId);
  
  if (category != null) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }

  // res.send(`Hello Category ${req.params.id} !`);
};

module.exports = { browse, read };