import bcrypt from 'bcryptjs';
import { users } from '../data/db.js';
import { signToken } from '../utils/token.js';

const sanitizeUser = (user) => {
  const { passwordHash, ...rest } = user;
  return rest;
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email.toLowerCase() === String(email).toLowerCase());

  if (!user || !bcrypt.compareSync(password || '', user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  if (!user.verified) {
    return res.status(403).json({ error: 'Email address not verified' });
  }

  const token = signToken({ id: user.id, role: user.role });
  return res.json({ user: sanitizeUser(user), token });
};

export const register = (req, res) => {
  const { name, email, password, role = 'worker' } = req.body;
  const existing = users.find((item) => item.email.toLowerCase() === String(email).toLowerCase());

  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const newUser = {
    id: `u${users.length + 1}`,
    name: name || 'New User',
    email,
    passwordHash: bcrypt.hashSync(password || 'Password123!', 10),
    role,
    verified: false,
    profile: {},
    notifications: [],
  };

  users.push(newUser);
  const token = signToken({ id: newUser.id, role: newUser.role });

  return res.status(201).json({ user: sanitizeUser(newUser), token });
};

export const forgotPassword = (req, res) => {
  const { email } = req.body;
  const user = users.find((item) => item.email.toLowerCase() === String(email).toLowerCase());

  if (!user) {
    return res.status(200).json({ message: 'If this email exists, a reset link has been sent.' });
  }

  return res.json({ message: 'Password reset instructions have been sent to your email.' });
};

export const resetPassword = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email.toLowerCase() === String(email).toLowerCase());

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  user.passwordHash = bcrypt.hashSync(password || 'Password123!', 10);
  return res.json({ message: 'Password updated successfully.' });
};

export const verifyEmail = (req, res) => {
  const { email } = req.body;
  const user = users.find((item) => item.email.toLowerCase() === String(email).toLowerCase());

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  user.verified = true;
  return res.json({ message: 'Email verified successfully.' });
};

export const getMe = (req, res) => {
  const user = users.find((item) => item.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  return res.json({ user: sanitizeUser(user) });
};
