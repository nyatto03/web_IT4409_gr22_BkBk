// roleMiddleware.js
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ error: 'Access denied. Admins only.' });
  }
  next();
};

export const isAdminOrAssistant = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'assistant') {
    return res.status(403).send({ error: 'Access denied. Admins or Assistants only.' });
  }
  next();
};

export const isCustomer = (req, res, next) => {
  if (req.user.role !== 'customer') {
    return res.status(403).send({ error: 'Access denied. Customers only.' });
  }
  next();
};
