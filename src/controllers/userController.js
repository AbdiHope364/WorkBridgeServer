import { users } from '../data/db.js';

const sanitizeUser = (user) => {
  const { passwordHash, ...rest } = user;
  return rest;
};

export const getUserById = (req, res) => {
  const user = users.find((item) => item.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (user.id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json({ user: sanitizeUser(user) });
};

export const updateUser = (req, res) => {
  const user = users.find((item) => item.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (user.id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  Object.assign(user, req.body);
  res.json({ user: sanitizeUser(user) });
};

export const getUserNotifications = (req, res) => {
  const user = users.find((item) => item.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (user.id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json({ notifications: user.notifications || [] });
};
