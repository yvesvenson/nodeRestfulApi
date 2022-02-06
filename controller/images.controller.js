const { createClient } = require('pexels');

const getImage = (req, res) => {
    const client = createClient(process.env.PEXEL_API_KEY);

    client.photos.curated({ per_page: 5 }).then(photos => {
        res.status(200).json(photos);
    });

}

module.exports = {
    getImage
}