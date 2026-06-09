import { users, jobs, reports, disputes } from '../data/db.js';

export const getAdminUsers = (req, res) => {
  res.json({ users });
};

export const getAdminJobs = (req, res) => {
  res.json({ jobs });
};

export const getReports = (req, res) => {
  res.json({ reports });
};

export const getDisputes = (req, res) => {
  res.json({ disputes });
};

export const verifyUser = (req, res) => {
  const user = users.find((item) => item.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  user.verified = true;
  res.json({ user });
};

export const verifyCompany = (req, res) => {
  const company = users.find((item) => item.id === req.params.id && item.role === 'employer');
  if (!company) {
    return res.status(404).json({ error: 'Company not found.' });
  }
  company.verified = true;
  res.json({ company });
};

export const resolveDispute = (req, res) => {
  const dispute = disputes.find((item) => item.id === req.params.id);
  if (!dispute) {
    return res.status(404).json({ error: 'Dispute not found.' });
  }
  dispute.status = req.body.status || 'Resolved';
  res.json({ dispute });
};
