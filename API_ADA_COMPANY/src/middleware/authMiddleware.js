const jwt = require('jsonwebtoken');

const auth = (role) => (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (role && decoded.role !== role) {
      return res.status(403).json({ message: 'Permissão negada' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = auth;
