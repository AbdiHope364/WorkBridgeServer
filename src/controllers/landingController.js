import { jobs, users, faqs } from '../data/db.js';

export const getJobsPreview = (req, res) => {
  const preview = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    salary: job.salary,
  }));
  res.json({ jobs: preview });
};

export const getWorkersPreview = (req, res) => {
  const workers = users
    .filter((user) => user.role === 'worker')
    .map((user) => ({
      id: user.id,
      name: user.name,
      headline: user.profile.headline,
      skills: user.profile.skills,
      location: user.profile.location,
    }));
  res.json({ workers });
};

export const getFaqs = (req, res) => {
  res.json({ faqs });
};

export const submitContact = (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  res.status(201).json({ message: 'Contact request submitted successfully.' });
};
