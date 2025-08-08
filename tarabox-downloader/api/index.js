const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing terabox URL' });
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const title = $('title').text();

    res.status(200).json({
      title,
      note: "This is a placeholder. Full parsing needs deeper logic."
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch', detail: error.toString() });
  }
};
