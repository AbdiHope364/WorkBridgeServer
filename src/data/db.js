import bcrypt from 'bcryptjs';

const clearPassword = 'Password123!';
const hashedPassword = bcrypt.hashSync(clearPassword, 10);

export const users = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'worker@example.com',
    passwordHash: hashedPassword,
    role: 'worker',
    verified: true,
    profile: {
      headline: 'Full-stack developer',
      summary: 'Experienced full-stack developer with React, Node.js and cloud deployment skills.',
      location: 'Remote',
      skills: ['React', 'Node.js', 'Express', 'JavaScript'],
    },
    savedJobs: [1],
    applications: [1],
    availability: { status: 'Available', type: 'Full-time' },
    notifications: [
      { id: 'n1', message: 'Your application for Frontend Developer was viewed.', read: false, createdAt: '2026-05-01' },
    ],
    ratings: [{ id: 'r1', score: 4.8, review: 'Great communicator and very reliable.', reviewer: 'VenTech' }],
    paymentInfo: { provider: 'Stripe', account: 'acct_1234' },
  },
  {
    id: 'u2',
    name: 'Acme Corp',
    email: 'employer@example.com',
    passwordHash: hashedPassword,
    role: 'employer',
    verified: true,
    profile: {
      companyName: 'Acme Corp',
      industry: 'Technology',
      website: 'https://acmecorp.com',
      description: 'Hiring world-class freelancers for product development and design.',
    },
    notifications: [
      { id: 'n2', message: 'A new freelancer applied to your Frontend Developer role.', read: false, createdAt: '2026-05-02' },
    ],
    ratings: [{ id: 'r2', score: 4.9, review: 'Fast feedback and excellent briefs.', reviewer: 'Alex Johnson' }],
    paymentInfo: { provider: 'Stripe', account: 'acct_5678' },
  },
  {
    id: 'admin',
    name: 'WorkBridge Admin',
    email: 'admin@example.com',
    passwordHash: hashedPassword,
    role: 'admin',
    verified: true,
    profile: {
      headline: 'Platform administrator',
    },
  },
];

export const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    postedBy: 'u2',
    location: 'Remote',
    type: 'Full-time',
    salary: '80,000 - 100,000 USD',
    category: 'Development',
    description: 'Build responsive user interfaces with React and Tailwind.',
    requirements: ['React', 'JavaScript', 'CSS', 'REST APIs'],
    applicants: ['u1'],
    shortlisted: [],
    isActive: true,
    createdAt: '2026-05-01',
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Acme Corp',
    postedBy: 'u2',
    location: 'Remote',
    type: 'Contract',
    salary: '60,000 - 75,000 USD',
    category: 'Design',
    description: 'Design intuitive product experiences for web and mobile platforms.',
    requirements: ['Figma', 'UX research', 'Prototyping'],
    applicants: [],
    shortlisted: [],
    isActive: true,
    createdAt: '2026-05-12',
  },
];

export const messages = [
  {
    conversationId: 'c1',
    participants: ['u1', 'u2'],
    messages: [
      { id: 'm1', senderId: 'u2', text: 'Hi Alex, can you share your latest portfolio?', createdAt: '2026-05-03T10:20:00Z' },
      { id: 'm2', senderId: 'u1', text: 'Sure, I just updated it and sent the link.', createdAt: '2026-05-03T10:22:00Z' },
    ],
  },
];

export const payments = [
  {
    id: 'p1',
    userId: 'u1',
    type: 'Payout',
    amount: 2800,
    currency: 'USD',
    status: 'Completed',
    createdAt: '2026-04-30',
  },
  {
    id: 'p2',
    userId: 'u2',
    type: 'Subscription',
    amount: 199,
    currency: 'USD',
    status: 'Pending',
    createdAt: '2026-05-10',
  },
];

export const tickets = [
  {
    id: 't1',
    userId: 'u1',
    subject: 'Issue with job application',
    message: 'I am unable to submit my application for Frontend Developer.',
    status: 'Open',
    createdAt: '2026-05-04',
  },
];

export const faqs = [
  { id: 'f1', question: 'How do I create an account?', answer: 'Use the register page and choose worker or employer account type.' },
  { id: 'f2', question: 'How do I post a job?', answer: 'Employers can post a job from the post-job dashboard page.' },
];

export const reports = [
  { id: 'rpt1', type: 'Job', targetId: 1, reason: 'Suspected spam posting', status: 'Open', createdAt: '2026-05-05' },
];

export const disputes = [
  { id: 'd1', title: 'Payment dispute for contract work', status: 'Pending', createdAt: '2026-05-06', details: 'Client disputes hours logged for May.' },
];
