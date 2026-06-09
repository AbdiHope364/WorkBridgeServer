import { jobs, users } from '../data/db.js';

export const getJobs = (req, res) => {
  const query = String(req.query.q || '').toLowerCase();
  const filtered = query
    ? jobs.filter((job) => job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query) || job.category.toLowerCase().includes(query))
    : jobs;
  res.json({ jobs: filtered });
};

export const getJobById = (req, res) => {
  const job = jobs.find((item) => Number(item.id) === Number(req.params.id));
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json({ job });
};

export const createJob = (req, res) => {
  const { title, company, location, type, salary, category, description, requirements } = req.body;
  const newJob = {
    id: jobs.length + 1,
    title,
    company,
    postedBy: req.user.id,
    location,
    type,
    salary,
    category,
    description,
    requirements: requirements || [],
    applicants: [],
    shortlisted: [],
    isActive: true,
    createdAt: new Date().toISOString(),
  };
  jobs.push(newJob);
  res.status(201).json({ job: newJob });
};

export const updateJob = (req, res) => {
  const job = jobs.find((item) => Number(item.id) === Number(req.params.id));
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  if (job.postedBy !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not allowed to update this job' });
  }
  Object.assign(job, req.body);
  res.json({ job });
};

export const deleteJob = (req, res) => {
  const index = jobs.findIndex((item) => Number(item.id) === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Job not found' });
  }
  jobs.splice(index, 1);
  res.status(204).send();
};

export const applyJob = (req, res) => {
  const job = jobs.find((item) => Number(item.id) === Number(req.params.id));
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  if (job.applicants.includes(req.user.id)) {
    return res.status(400).json({ error: 'Already applied' });
  }
  job.applicants.push(req.user.id);
  const user = users.find((item) => item.id === req.user.id);
  if (user && !user.applications) user.applications = [];
  if (user && !user.applications.includes(job.id)) {
    user.applications.push(job.id);
  }
  res.json({ message: 'Application submitted', job });
};

export const shortlistCandidate = (req, res) => {
  const { candidateId } = req.body;
  const job = jobs.find((item) => Number(item.id) === Number(req.params.id));
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  if (!candidateId) {
    return res.status(400).json({ error: 'candidateId is required' });
  }
  if (!job.shortlisted.includes(candidateId)) {
    job.shortlisted.push(candidateId);
  }
  res.json({ job });
};
