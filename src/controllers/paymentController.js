import { payments } from '../data/db.js';

export const getPayments = (req, res) => {
  const userPayments = payments.filter((payment) => payment.userId === req.user.id);
  res.json({ payments: userPayments });
};

export const createCharge = (req, res) => {
  const amount = Number(req.body.amount || 0);
  if (amount <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than zero.' });
  }

  const payment = {
    id: `p${payments.length + 1}`,
    userId: req.user.id,
    type: 'Charge',
    amount,
    currency: 'USD',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  payments.push(payment);
  res.status(201).json({ payment });
};

export const getSubscriptions = (req, res) => {
  const subscriptions = payments.filter((payment) => payment.userId === req.user.id && payment.type === 'Subscription');
  res.json({ subscriptions });
};

export const createSubscription = (req, res) => {
  const payment = {
    id: `p${payments.length + 1}`,
    userId: req.user.id,
    type: 'Subscription',
    amount: Number(req.body.amount || 0),
    currency: 'USD',
    status: 'Active',
    createdAt: new Date().toISOString(),
  };
  payments.push(payment);
  res.status(201).json({ subscription: payment });
};
