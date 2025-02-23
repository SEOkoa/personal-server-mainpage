const dbService = require('../services/dbService');

const checkDbStatus = async (req, res) => {
  try {
    const status = await dbService.checkConnection();
    res.json(status);
  } catch (error) {
    res.status(500).json({
      connected: false,
      message: `DB 연결 실패: ${error.message}`,
      error: error.toString()
    });
  }
};

module.exports = {
  checkDbStatus
};
