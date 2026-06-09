import { tickets } from '../data/db.js';

export const getTickets = (req, res) => {
  const userTickets = tickets.filter((ticket) => ticket.userId === req.user.id);
  res.json({ tickets: userTickets });
};

export const createTicket = (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message) {
    return res.status(400).json({ error: 'Subject and message are required.' });
  }

  const ticket = {
    id: `t${tickets.length + 1}`,
    userId: req.user.id,
    subject,
    message,
    status: 'Open',
    createdAt: new Date().toISOString(),
  };
  tickets.push(ticket);
  res.status(201).json({ ticket });
};
