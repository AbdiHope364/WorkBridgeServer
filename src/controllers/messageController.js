import { messages } from '../data/db.js';

export const getConversations = (req, res) => {
  const conversations = messages.filter((conversation) => conversation.participants.includes(req.user.id));
  res.json({ conversations });
};

export const getConversationById = (req, res) => {
  const conversation = messages.find((conversation) => conversation.conversationId === req.params.conversationId);
  if (!conversation || !conversation.participants.includes(req.user.id)) {
    return res.status(404).json({ error: 'Conversation not found' });
  }
  res.json({ conversation });
};

export const sendMessage = (req, res) => {
  const conversation = messages.find((conversation) => conversation.conversationId === req.params.conversationId);
  if (!conversation || !conversation.participants.includes(req.user.id)) {
    return res.status(404).json({ error: 'Conversation not found' });
  }
  const newMessage = {
    id: `m${conversation.messages.length + 1}`,
    senderId: req.user.id,
    text: req.body.text,
    createdAt: new Date().toISOString(),
  };
  conversation.messages.push(newMessage);
  res.status(201).json({ message: newMessage, conversation });
};
