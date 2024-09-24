
const sayWelcome = (req, res) => {
    console.info(req.query);

    res.send(`Bienvenue dans la Boutique de Matheroff, ${req.query.name} !`);
};

module.exports = { sayWelcome };