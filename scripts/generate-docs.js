const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, PageBreak, Header, Footer,
  BorderStyle, TabStopPosition, TabStopType, WidthType,
  ShadingType, TableOfContents, ExternalHyperlink,
} = require('docx');

const OUTPUT = path.join(__dirname, '..', 'GreenHarvest-Documentation.docx');

function h(text, level = 1) {
  const map = { 1: HeadingLevel.HEADING_1, 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3 };
  return new Paragraph({ heading: map[level] || HeadingLevel.HEADING_1, children: [new TextRun({ text, bold: true })] });
}

function p(...runs) {
  return new Paragraph({
    spacing: { after: 120, line: 276 },
    children: runs.map(r => typeof r === 'string' ? new TextRun({ text: r }) : r),
  });
}

function bold(text) { return new TextRun({ text, bold: true }); }
function code(text) { return new TextRun({ text, font: 'Consolas', size: 18, color: '333333' }); }
function italic(text) { return new TextRun({ text, italics: true }); }
function link(text, url) { return new ExternalHyperlink({ children: [new TextRun({ text, style: 'Hyperlink', color: '0563C1', underline: { type: 'single' } })], link: url }); }

function bullet(text) {
  return new Paragraph({
    spacing: { after: 60, line: 276 },
    bullet: { level: 0 },
    children: [new TextRun({ text })],
  });
}

function subBullet(text) {
  return new Paragraph({
    spacing: { after: 40, line: 260 },
    bullet: { level: 1 },
    children: [new TextRun({ text })],
  });
}

function spacer(pts = 200) {
  return new Paragraph({ spacing: { after: pts }, children: [] });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function codeBlock(lines) {
  const children = [];
  if (typeof lines === 'string') lines = lines.split('\n');
  lines.forEach((line, i) => {
    children.push(new TextRun({ text: line + (i < lines.length - 1 ? '\n' : ''), font: 'Consolas', size: 16, color: '1E1E1E' }));
  });
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    indent: { left: 400 },
    shading: { type: ShadingType.CLEAR, fill: 'F5F5F5' },
    border: { top: { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' } },
    children,
  });
}

function makeTable(headers, rows) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(h => new TableCell({
      width: { size: Math.round(100 / headers.length), type: WidthType.PERCENTAGE },
      shading: { type: ShadingType.CLEAR, fill: '2E7D32' },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 18 })] })],
    })),
  });
  const dataRows = rows.map(row => new TableRow({
    children: row.map((cell, idx) => new TableCell({
      width: { size: Math.round(100 / headers.length), type: WidthType.PERCENTAGE },
      shading: idx === 0 ? { type: ShadingType.CLEAR, fill: 'F0F7ED' } : undefined,
      children: [new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: String(cell), size: 17 })] })],
    })),
  }));
  return new Table({ rows: [headerRow, ...dataRows] });
}

function sectionNumber(n) {
  return `${n}. `;
}

async function main() {
  const children = [];

  // ===================== TITLE PAGE =====================
  children.push(spacer(2000));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: 'GreenHarvest', size: 56, bold: true, color: '2E7D32' })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: 'Agriculture Platform', size: 40, color: '4CAF50' })] }));
  children.push(spacer(600));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: 'Complete Technical Documentation', size: 28, color: '666666' })] }));
  children.push(spacer(400));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: 'Version 1.0.0', size: 22, color: '999999' })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: `Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, size: 22, color: '999999' })] }));
  children.push(spacer(1000));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'A full-stack agriculture management platform built with the MERN stack', size: 20, color: '888888', italics: true })] }));
  children.push(pageBreak());

  // ===================== TABLE OF CONTENTS =====================
  children.push(h('Table of Contents', 1));
  children.push(spacer(200));

  const tocItems = [
    ['1', 'Introduction', '3'],
    ['2', 'Project Architecture', '6'],
    ['3', 'Technology Stack', '9'],
    ['4', 'Environment Setup & Installation', '12'],
    ['5', 'Backend: Entry Point & Configuration', '15'],
    ['6', 'Backend: Database Models', '18'],
    ['7', 'Backend: API Routes & Controllers', '22'],
    ['8', 'Backend: Middleware & Utilities', '26'],
    ['9', 'Frontend: Project Structure & Entry Points', '29'],
    ['10', 'Frontend: Context Providers & State Management', '32'],
    ['11', 'Frontend: Routing & Page Components', '35'],
    ['12', 'Frontend: Common Components & Custom Hooks', '38'],
    ['13', 'Frontend: Admin Panel', '41'],
    ['14', 'Frontend: Animations & Theming System', '44'],
    ['15', 'Full API Reference', '47'],
    ['16', 'Authentication & Authorization Flow', '50'],
    ['17', 'Security Measures', '52'],
    ['18', 'Deployment Guide', '54'],
    ['19', 'Future Enhancements & Roadmap', '57'],
  ];

  const tocRows = tocItems.map(([num, title, page]) => {
    const dots = '.'.repeat(Math.max(1, 80 - num.length - title.length - page.length));
    return new Paragraph({
      spacing: { after: 40 },
      tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
      children: [
        new TextRun({ text: `${num}. ${title}`, size: 20 }),
        new TextRun({ text: ` ${dots} `, size: 20, color: 'CCCCCC' }),
        new TextRun({ text: page, size: 20, bold: true }),
      ],
    });
  });
  children.push(...tocRows);
  children.push(pageBreak());

  // ===================== CHAPTER 1: INTRODUCTION =====================
  children.push(h(`${sectionNumber(1)}Introduction`, 1));
  children.push(spacer(100));

  children.push(h('1.1 Project Overview', 2));
  children.push(p('GreenHarvest is a comprehensive full-stack agriculture platform designed to bridge the gap between farmers, agricultural suppliers, and industry experts. The platform serves as a centralized hub for agricultural information, product procurement, crop management guidance, and community engagement. Built with modern web technologies, GreenHarvest delivers a rich, interactive experience with smooth animations, dark/light theme support, and a fully responsive design.'));
  children.push(p('The platform is structured as a monorepo containing two main applications: a RESTful API backend built with Node.js, Express, and MongoDB, and a dynamic single-page frontend built with React, Vite, and Tailwind CSS. The backend provides a comprehensive API for managing crops, products, blog posts, user inquiries, testimonials, FAQs, and analytics, while the frontend consumes these APIs to deliver an engaging user experience.'));

  children.push(h('1.2 Project Name Origin', 2));
  children.push(p('The name "GreenHarvest" reflects the platform\'s core mission: promoting sustainable agriculture ("Green") and enabling prosperous yields ("Harvest"). The visual identity uses earth tones, leaf greens, and warm sunset oranges to evoke a natural, organic feel throughout the user interface.'));

  children.push(h('1.3 Target Audience', 2));
  children.push(bullet('Farmers and agricultural workers seeking crop information and products'));
  children.push(bullet('Agricultural suppliers looking to list products and reach farmers'));
  children.push(bullet('Agronomists and agricultural experts sharing knowledge through the blog'));
  children.push(bullet('General users interested in sustainable farming and organic products'));
  children.push(bullet('Platform administrators managing content, users, and analytics'));

  children.push(h('1.4 Key Capabilities', 2));
  children.push(bullet('Crop Information System: Comprehensive database of crops with details on growing seasons, soil requirements, water needs, and cultivation periods'));
  children.push(bullet('Product Marketplace: Catalog of agricultural products including seeds, fertilizers, equipment, pesticides, and organic supplies with stock management'));
  children.push(bullet('Content Management System: Full CRUD operations for blog posts, testimonials, FAQs, and services'));
  children.push(bullet('User Management: JWT-based authentication with role-based access control (user/admin)'));
  children.push(bullet('Inquiry Management: Contact form submissions with read/unread tracking'));
  children.push(bullet('Analytics Dashboard: Page view tracking with 30-day aggregation and per-page breakdown'));
  children.push(bullet('Admin Panel: Complete administrative interface for managing all platform content'));
  children.push(bullet('Interactive UI: Framer Motion animations, smooth scrolling, custom cursor, dark/light theme, and responsive design'));

  children.push(h('1.5 Document Scope', 2));
  children.push(p('This document provides comprehensive technical documentation for the GreenHarvest Agriculture Platform. It covers the complete architecture, all backend and frontend components, database schema, API endpoints, authentication flow, security measures, deployment procedures, and future roadmap. This document is intended for developers, system administrators, and technical stakeholders who need to understand, maintain, or extend the platform.'));

  children.push(pageBreak());

  // ===================== CHAPTER 2: PROJECT ARCHITECTURE =====================
  children.push(h(`${sectionNumber(2)}Project Architecture`, 1));
  children.push(spacer(100));

  children.push(h('2.1 High-Level Architecture', 2));
  children.push(p('GreenHarvest follows a modern client-server architecture with a clear separation of concerns between the frontend presentation layer and the backend API layer. The frontend is a React single-page application (SPA) that communicates with the backend exclusively through RESTful JSON APIs. The backend follows a layered architecture pattern with controllers, services (via utility functions), models, and middleware.'));

  children.push(p('Architecture Diagram (Logical Flow):', { bold: true }));
  children.push(codeBlock([
    '┌─────────────────────────────────────────────────────────┐',
    '│                    Client Browser                        │',
    '│  React SPA (Vite + Tailwind + Framer Motion)             │',
    '└────────────────────┬────────────────────────────────────┘',
    '                     │  HTTP/HTTPS (REST JSON)',
    '                     │  JWT Bearer Token Auth',
    '                     ▼',
    '┌─────────────────────────────────────────────────────────┐',
    '│              Express API Server (Node.js)                 │',
    '│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │',
    '│  │Middleware │→ │ Routes   │→ │Controllers│              │',
    '│  │(auth,     │  │(11 route │  │(11 ctrls)│               │',
    '│  │ validate, │  │ modules) │  │          │               │',
    '│  │ error)    │  └──────────┘  └────┬─────┘               │',
    '│  └──────────┘                      │                     │',
    '│                                     ▼                     │',
    '│                              ┌──────────┐                │',
    '│                              │ Models   │                │',
    '│                              │(9 Mongoose│               │',
    '│                              │ schemas)  │               │',
    '│                              └────┬─────┘                │',
    '└────────────────────────────────────┼──────────────────────┘',
    '                                     │',
    '                                     ▼',
    '┌─────────────────────────────────────────────────────────┐',
    '│               MongoDB Atlas (Cloud Database)             │',
    '│               Collections: users, crops, products,       │',
    '│               blogs, contacts, faqs, testimonials,       │',
    '│               services, analytics                        │',
    '└─────────────────────────────────────────────────────────┘',
  ]));

  children.push(h('2.2 Monorepo Structure', 2));
  children.push(p('The project is organized as a monorepo with a root package.json that orchestrates both the backend and frontend. The root uses concurrently to run both development servers simultaneously.'));
  children.push(codeBlock([
    'agriculture-platform/',
    '├── package.json              # Root orchestrator with scripts',
    '├── backend/                   # Express API server',
    '│   ├── server.js             # Entry point',
    '│   ├── config/               # DB connection & app config',
    '│   ├── models/               # 9 Mongoose schemas',
    '│   ├── controllers/          # 11 controller modules',
    '│   ├── routes/               # 11 route modules',
    '│   ├── middleware/           # Auth, validation, error handler',
    '│   ├── utils/                # APIFeatures, AppError, upload',
    '│   └── uploads/              # Uploaded media storage',
    '├── frontend/                  # React SPA',
    '│   ├── src/',
    '│   │   ├── context/          # 3 React context providers',
    '│   │   ├── components/       # Common & home components',
    '│   │   ├── pages/            # 13 page components (lazy-loaded)',
    '│   │   ├── hooks/            # 4 custom hooks',
    '│   │   ├── animations/       # Framer Motion variants',
    '│   │   ├── styles/           # Custom CSS animations',
    '│   │   └── utils/            # Axios client, constants, helpers',
    '│   ├── vite.config.js        # Vite config with proxy',
    '│   └── tailwind.config.js    # Custom theme colors & animations',
    '└── scripts/                   # Utility scripts (this generator)',
  ]));

  children.push(h('2.3 Request Lifecycle', 2));
  children.push(p('The following describes the complete lifecycle of a typical API request:'));
  children.push(p(bold('Step 1: Request Initiation'), ' - The frontend Axios client sends an HTTP request to the Vite dev server (port 5173). If the path starts with /api or /uploads, Vite\'s proxy configuration forwards the request to the Express backend (port 5000).'));
  children.push(p(bold('Step 2: Middleware Pipeline'), ' - The request passes through Express middleware in this order: helmet (security headers), compression (gzip), cors (cross-origin), JSON parser, URL-encoded parser, cookie parser, mongo-sanitize (NoSQL injection prevention), morgan (logging in dev mode), and rate limiter (100 requests/15 min).'));
  children.push(p(bold('Step 3: Route Matching'), ' - The request matches a route handler in the appropriate route module. Routes with protect middleware first verify the JWT token from the Authorization header or cookie.'));
  children.push(p(bold('Step 4: Validation'), ' - Routes with express-validator rules validate the request body. If validation fails, the validate middleware returns a 400 response with error messages.'));
  children.push(p(bold('Step 5: Controller Execution'), ' - The controller function executes, wrapped in catchAsync to handle any errors. Controllers use Mongoose models to interact with MongoDB via the APIFeatures utility for filtering, searching, sorting, and pagination.'));
  children.push(p(bold('Step 6: Response'), ' - A JSON response is sent back to the frontend with the requested data. If an error occurs at any stage, the global errorHandler middleware catches it and returns an appropriate error response.'));

  children.push(pageBreak());

  // ===================== CHAPTER 3: TECHNOLOGY STACK =====================
  children.push(h(`${sectionNumber(3)}Technology Stack`, 1));
  children.push(spacer(100));

  children.push(h('3.1 Backend Technologies', 2));
  children.push(makeTable(
    ['Technology', 'Version', 'Purpose'],
    [
      ['Node.js', '>= 14.0.0', 'JavaScript runtime for the server'],
      ['Express', '4.18.2', 'Web application framework'],
      ['Mongoose', '8.0.3', 'MongoDB ODM (Object Data Modeling)'],
      ['MongoDB Atlas', 'Cloud', 'Cloud-hosted NoSQL database'],
      ['bcryptjs', '2.4.3', 'Password hashing (12 salt rounds)'],
      ['jsonwebtoken', '9.0.2', 'JWT token generation and verification'],
      ['express-validator', '7.0.1', 'Request body validation'],
      ['multer', '1.4.5-lts.1', 'File upload handling'],
      ['nodemailer', '6.9.7', 'SMTP email sending (configured)'],
      ['helmet', '7.1.0', 'HTTP security headers'],
      ['cors', '2.8.5', 'Cross-Origin Resource Sharing'],
      ['express-rate-limit', '7.1.4', 'API rate limiting'],
      ['express-mongo-sanitize', '2.2.0', 'NoSQL injection prevention'],
      ['compression', '1.7.4', 'Gzip response compression'],
      ['cookie-parser', '1.4.6', 'Cookie parsing for JWT'],
      ['morgan', '1.10.0', 'HTTP request logging'],
      ['dotenv', '16.3.1', 'Environment variable management'],
      ['nodemon', '3.0.2', 'Development auto-restart'],
    ]
  ));

  children.push(h('3.2 Frontend Technologies', 2));
  children.push(makeTable(
    ['Technology', 'Version', 'Purpose'],
    [
      ['React', '18.2.0', 'UI component library'],
      ['React Router DOM', '6.21.1', 'Client-side routing'],
      ['Vite', '5.0.8', 'Build tool and dev server'],
      ['Tailwind CSS', '3.4.0', 'Utility-first CSS framework'],
      ['Framer Motion', '10.16.16', 'Animation library'],
      ['Axios', '1.6.2', 'HTTP client for API calls'],
      ['react-helmet-async', '2.0.3', 'SEO meta tag management'],
      ['react-icons', '4.12.0', 'Icon library'],
      ['Lenis', '1.0.42', 'Smooth scrolling engine'],
      ['Leaflet', '1.9.4', 'Interactive maps (installed)'],
      ['react-leaflet', '4.2.1', 'React bindings for Leaflet'],
      ['PostCSS', '8.4.32', 'CSS post-processing'],
      ['Autoprefixer', '10.4.16', 'CSS vendor prefixing'],
    ]
  ));

  children.push(h('3.3 Development Tools', 2));
  children.push(makeTable(
    ['Tool', 'Purpose'],
    [
      ['concurrently (8.2.2)', 'Run backend and frontend simultaneously'],
      ['@vitejs/plugin-react', 'JSX transform and Hot Module Replacement'],
      ['nodemon', 'Automatic server restart on file changes'],
    ]
  ));

  children.push(h('3.4 Why These Technologies?', 2));
  children.push(p('The technology choices were made based on the following considerations:'));
  children.push(p(bold('MERN Stack Foundation'), ' - The MongoDB, Express, React, Node.js stack provides a full JavaScript ecosystem, enabling code reuse and a consistent development experience across the entire application. MongoDB\'s flexible document model is ideal for the varied data structures in agriculture (crops with optional fields, products with dynamic categories, etc.).'));
  children.push(p(bold('Vite over Create React App'), ' - Vite offers significantly faster development server startup and Hot Module Replacement (HMR) compared to CRA. It uses native ES modules and esbuild for transpilation, resulting in near-instant code updates during development.'));
  children.push(p(bold('Tailwind CSS'), ' - Enables rapid UI development with utility classes. The custom theme configuration allows defining agriculture-specific colors (leaf green, earth brown, sunset orange) as first-class design tokens.'));
  children.push(p(bold('Framer Motion'), ' - Provides a declarative API for complex animations with spring physics, gesture recognition, and layout animations. It integrates seamlessly with React\'s component model and supports AnimatePresence for page transitions.'));

  children.push(pageBreak());

  // ===================== CHAPTER 4: ENVIRONMENT SETUP =====================
  children.push(h(`${sectionNumber(4)}Environment Setup & Installation`, 1));
  children.push(spacer(100));

  children.push(h('4.1 Prerequisites', 2));
  children.push(bullet('Node.js >= 14.0.0 (recommended: LTS version 18 or 20)'));
  children.push(bullet('npm >= 8.0.0 (comes with Node.js)'));
  children.push(bullet('MongoDB Atlas account (free tier) or local MongoDB instance'));
  children.push(bullet('Git for version control'));
  children.push(bullet('A code editor (VS Code recommended)'));

  children.push(h('4.2 Environment Variables', 2));
  children.push(p('The backend requires the following environment variables. Copy backend/.env.example to backend/.env and fill in the values:'));

  children.push(makeTable(
    ['Variable', 'Description', 'Default Value'],
    [
      ['PORT', 'Server port number', '5000'],
      ['MONGO_URI', 'MongoDB connection string', 'mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/agriculture'],
      ['JWT_SECRET', 'Secret key for JWT signing', 'your_jwt_secret_here'],
      ['JWT_EXPIRES_IN', 'JWT token expiration', '7d'],
      ['JWT_COOKIE_EXPIRES_IN', 'Cookie expiration (days)', '7'],
      ['EMAIL_HOST', 'SMTP server host', 'smtp.gmail.com'],
      ['EMAIL_PORT', 'SMTP server port', '587'],
      ['EMAIL_USER', 'SMTP email username', 'your_email@gmail.com'],
      ['EMAIL_PASS', 'SMTP app password', 'your_app_password'],
      ['FRONTEND_URL', 'Frontend URL for CORS', 'http://localhost:5173'],
      ['NODE_ENV', 'Environment mode', 'development'],
    ]
  ));

  children.push(h('4.3 Installation Steps', 2));
  children.push(p(bold('Step 1: Clone the Repository')));
  children.push(codeBlock('git clone <repository-url>\ncd agriculture-platform'));
  children.push(p(bold('Step 2: Install All Dependencies')));
  children.push(codeBlock('npm run install:all'));
  children.push(p('This runs npm install in the root, backend, and frontend directories sequentially.'));
  children.push(p(bold('Step 3: Configure Environment Variables')));
  children.push(codeBlock('cd backend\ncp .env.example .env'));
  children.push(p('Edit backend/.env with your MongoDB Atlas connection string and JWT secret.'));
  children.push(p(bold('Step 4: Start Development Servers')));
  children.push(codeBlock('npm run dev'));
  children.push(p('This starts both the backend (http://localhost:5000) and frontend (http://localhost:5173) concurrently. The frontend proxies /api requests to the backend via Vite\'s built-in proxy.'));

  children.push(h('4.4 Available Scripts', 2));
  children.push(makeTable(
    ['Script', 'Command', 'Description'],
    [
      ['dev', 'concurrently ...', 'Run backend + frontend in dev mode'],
      ['dev:backend', 'cd backend && npm run dev', 'Backend only with nodemon'],
      ['dev:frontend', 'cd frontend && npm run dev', 'Frontend only with Vite'],
      ['build', 'cd frontend && npm run build', 'Build production frontend'],
      ['start', 'cd backend && npm start', 'Start production backend'],
      ['install:all', 'npm install && ...', 'Install all dependencies'],
    ]
  ));

  children.push(h('4.5 Verifying the Setup', 2));
  children.push(p('After starting development servers:'));
  children.push(bullet('Backend: Visit http://localhost:5000/api/crops - should return JSON (may be empty array)'));
  children.push(bullet('Frontend: Visit http://localhost:5173 - should load the GreenHarvest landing page'));
  children.push(bullet('API proxy: The frontend at localhost:5173 can make requests to /api/* which are proxied to backend'));

  children.push(pageBreak());

  // ===================== CHAPTER 5: BACKEND ENTRY POINT & CONFIG =====================
  children.push(h(`${sectionNumber(5)}Backend: Entry Point & Configuration`, 1));
  children.push(spacer(100));

  children.push(h('5.1 Server Entry Point (server.js)', 2));
  children.push(p('The backend entry point is backend/server.js. It is responsible for initializing the Express application, connecting middleware, mounting routes, and starting the HTTP server.'));
  children.push(codeBlock(`const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api', limiter);

app.use('/uploads', express.static('uploads'));

const routes = require('./routes');
app.use('/api', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`));

  children.push(h('5.2 Middleware Stack (Order Matters)', 2));
  children.push(makeTable(
    ['Order', 'Middleware', 'Purpose'],
    [
      ['1', 'helmet', 'Sets security-related HTTP headers (CSP, HSTS, X-Frame-Options, etc.)'],
      ['2', 'compression', 'Compresses response bodies with gzip/deflate'],
      ['3', 'cors', 'Enables CORS for the frontend origin with credentials'],
      ['4', 'express.json', 'Parses JSON request bodies (max 10MB)'],
      ['5', 'express.urlencoded', 'Parses URL-encoded request bodies'],
      ['6', 'cookieParser', 'Parses Cookie header into req.cookies'],
      ['7', 'mongoSanitize', 'Sanitizes inputs to prevent NoSQL injection ($ operators)'],
      ['8', 'morgan (dev)', 'Logs HTTP requests in dev mode'],
      ['9', 'rate-limit (on /api)', 'Limits requests to 100 per 15-minute window per IP'],
      ['10', 'Routes (/api)', 'Mounts all application route modules'],
      ['11', 'errorHandler', 'Catches and formats all errors consistently'],
    ]
  ));

  children.push(h('5.3 Database Connection (config/db.js)', 2));
  children.push(p('The database connection module uses Mongoose to connect to MongoDB Atlas.'));
  children.push(codeBlock(`const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;`));

  children.push(h('5.4 Application Configuration (config/config.js)', 2));
  children.push(p('Centralized configuration module that exports all environment variables with sensible defaults.'));
  children.push(codeBlock(`module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret_change_in_prod',
  jwtExpire: process.env.JWT_EXPIRES_IN || '7d',
  jwtCookieExpire: process.env.JWT_COOKIE_EXPIRES_IN || 7,
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  frontendURL: process.env.FRONTEND_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};`));

  children.push(pageBreak());

  // ===================== CHAPTER 6: DATABASE MODELS =====================
  children.push(h(`${sectionNumber(6)}Backend: Database Models`, 1));
  children.push(spacer(100));

  children.push(p('GreenHarvest uses MongoDB with Mongoose ODM to define 9 data models. Each model corresponds to a MongoDB collection and defines the schema, validation rules, indexes, and methods for that entity.'));

  children.push(h('6.1 User Model', 2));
  children.push(p('The User model handles authentication and authorization. Passwords are hashed with bcrypt (12 salt rounds) before storage. The model includes methods for password comparison and JWT generation.'));
  children.push(makeTable(
    ['Field', 'Type', 'Constraints'],
    [
      ['name', 'String', 'required, maxlength 50, trimmed'],
      ['email', 'String', 'required, unique, lowercase, email regex'],
      ['password', 'String', 'required, minlength 6, select: false'],
      ['role', 'String', 'enum: user/admin, default: user'],
      ['avatar', 'String', 'default: empty string'],
      ['phone', 'String', 'default: empty string'],
      ['address', 'String', 'default: empty string'],
      ['resetPasswordToken', 'String', 'optional'],
      ['resetPasswordExpire', 'Date', 'optional'],
    ]
  ));
  children.push(p(bold('Key Methods:')));
  children.push(bullet('comparePassword(candidate): Compares plaintext to hashed password using bcrypt.compare'));
  children.push(bullet('generateToken(): Creates a JWT signed with { id, role } that expires in 7 days'));
  children.push(p(bold('Pre-save Hook:'), ' Hash password only if modified using bcrypt with 12 salt rounds.'));

  children.push(h('6.2 Blog Model', 2));
  children.push(p('The Blog model manages blog posts with automatic slug generation from the title.'));
  children.push(makeTable(
    ['Field', 'Type', 'Constraints'],
    [
      ['title', 'String', 'required, trimmed'],
      ['slug', 'String', 'unique, auto-generated'],
      ['content', 'String', 'required'],
      ['excerpt', 'String', 'required, maxlength 300'],
      ['author', 'String', 'default: Admin'],
      ['image', 'String', 'required'],
      ['tags', '[String]', 'array of string tags'],
      ['published', 'Boolean', 'default: false'],
      ['readTime', 'String', 'default: 5 min'],
    ]
  ));
  children.push(p(bold('Pre-save Hook:'), ' Converts title to URL-friendly slug (lowercased, spaces to hyphens, removes special chars). If slug collision detected on new documents, appends a timestamp for uniqueness.'));

  children.push(h('6.3 Product Model', 2));
  children.push(p('The Product model catalogs agricultural products available on the platform.'));
  children.push(makeTable(
    ['Field', 'Type', 'Constraints'],
    [
      ['name', 'String', 'required, trimmed'],
      ['price', 'Number', 'required, min 0'],
      ['category', 'String', 'required, enum: seeds/fertilizers/equipment/pesticides/organic/other'],
      ['description', 'String', 'required'],
      ['images', '[String]', 'array of image URLs'],
      ['stock', 'Number', 'required, min 0, default 0'],
      ['unit', 'String', 'default: kg'],
      ['ratings', 'Number', '0-5, default 0'],
      ['numReviews', 'Number', 'default 0'],
      ['featured', 'Boolean', 'default false'],
      ['status', 'String', 'enum: active/inactive, default active'],
    ]
  ));

  children.push(h('6.4 Crop Model', 2));
  children.push(p('The Crop model stores agricultural crop information with cultivation details.'));
  children.push(makeTable(
    ['Field', 'Type', 'Constraints'],
    [
      ['name', 'String', 'required, trimmed'],
      ['category', 'String', 'required, enum: cereals/vegetables/fruits/pulses/oilseeds/cash-crops'],
      ['description', 'String', 'required'],
      ['image', 'String', 'required'],
      ['season', 'String', 'required'],
      ['growingPeriod', 'String', 'default: empty'],
      ['soilType', 'String', 'default: empty'],
      ['waterRequirement', 'String', 'default: empty'],
      ['status', 'String', 'enum: active/inactive, default active'],
      ['featured', 'Boolean', 'default false'],
      ['order', 'Number', 'default 0'],
    ]
  ));

  children.push(h('6.5 Service Model', 2));
  children.push(p('The Service model defines the services offered by the platform.'));
  children.push(makeTable(
    ['Field', 'Type', 'Constraints'],
    [
      ['title', 'String', 'required, trimmed'],
      ['description', 'String', 'required'],
      ['icon', 'String', 'default: leaf'],
      ['image', 'String', 'default: empty'],
      ['features', '[String]', 'array of feature strings'],
      ['order', 'Number', 'default 0'],
      ['active', 'Boolean', 'default true'],
    ]
  ));

  children.push(h('6.6 Contact Model', 2));
  children.push(p('The Contact model stores user inquiries submitted through the contact form.'));
  children.push(makeTable(
    ['Field', 'Type', 'Constraints'],
    [
      ['name', 'String', 'required, trimmed'],
      ['email', 'String', 'required, lowercase'],
      ['subject', 'String', 'required'],
      ['message', 'String', 'required'],
      ['isRead', 'Boolean', 'default false'],
    ]
  ));

  children.push(h('6.7 FAQ Model', 2));
  children.push(p('The FAQ model manages frequently asked questions organized by category.'));
  children.push(makeTable(
    ['Field', 'Type', 'Constraints'],
    [
      ['question', 'String', 'required, trimmed'],
      ['answer', 'String', 'required'],
      ['category', 'String', 'enum: general/farming/products/services/shipping, default: general'],
      ['order', 'Number', 'default 0'],
      ['active', 'Boolean', 'default true'],
    ]
  ));

  children.push(h('6.8 Testimonial Model', 2));
  children.push(p('The Testimonial model stores user testimonials and reviews.'));
  children.push(makeTable(
    ['Field', 'Type', 'Constraints'],
    [
      ['name', 'String', 'required, trimmed'],
      ['role', 'String', 'default: Farmer'],
      ['content', 'String', 'required'],
      ['avatar', 'String', 'default: empty'],
      ['rating', 'Number', '1-5, default 5'],
      ['featured', 'Boolean', 'default false'],
      ['order', 'Number', 'default 0'],
    ]
  ));

  children.push(h('6.9 Analytics Model', 2));
  children.push(p('The Analytics model tracks page views for the analytics dashboard.'));
  children.push(makeTable(
    ['Field', 'Type', 'Constraints'],
    [
      ['page', 'String', 'required'],
      ['views', 'Number', 'default 0'],
      ['date', 'Date', 'default: now'],
      ['uniqueVisitors', 'Number', 'default 0'],
    ]
  ));
  children.push(p(bold('Index:'), ' Compound index on { page: 1, date: 1 } for efficient aggregation queries.'));

  children.push(pageBreak());

  // ===================== CHAPTER 7: API ROUTES & CONTROLLERS =====================
  children.push(h(`${sectionNumber(7)}Backend: API Routes & Controllers`, 1));
  children.push(spacer(100));

  children.push(h('7.1 Route Organization', 2));
  children.push(p('All routes are mounted under the /api prefix and organized into 11 route modules, each responsible for a specific resource. The main route aggregator (routes/index.js) combines all modules:'));
  children.push(codeBlock(`const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/crops', require('./crops'));
router.use('/products', require('./products'));
router.use('/blogs', require('./blogs'));
router.use('/contact', require('./contact'));
router.use('/testimonials', require('./testimonials'));
router.use('/faq', require('./faq'));
router.use('/services', require('./services'));
router.use('/users', require('./users'));
router.use('/upload', require('./upload'));
router.use('/analytics', require('./analytics'));

module.exports = router;`));

  children.push(h('7.2 Auth Routes (/api/auth)', 2));
  children.push(makeTable(
    ['Method', 'Path', 'Auth', 'Validation', 'Description'],
    [
      ['POST', '/api/auth/register', 'Public', 'name, email, password, confirmPassword', 'Register a new user'],
      ['POST', '/api/auth/login', 'Public', 'email, password', 'Login and get JWT token'],
      ['GET', '/api/auth/me', 'protect', '-', 'Get current user profile'],
      ['GET', '/api/auth/logout', 'Public', '-', 'Clear auth cookie and logout'],
      ['PUT', '/api/auth/password', 'protect', 'currentPassword, newPassword', 'Update password'],
      ['PUT', '/api/auth/profile', 'protect', '-', 'Update profile (name, phone, address)'],
    ]
  ));

  children.push(h('7.3 Auth Controller Logic', 2));
  children.push(p('The auth controller handles user registration, login, profile management, and token generation.'));
  children.push(p(bold('Registration Flow:'), ' Validates input, checks for duplicate email, creates user with hashed password, generates JWT, sets HTTP-only cookie, and returns token + user data.'));
  children.push(p(bold('Login Flow:'), ' Validates credentials, compares password hash, generates JWT, sets cookie, and returns token + user data.'));
  children.push(p(bold('Token Response:'), ' The sendTokenResponse function creates a JWT via user.generateToken(), sets it as an HTTP-only cookie (secure in production), and returns it in the JSON response body.'));

  children.push(h('7.4 Resource Routes (CRUD Pattern)', 2));
  children.push(p('The following resources follow a consistent CRUD pattern with public read access and admin-only write access:'));

  children.push(makeTable(
    ['Resource', 'GET /resource', 'GET /:id', 'POST', 'PUT /:id', 'DELETE /:id'],
    [
      ['/api/crops', 'Public (filtered)', 'Public', 'Admin', 'Admin', 'Admin'],
      ['/api/products', 'Public (filtered)', 'Public', 'Admin', 'Admin', 'Admin'],
      ['/api/blogs', 'Public (published)', 'Public (slug)', 'Admin', 'Admin', 'Admin'],
      ['/api/services', 'Public (active)', 'Public', 'Admin', 'Admin', 'Admin'],
      ['/api/faq', 'Public (active)', '-', 'Admin', 'Admin', 'Admin'],
      ['/api/testimonials', 'Public (featured)', '-', 'Admin', 'Admin', 'Admin'],
    ]
  ));

  children.push(h('7.5 Contact Routes', 2));
  children.push(makeTable(
    ['Method', 'Path', 'Auth', 'Description'],
    [
      ['POST', '/api/contact', 'Public', 'Submit contact inquiry'],
      ['GET', '/api/contact', 'Admin', 'List all inquiries (filter by read status)'],
      ['PUT', '/api/contact/:id/read', 'Admin', 'Mark inquiry as read'],
      ['DELETE', '/api/contact/:id', 'Admin', 'Delete inquiry'],
    ]
  ));

  children.push(h('7.6 User Management Routes', 2));
  children.push(makeTable(
    ['Method', 'Path', 'Auth', 'Description'],
    [
      ['GET', '/api/users', 'Admin', 'List all users with pagination'],
      ['PUT', '/api/users/:id/role', 'Admin', 'Update user role (user/admin)'],
      ['DELETE', '/api/users/:id', 'Admin', 'Delete user account'],
    ]
  ));

  children.push(h('7.7 Upload Routes', 2));
  children.push(makeTable(
    ['Method', 'Path', 'Auth', 'Description'],
    [
      ['POST', '/api/upload', 'Admin', 'Upload single image (max 5MB, jpeg/jpg/png/gif/webp/svg)'],
      ['POST', '/api/upload/multiple', 'Admin', 'Upload up to 10 images'],
    ]
  ));

  children.push(h('7.8 Analytics Routes', 2));
  children.push(makeTable(
    ['Method', 'Path', 'Auth', 'Description'],
    [
      ['GET', '/api/analytics/dashboard', 'Admin', 'Get 30-day page view aggregation'],
      ['POST', '/api/analytics/track', 'Public', 'Track a page view (upserts by page + date)'],
    ]
  ));

  children.push(h('7.9 Controller Pattern', 2));
  children.push(p('All controllers follow a consistent pattern using the catchAsync wrapper for error handling and the APIFeatures class for query operations. Each resource controller exports five standard methods:'));
  children.push(bullet('getAll: Fetch with filtering, search, sort, and pagination via APIFeatures'));
  children.push(bullet('getOne: Fetch by MongoDB ID with 404 handling'));
  children.push(bullet('create: Create document with Mongoose, return 201 status'));
  children.push(bullet('update: Find by ID and update with new: true and runValidators'));
  children.push(bullet('remove: Find by ID and delete with 404 handling'));
  children.push(p('Example controller pattern (cropController.js):'));
  children.push(codeBlock(`const Crop = require('../models/Crop');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAll = catchAsync(async (req, res) => {
  const features = new APIFeatures(Crop.find(), req.query)
    .filter().search(['name', 'description']).sort().paginate();
  const crops = await features.query;
  const total = await Crop.countDocuments();
  res.json({ success: true, count: crops.length, total, crops });
});

exports.getOne = catchAsync(async (req, res) => {
  const crop = await Crop.findById(req.params.id);
  if (!crop) throw new AppError('Crop not found', 404);
  res.json({ success: true, crop });
});

exports.create = catchAsync(async (req, res) => {
  const crop = await Crop.create(req.body);
  res.status(201).json({ success: true, crop });
});

exports.update = catchAsync(async (req, res) => {
  const crop = await Crop.findByIdAndUpdate(req.params.id, req.body,
    { new: true, runValidators: true });
  if (!crop) throw new AppError('Crop not found', 404);
  res.json({ success: true, crop });
});

exports.remove = catchAsync(async (req, res) => {
  const crop = await Crop.findByIdAndDelete(req.params.id);
  if (!crop) throw new AppError('Crop not found', 404);
  res.json({ success: true, message: 'Crop deleted' });
});`));

  children.push(pageBreak());

  // ===================== CHAPTER 8: MIDDLEWARE & UTILITIES =====================
  children.push(h(`${sectionNumber(8)}Backend: Middleware & Utilities`, 1));
  children.push(spacer(100));

  children.push(h('8.1 Authentication Middleware (middleware/auth.js)', 2));
  children.push(p('Two middleware functions control access to protected routes:'));
  children.push(p(bold('protect middleware:'), ' Extracts JWT from the Authorization header (Bearer token) or from the token cookie. Verifies the token using jwt.verify with JWT_SECRET. Loads the user from the database and attaches it to req.user. Returns 401 if token is missing, invalid, or user not found.'));
  children.push(p(bold('admin middleware:'), ' Checks if req.user.role equals "admin". Returns 403 Forbidden if the user is not an admin.'));
  children.push(codeBlock(`const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }
    if (!token) return next(new AppError('Not authorized', 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return next(new AppError('User not found', 401));
    next();
  } catch (err) {
    next(new AppError('Not authorized', 401));
  }
};

exports.admin = (req, res, next) => {
  if (req.user?.role !== 'admin')
    return next(new AppError('Admin access required', 403));
  next();
};`));

  children.push(h('8.2 Error Handler Middleware (middleware/errorHandler.js)', 2));
  children.push(p('The global error handler catches all errors thrown by route handlers and middleware, normalizes them into a consistent JSON response format.'));
  children.push(codeBlock(`const errorHandler = (err, req, res, next) => {
  console.error(err);
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value';
  }
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Resource not found';
  }
  if (err.name === 'MulterError') {
    statusCode = 400;
    message = err.message;
  }

  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;`));
  children.push(p('Error handling covers five categories:'));
  children.push(bullet('ValidationError (400): Mongoose validation errors, extracts field-level messages'));
  children.push(bullet('Duplicate Key 11000 (400): MongoDB unique index violations'));
  children.push(bullet('CastError (400): Invalid MongoDB ObjectId format'));
  children.push(bullet('MulterError (400): File upload errors (size, type)'));
  children.push(bullet('Generic (500): Unexpected errors with stack trace logged to console'));

  children.push(h('8.3 Validation Middleware (middleware/validate.js)', 2));
  children.push(p('Wraps express-validator validation results and returns structured 400 responses when validation fails.'));
  children.push(codeBlock(`const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(e => e.msg)
    });
  }
  next();
};

module.exports = validate;`));

  children.push(h('8.4 APIFeatures Utility (utils/apiFeatures.js)', 2));
  children.push(p('The APIFeatures class is a reusable query builder that provides consistent filtering, searching, sorting, and pagination across all resource controllers. It is initialized with a Mongoose query object and the Express request query string.'));
  children.push(codeBlock(`class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excluded = ['page', 'sort', 'limit', 'fields', 'search'];
    excluded.forEach(e => delete queryObj[e]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\\b(gte|gt|lte|lt)\\b/g, m => \`$\${m}\`
    );
    try {
      this.query = this.query.find(JSON.parse(queryStr));
    } catch {
      this.query = this.query.find({});
    }
    return this;
  }

  search(fields) {
    if (this.queryString.search) {
      const regex = new RegExp(this.queryString.search, 'i');
      this.query = this.query.find({
        $or: fields.map(f => ({ [f]: regex }))
      });
    }
    return this;
  }

  sort() {
    this.query = this.query.sort(
      this.queryString.sort || '-createdAt'
    );
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;`));
  children.push(p(bold('Features:')));
  children.push(bullet('filter(): Excludes pagination/sort/search params, converts MongoDB operators ($gte, $gt, $lte, $lt)'));
  children.push(bullet('search(fields): Case-insensitive regex search across specified fields'));
  children.push(bullet('sort(): Multi-field sorting (default: -createdAt for newest first)'));
  children.push(bullet('paginate(): Skip/limit pagination (default 20 items per page)'));

  children.push(h('8.5 Other Utilities', 2));
  children.push(p(bold('AppError (utils/AppError.js):'), ' Custom error class extending Error with statusCode and isOperational flag to distinguish expected errors from programming bugs.'));
  children.push(codeBlock(`class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}`));
  children.push(p(bold('catchAsync (utils/catchAsync.js):'), ' Wraps async route handlers to automatically catch rejected promises and forward errors to the error handler middleware.'));
  children.push(codeBlock(`module.exports = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);`));
  children.push(p(bold('File Upload (utils/upload.js):'), ' Multer configuration for disk storage. Files are saved to the uploads/ directory with timestamped filenames. Allowed types: jpeg, jpg, png, gif, webp, svg. Maximum file size: 5MB.'));
  children.push(codeBlock(`const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, \`\${Date.now()}-\${Math.round(Math.random() * 1E9)}\${path.extname(file.originalname)}\`),
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|svg/;
  if (allowed.test(path.extname(file.originalname).toLowerCase())
      && allowed.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files allowed'), false);
  }
};

const upload = multer({
  storage, fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;`));

  children.push(pageBreak());

  // ===================== CHAPTER 9: FRONTEND STRUCTURE =====================
  children.push(h(`${sectionNumber(9)}Frontend: Project Structure & Entry Points`, 1));
  children.push(spacer(100));

  children.push(h('9.1 Frontend Overview', 2));
  children.push(p('The frontend is a React 18 single-page application built with Vite 5. It uses Tailwind CSS for styling with a custom agriculture-themed color palette, Framer Motion for animations, and React Router v6 for client-side routing. All pages are lazy-loaded for optimal performance.'));

  children.push(h('9.2 Entry Points', 2));
  children.push(p(bold('index.html:'), ' The HTML entry point located in the frontend root. It includes Google Fonts (Inter + Playfair Display) and a div#root mount point.'));
  children.push(p(bold('main.jsx:'), ' The JavaScript entry point that renders the App component inside React.StrictMode.'));
  children.push(codeBlock(`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/animations.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`));

  children.push(h('9.3 App Component (App.jsx)', 2));
  children.push(p('The root App component orchestrates the entire application. It initializes smooth scrolling, shows a loading splash screen, and wraps the application in providers and routing.'));
  children.push(codeBlock(`export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  useSmoothScroll();

  if (showLoader) return <Loader onComplete={() => setShowLoader(false)} />;

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Cursor />
              <Navbar />
              <main>
                <AnimatedRoutes />
              </main>
              <Footer />
            </BrowserRouter>
          </AppProvider>
        </AuthProvider>
      </HelmetProvider>
    </HelmetProvider>
  );
}`));

  children.push(p('The component hierarchy is:'));
  children.push(bullet('HelmetProvider: SEO meta tag management via react-helmet-async'));
  children.push(bullet('ThemeProvider: Dark/light theme context'));
  children.push(bullet('AuthProvider: User authentication context'));
  children.push(bullet('AppProvider: Global loading and notification context'));
  children.push(bullet('BrowserRouter: Client-side routing'));
  children.push(bullet('ScrollToTop: Automatic scroll reset on route change'));
  children.push(bullet('Cursor: Custom animated cursor (desktop only)'));
  children.push(bullet('Navbar: Persistent navigation bar'));
  children.push(bullet('AnimatedRoutes: Lazy-loaded page components with page transitions'));
  children.push(bullet('Footer: Persistent footer'));

  children.push(h('9.4 Lazy-Loaded Pages', 2));
  children.push(p('All page components are lazy-loaded with React.lazy() and Suspense for code splitting:'));
  children.push(makeTable(
    ['Import', 'Route Path', 'Component'],
    [
      ['Home', '/', 'Landing page with 10 sections'],
      ['About', '/about', 'Company info and timeline'],
      ['Blog', '/blog', 'Blog post listing'],
      ['BlogPost', '/blog/:slug', 'Single blog post'],
      ['Gallery', '/gallery', 'Photo gallery with lightbox'],
      ['Contact', '/contact', 'Contact form and map'],
      ['Products', '/products', 'Product catalog'],
      ['FAQ', '/faq', 'Accordion FAQ'],
      ['Login', '/login', 'Login form'],
      ['Register', '/register', 'Registration form'],
      ['Profile', '/profile', 'User profile'],
      ['Admin', '/admin/*', 'Admin panel (protected)'],
      ['NotFound', '*', '404 page'],
    ]
  ));

  children.push(h('9.5 Vite Configuration', 2));
  children.push(p('The Vite configuration includes React plugin, proxy settings for development, and manual chunk splitting for optimized production builds.'));
  children.push(codeBlock(`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:5000', changeOrigin: true },
      '/uploads': { target: 'http://localhost:5000', changeOrigin: true },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animation: ['framer-motion'],
        },
      },
    },
  },
});`));

  children.push(pageBreak());

  // ===================== CHAPTER 10: CONTEXT PROVIDERS =====================
  children.push(h(`${sectionNumber(10)}Frontend: Context Providers & State Management`, 1));
  children.push(spacer(100));

  children.push(h('10.1 State Management Architecture', 2));
  children.push(p('GreenHarvest uses React Context API for state management instead of external libraries like Redux. Three context providers are nested in a specific order, each handling a distinct domain of application state.'));

  children.push(h('10.2 ThemeContext (context/ThemeContext.jsx)', 2));
  children.push(p('The ThemeContext manages dark/light theme toggling with system preference detection and localStorage persistence.'));
  children.push(bullet('Initialization: Checks localStorage for saved theme, falls back to system preference via matchMedia'));
  children.push(bullet('Persistence: Theme is saved to localStorage on every change'));
  children.push(bullet('DOM Updates: Adds/removes dark class on documentElement (Tailwind darkMode: class strategy)'));
  children.push(bullet('Exposed values: theme ("dark" | "light"), toggleTheme function'));
  children.push(codeBlock(`export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`));

  children.push(h('10.3 AuthContext (context/AuthContext.jsx)', 2));
  children.push(p('The AuthContext manages user authentication state, including login, registration, logout, and session restoration.'));
  children.push(bullet('Session Restore: On mount, checks localStorage for existing token and validates it via GET /api/auth/me'));
  children.push(bullet('Login: Sends credentials to POST /api/auth/login, stores JWT in localStorage, sets user state'));
  children.push(bullet('Registration: Sends user details to POST /api/auth/register, stores JWT, sets user state'));
  children.push(bullet('Logout: Calls GET /api/auth/logout to clear cookie, removes token from localStorage, clears user state'));
  children.push(bullet('isAdmin: Derived boolean from user?.role === "admin"'));
  children.push(codeBlock(`export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then(({ data }) => { if (data.success) setUser(data.user); })
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.success) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
    }
    return data;
  }, []);

  const register = useCallback(async (name, email, password, confirmPassword) => {
    const { data } = await api.post('/auth/register', { name, email, password, confirmPassword });
    if (data.success) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
    }
    return data;
  }, []);

  const logout = useCallback(async () => {
    try { await api.get('/auth/logout'); } catch {}
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}`));

  children.push(h('10.4 AppContext (context/AppContext.jsx)', 2));
  children.push(p('The AppContext manages global UI state including a loading indicator and toast notifications.'));
  children.push(bullet('loading: Boolean state for global loading overlay'));
  children.push(bullet('notification: Object with message and type (success/error/info)'));
  children.push(bullet('showNotification: Function that sets notification with auto-dismiss after 4 seconds'));
  children.push(codeBlock(`export function AppProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <AppContext.Provider value={{ loading, setLoading, notification, showNotification }}>
      {children}
    </AppContext.Provider>
  );
}`));

  children.push(pageBreak());

  // ===================== CHAPTER 11: ROUTING & PAGES =====================
  children.push(h(`${sectionNumber(11)}Frontend: Routing & Page Components`, 1));
  children.push(spacer(100));

  children.push(h('11.1 Routing Architecture', 2));
  children.push(p('GreenHarvest uses React Router v6 with BrowserRouter for client-side routing. The AnimatedRoutes component wraps all routes with Framer Motion\'s AnimatePresence for smooth page transitions. All page components are lazy-loaded using React.lazy() for code splitting.'));

  children.push(h('11.2 Home Page (pages/Home.jsx)', 2));
  children.push(p('The home page is the most complex page, composed of 10 sections arranged vertically. Each section is a separate component with Framer Motion scroll-triggered animations.'));
  children.push(bullet('Hero.jsx: Full-screen hero with word-level text reveal animation, gradient overlay, and dual CTAs'));
  children.push(bullet('FeaturedCrops.jsx: Horizontal crop carousel with thumbnail navigation and auto-play'));
  children.push(bullet('Services.jsx: 6-card grid with 3D hover transforms and staggered entrance animations'));
  children.push(bullet('Statistics.jsx: Animated counter section (Years Experience, Partner Farms, Crop Varieties, Countries Served)'));
  children.push(bullet('Sustainability.jsx: Split layout with sustainability initiatives and icon grid'));
  children.push(bullet('Testimonials.jsx: Auto-rotating testimonial slider with 5-second intervals'));
  children.push(bullet('ProductsShowcase.jsx: Filtered product grid with category tabs and hover effects'));
  children.push(bullet('SuccessStories.jsx: Farmer success story cards with imagery'));
  children.push(bullet('BlogSection.jsx: 3 latest blog post previews with images and read times'));
  children.push(bullet('Newsletter.jsx: Email subscription section with input and submit button'));

  children.push(h('11.3 About Page (pages/About.jsx)', 2));
  children.push(p('The About page presents company information including:'));
  children.push(bullet('Mission and vision statements with animated reveal'));
  children.push(bullet('Company history timeline'));
  children.push(bullet('Key statistics and achievements'));
  children.push(bullet('Team section with member cards'));
  children.push(bullet('Call-to-action section'));
  children.push(p('Each section uses the useScrollAnimation hook for intersection-based reveal animations.'));

  children.push(h('11.4 Products Page (pages/Products.jsx)', 2));
  children.push(p('The Products page displays the product catalog with:'));
  children.push(bullet('Category filter buttons (All, Seeds, Fertilizers, Equipment, Pesticides, Organic, Other)'));
  children.push(bullet('Product cards with image, name, category badge, price, stock status, and ratings'));
  children.push(bullet('Animated grid layout with staggered card entrance'));
  children.push(bullet('Fallback data when API is unavailable'));
  children.push(p('Data is fetched from GET /api/products with optional category query parameter.'));

  children.push(h('11.5 Blog & BlogPost Pages', 2));
  children.push(p(bold('Blog Listing (pages/Blog.jsx):'), ' Displays all published blog posts in a card grid. Includes search functionality, author info, read time estimates, tags, and publish dates. Posts link to individual post pages.'));
  children.push(p(bold('Blog Post (pages/BlogPost.jsx):'), ' Displays a single blog post by URL slug. Fetches data from GET /api/blogs/slug/:slug. Shows full content, author, tags, and published date. Includes a back button and related posts section.'));

  children.push(h('11.6 Gallery Page (pages/Gallery.jsx)', 2));
  children.push(p('The Gallery page presents a categorized photo gallery with:'));
  children.push(bullet('Category filter tabs (All, Crops, Farming, Equipment, Organic)'));
  children.push(bullet('Responsive masonry-style grid of images'));
  children.push(bullet('Fullscreen lightbox modal on image click'));
  children.push(bullet('Framer Motion AnimatePresence for smooth transitions'));

  children.push(h('11.7 Contact Page (pages/Contact.jsx)', 2));
  children.push(p('The Contact page includes:'));
  children.push(bullet('Contact form with name, email, subject, and message fields with validation'));
  children.push(bullet('Google Maps embed iframe'));
  children.push(bullet('Contact information cards (address, phone, email, hours)'));
  children.push(bullet('Success/error toast notifications via AppContext'));

  children.push(h('11.8 FAQ Page (pages/FAQ.jsx)', 2));
  children.push(p('The FAQ page displays frequently asked questions in an accordion format:'));
  children.push(bullet('Category filter tabs (General, Farming, Products, Services, Shipping)'));
  children.push(bullet('Animated expand/collapse with Framer Motion'));
  children.push(bullet('Active/Inactive item tracking'));
  children.push(bullet('Fallback data when API is unavailable'));

  children.push(h('11.9 Auth Pages (Login & Register)', 2));
  children.push(p(bold('Login (pages/Login.jsx):'), ' Email and password form with validation, loading state, error display, and link to registration.'));
  children.push(p(bold('Register (pages/Register.jsx):'), ' Name, email, password, and confirm password form with validation (password match check, min length 6).'));

  children.push(h('11.10 Profile Page (pages/Profile.jsx)', 2));
  children.push(p('Displays user profile information including name, email, role, avatar, and account creation date. Protected route - redirects to login if not authenticated.'));

  children.push(h('11.11 NotFound Page', 2));
  children.push(p('A styled 404 page with animated text, an illustration, a helpful message, and a button to return home.'));

  children.push(pageBreak());

  // ===================== CHAPTER 12: COMPONENTS & HOOKS =====================
  children.push(h(`${sectionNumber(12)}Frontend: Common Components & Custom Hooks`, 1));
  children.push(spacer(100));

  children.push(h('12.1 Common Components', 2));
  children.push(p('The frontend includes a library of reusable common components in src/components/common/:'));
  children.push(spacer(60));

  children.push(p(bold('Navbar.jsx:'), ' A sticky, glass-morphism navigation bar with:'));
  children.push(bullet('Logo with company name'));
  children.push(bullet('Desktop navigation links from NAV_LINKS constant'));
  children.push(bullet('Mobile hamburger menu with slide-out drawer'));
  children.push(bullet('Theme toggle button'));
  children.push(bullet('Login/Profile/Logout buttons based on auth state'));
  children.push(bullet('Admin link visible to admin users'));
  children.push(bullet('Scroll-based shadow effect'));

  children.push(p(bold('Footer.jsx:'), ' A multi-column footer with:'));
  children.push(bullet('Company description and logo'));
  children.push(bullet('Quick links to main pages'));
  children.push(bullet('Services links'));
  children.push(bullet('Contact information'));
  children.push(bullet('Social media icon links'));
  children.push(bullet('Copyright notice with current year'));

  children.push(p(bold('Button.jsx:'), ' A multi-variant animated button component supporting:'));
  children.push(bullet('Variants: primary, secondary, outline, ghost'));
  children.push(bullet('Sizes: sm, md, lg'));
  children.push(bullet('Loading state with spinner'));
  children.push(bullet('Framer Motion hover/tap animations'));
  children.push(bullet('Icon support (left/right placement)'));

  children.push(p(bold('GlassCard.jsx:'), ' A glass-morphism card component with backdrop blur, semi-transparent background, optional hover lift effect, and customizable padding.'));

  children.push(p(bold('SectionTitle.jsx:'), ' An animated section header component with:'));
  children.push(bullet('Optional subtitle with decorative line'));
  children.push(bullet('Framer Motion fade-in-up animation'));
  children.push(bullet('Configurable alignment (left/center/right)'));
  children.push(bullet('Gradient text support'));

  children.push(p(bold('Loader.jsx:'), ' An animated SVG splash loader shown on initial app load. Contains an animated leaf/agriculture-themed SVG and a completion callback.'));

  children.push(p(bold('Cursor.jsx:'), ' A custom cursor with spring-physics animation using Framer Motion. Only visible on desktop (pointer: fine). Follows mouse position with smooth interpolation.'));

  children.push(p(bold('ScrollToTop.jsx:'), ' Automatically scrolls to top on route change using useLocation. Also provides a floating scroll-to-top button that appears after scrolling down.'));

  children.push(p(bold('ThemeToggle.jsx:'), ' A toggle switch for dark/light theme with sun/moon icons and smooth transition.'));

  children.push(p(bold('AnimatedCounter.jsx:'), ' A count-up numerical display that animates from 0 to a target value using the useCountUp hook. Triggers on scroll intersection.'));

  children.push(p(bold('FloatingElements.jsx:'), ' Decorative animated background particles (circles, leaves) that float with CSS animations for visual ambiance.'));

  children.push(h('12.2 Custom Hooks', 2));
  children.push(p(bold('useSmoothScroll (hooks/useSmoothScroll.js):'), ' Initializes the Lenis smooth scrolling engine. Provides butter-smooth scrolling with configurable duration and easing.'));
  children.push(p(bold('useScrollAnimation (hooks/useScrollAnimation.js):'), ' Uses IntersectionObserver to detect element visibility. Adds a "visible" class when elements enter the viewport, triggering CSS reveal animations with configurable threshold and root margin.'));
  children.push(p(bold('useParallax (hooks/useParallax.js):'), ' Creates scroll-based parallax transform effects by tracking scroll position and applying translated Y values to elements.'));
  children.push(p(bold('useCountUp (hooks/useCountUp.js):'), ' Animates a number from 0 to a target value using requestAnimationFrame with easing. Starts animation when the element becomes visible via IntersectionObserver.'));

  children.push(h('12.3 Animation System', 2));
  children.push(p('The animation system is spread across three files:'));
  children.push(p(bold('animations/pageTransitions.js:'), ' Defines page-level enter and exit variants for AnimatePresence. Includes fadeInUp, fadeInDown, fadeInLeft, fadeInRight, and fadeInScale variants.'));
  children.push(p(bold('animations/textReveal.js:'), ' Provides word-level, letter-level, and character-level text reveal animations with staggered children.'));
  children.push(p(bold('animations/staggerReveal.js:'), ' Defines container and item variants for staggered fade-in animations. Used for lists and grids.'));

  children.push(pageBreak());

  // ===================== CHAPTER 13: ADMIN PANEL =====================
  children.push(h(`${sectionNumber(13)}Frontend: Admin Panel`, 1));
  children.push(spacer(100));

  children.push(h('13.1 Admin Panel Overview', 2));
  children.push(p('The admin panel is a protected section of the application accessible only to users with the admin role. It provides a complete content management interface for all platform resources. The panel is route-guarded: non-admin users are redirected to the home page.'));

  children.push(h('13.2 Admin Panel Structure', 2));
  children.push(p('The admin panel is implemented as a single page component (pages/Admin.jsx) with nested sub-routes. The layout includes a sidebar navigation and a content area:'));
  children.push(codeBlock(`// Admin.jsx - Simplified structure
<Routes>
  <Route index element={<Dashboard />} />
  <Route path="crops" element={<ManageCrops />} />
  <Route path="products" element={<ManageProducts />} />
  <Route path="blogs" element={<ManageBlogs />} />
  <Route path="users" element={<ManageUsers />} />
  <Route path="inquiries" element={<ManageInquiries />} />
  <Route path="analytics" element={<Analytics />} />
</Routes>`));

  children.push(h('13.3 Admin Sub-Routes', 2));
  children.push(makeTable(
    ['Path', 'Component', 'Description'],
    [
      ['/admin', 'Dashboard', 'Overview stats and quick action buttons'],
      ['/admin/crops', 'ManageCrops', 'CRUD table for crop management'],
      ['/admin/products', 'ManageProducts', 'CRUD table for product management'],
      ['/admin/blogs', 'ManageBlogs', 'CRUD table for blog posts'],
      ['/admin/users', 'ManageUsers', 'User list with role toggles'],
      ['/admin/inquiries', 'ManageInquiries', 'Contact form submissions with read status'],
      ['/admin/analytics', 'Analytics', 'Page view analytics dashboard'],
    ]
  ));

  children.push(h('13.4 Admin Components', 2));

  children.push(p(bold('Sidebar.jsx:'), ' Navigation sidebar with:'));
  children.push(bullet('Dashboard link'));
  children.push(bullet('Resource management links (Crops, Products, Blogs)'));
  children.push(bullet('User management link'));
  children.push(bullet('Inquiries link'));
  children.push(bullet('Analytics link'));
  children.push(bullet('Active state highlighting based on current route'));
  children.push(bullet('Collapsible on mobile'));

  children.push(p(bold('Dashboard.jsx:'), ' Admin dashboard overview showing:'));
  children.push(bullet('Summary cards: Total Users, Total Blogs, Total Products, Total Inquiries'));
  children.push(bullet('Quick action buttons to manage each resource'));
  children.push(bullet('Data fetched from respective API endpoints'));

  children.push(p(bold('ManageCrops.jsx / ManageProducts.jsx / ManageBlogs.jsx:'), ' CRUD management interfaces with:'));
  children.push(bullet('Data table displaying all items with key fields'));
  children.push(bullet('Add New button to open creation form modal'));
  children.push(bullet('Edit button to open pre-filled update form modal'));
  children.push(bullet('Delete button with confirmation'));
  children.push(bullet('Toggle switches for boolean fields (featured, published, status)'));
  children.push(bullet('Status/featured badges with color coding'));

  children.push(p(bold('ManageUsers.jsx:'), ' User management interface with:'));
  children.push(bullet('User list table (name, email, role, created date)'));
  children.push(bullet('Role toggle buttons (user <-> admin)'));
  children.push(bullet('Delete user capability'));

  children.push(p(bold('ManageInquiries.jsx:'), ' Contact inquiry management with:'));
  children.push(bullet('Inquiry list table (name, email, subject, date, read status)'));
  children.push(bullet('Mark as read/unread toggle'));
  children.push(bullet('Click to expand full message'));
  children.push(bullet('Delete inquiry option'));

  children.push(p(bold('Analytics.jsx:'), ' Page view analytics dashboard with:'));
  children.push(bullet('Total views counter (30-day period)'));
  children.push(bullet('Per-page views breakdown with visual bars'));
  children.push(bullet('Daily views trend data'));
  children.push(bullet('Data aggregated via MongoDB aggregation pipeline'));

  children.push(pageBreak());

  // ===================== CHAPTER 14: ANIMATIONS & THEMING =====================
  children.push(h(`${sectionNumber(14)}Frontend: Animations & Theming System`, 1));
  children.push(spacer(100));

  children.push(h('14.1 Tailwind Theme Configuration', 2));
  children.push(p('The Tailwind configuration (tailwind.config.js) extends the default theme with agriculture-inspired colors, custom fonts, and custom animations. Dark mode is enabled via the "class" strategy.'));
  children.push(p(bold('Color Palette:')));
  children.push(makeTable(
    ['Token', 'Primary Usage', 'Primary Color (500)'],
    [
      ['earth', 'Text, backgrounds, neutral elements', '#8B7355'],
      ['leaf', 'Primary actions, success states, links', '#4CAF50'],
      ['sprout', 'Dark mode accents, deep greens', '#2E7D32'],
      ['sunset', 'Highlights, warnings, CTAs', '#FF8C00'],
      ['cream', 'Light backgrounds, cards', '#F5F5DC'],
    ]
  ));
  children.push(p(bold('Fonts:')));
  children.push(bullet('Inter (sans-serif): Primary font for body text and UI elements'));
  children.push(bullet('Playfair Display (serif): Headings and display text'));
  children.push(p(bold('Custom Animations:'), ' gradient (8s), float (6s), pulse-slow (4s), shimmer (2s), spin-slow (8s), bounce-gentle (2s).'));

  children.push(h('14.2 CSS Animation System', 2));
  children.push(p('The file src/styles/animations.css defines CSS classes for scroll-triggered reveals:'));
  children.push(codeBlock(`.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-left { ... }  /* translateX(-30px) -> translateX(0) */
.reveal-right { ... } /* translateX(30px) -> translateX(0) */
.reveal-scale { ... } /* scale(0.95) -> scale(1) */

.glass {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.gradient-text {
  background: linear-gradient(135deg, #4CAF50, #FF8C00);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 8s ease infinite;
}

@media (prefers-reduced-motion) {
  .reveal, .reveal-left, .reveal-right, .reveal-scale {
    opacity: 1; transform: none;
  }
}`));

  children.push(h('14.3 Framer Motion Animations', 2));
  children.push(p('Framer Motion is used throughout the application for:'));
  children.push(p(bold('Page Transitions:'), ' AnimatePresence wraps the Routes component. Each page has a motion.div wrapper with enter/exit animations. The pageTransitions.js file defines variants such as fadeInUp, fadeInLeft, fadeInRight, and fadeInScale.'));
  children.push(p(bold('Component Entrance:'), ' Sections and cards use motion.div with viewport-triggered animations (whileInView, initial, transition props).'));
  children.push(p(bold('Hover Effects:'), ' Buttons, cards, and service items use whileHover for subtle lifts, scale changes, and shadow adjustments.'));
  children.push(p(bold('Text Reveal:'), ' The textReveal.js file exports word, letter, and character reveal animation variants for dramatic text entries.'));

  children.push(h('14.4 Dark Mode Implementation', 2));
  children.push(p('Dark mode is implemented using Tailwind\'s "class" strategy:'));
  children.push(bullet('The ThemeContext manages a "dark" class on the <html> element'));
  children.push(bullet('Tailwind styles use dark: prefix for dark mode overrides'));
  children.push(bullet('System preference is detected on initial load via matchMedia'));
  children.push(bullet('User preference is persisted to localStorage'));
  children.push(bullet('The ThemeToggle component provides a sun/moon toggle switch'));

  children.push(pageBreak());

  // ===================== CHAPTER 15: FULL API REFERENCE =====================
  children.push(h(`${sectionNumber(15)}Full API Reference`, 1));
  children.push(spacer(100));

  children.push(p('This chapter provides a complete reference for all 33 API endpoints organized by resource. All endpoints return JSON responses with the format { success: true/false, ...data }. Errors return { success: false, message: "error description" }.'));

  children.push(h('15.1 Authentication Endpoints', 2));
  children.push(makeTable(
    ['Method', 'Endpoint', 'Auth', 'Request Body', 'Response'],
    [
      ['POST', '/api/auth/register', 'None', '{name, email, password, confirmPassword}', '{success, token, user}'],
      ['POST', '/api/auth/login', 'None', '{email, password}', '{success, token, user}'],
      ['GET', '/api/auth/me', 'JWT', '-', '{success, user}'],
      ['GET', '/api/auth/logout', 'None', '-', '{success, message}'],
      ['PUT', '/api/auth/password', 'JWT', '{currentPassword, newPassword}', '{success, token, user}'],
      ['PUT', '/api/auth/profile', 'JWT', '{name?, phone?, address?}', '{success, user}'],
    ]
  ));

  children.push(h('15.2 Crop Endpoints', 2));
  children.push(makeTable(
    ['Method', 'Endpoint', 'Auth', 'Query Params', 'Description'],
    [
      ['GET', '/api/crops', 'None', 'search, sort, page, limit, category, status, featured', 'List crops with filters'],
      ['GET', '/api/crops/:id', 'None', '-', 'Get single crop by ID'],
      ['POST', '/api/crops', 'Admin', '-', 'Create new crop'],
      ['PUT', '/api/crops/:id', 'Admin', '-', 'Update crop by ID'],
      ['DELETE', '/api/crops/:id', 'Admin', '-', 'Delete crop by ID'],
    ]
  ));

  children.push(h('15.3 Product Endpoints', 2));
  children.push(makeTable(
    ['Method', 'Endpoint', 'Auth', 'Query Params', 'Description'],
    [
      ['GET', '/api/products', 'None', 'search, sort, page, limit, category, status, featured', 'List products with filters'],
      ['GET', '/api/products/:id', 'None', '-', 'Get single product by ID'],
      ['POST', '/api/products', 'Admin', '-', 'Create new product'],
      ['PUT', '/api/products/:id', 'Admin', '-', 'Update product by ID'],
      ['DELETE', '/api/products/:id', 'Admin', '-', 'Delete product by ID'],
    ]
  ));

  children.push(h('15.4 Blog Endpoints', 2));
  children.push(makeTable(
    ['Method', 'Endpoint', 'Auth', 'Description'],
    [
      ['GET', '/api/blogs', 'None', 'List published blogs (filter: ?published=true/false, search, sort, page, limit)'],
      ['GET', '/api/blogs/slug/:slug', 'None', 'Get blog by URL slug'],
      ['GET', '/api/blogs/:id', 'None', 'Get blog by MongoDB ID'],
      ['POST', '/api/blogs', 'Admin', 'Create new blog post'],
      ['PUT', '/api/blogs/:id', 'Admin', 'Update blog post'],
      ['DELETE', '/api/blogs/:id', 'Admin', 'Delete blog post'],
    ]
  ));

  children.push(h('15.5 Service Endpoints', 2));
  children.push(makeTable(
    ['Method', 'Endpoint', 'Auth', 'Description'],
    [
      ['GET', '/api/services', 'None', 'List active services sorted by order'],
      ['GET', '/api/services/:id', 'None', 'Get single service'],
      ['POST', '/api/services', 'Admin', 'Create new service'],
      ['PUT', '/api/services/:id', 'Admin', 'Update service'],
      ['DELETE', '/api/services/:id', 'Admin', 'Delete service'],
    ]
  ));

  children.push(h('15.6 Contact Endpoints', 2));
  children.push(makeTable(
    ['Method', 'Endpoint', 'Auth', 'Description'],
    [
      ['POST', '/api/contact', 'None', 'Submit contact inquiry'],
      ['GET', '/api/contact', 'Admin', 'List inquiries (?read=true/false)'],
      ['PUT', '/api/contact/:id/read', 'Admin', 'Mark inquiry as read'],
      ['DELETE', '/api/contact/:id', 'Admin', 'Delete inquiry'],
    ]
  ));

  children.push(h('15.7 FAQ Endpoints', 2));
  children.push(makeTable(
    ['Method', 'Endpoint', 'Auth', 'Description'],
    [
      ['GET', '/api/faq', 'None', 'List active FAQs (?all=true for all)'],
      ['POST', '/api/faq', 'Admin', 'Create new FAQ'],
      ['PUT', '/api/faq/:id', 'Admin', 'Update FAQ'],
      ['DELETE', '/api/faq/:id', 'Admin', 'Delete FAQ'],
    ]
  ));

  children.push(h('15.8 Testimonial Endpoints', 2));
  children.push(makeTable(
    ['Method', 'Endpoint', 'Auth', 'Description'],
    [
      ['GET', '/api/testimonials', 'None', 'List featured testimonials (?all=true for all)'],
      ['POST', '/api/testimonials', 'Admin', 'Create new testimonial'],
      ['PUT', '/api/testimonials/:id', 'Admin', 'Update testimonial'],
      ['DELETE', '/api/testimonials/:id', 'Admin', 'Delete testimonial'],
    ]
  ));

  children.push(h('15.9 User Endpoints', 2));
  children.push(makeTable(
    ['Method', 'Endpoint', 'Auth', 'Description'],
    [
      ['GET', '/api/users', 'Admin', 'List all users with pagination'],
      ['PUT', '/api/users/:id/role', 'Admin', 'Update user role'],
      ['DELETE', '/api/users/:id', 'Admin', 'Delete user'],
    ]
  ));

  children.push(h('15.10 Upload Endpoints', 2));
  children.push(makeTable(
    ['Method', 'Endpoint', 'Auth', 'Content-Type', 'Description'],
    [
      ['POST', '/api/upload', 'Admin', 'multipart/form-data', 'Upload single image (field: "image")'],
      ['POST', '/api/upload/multiple', 'Admin', 'multipart/form-data', 'Upload up to 10 images (field: "images")'],
    ]
  ));

  children.push(h('15.11 Analytics Endpoints', 2));
  children.push(makeTable(
    ['Method', 'Endpoint', 'Auth', 'Description'],
    [
      ['GET', '/api/analytics/dashboard', 'Admin', 'Get 30-day analytics (page views, daily breakdown)'],
      ['POST', '/api/analytics/track', 'None', 'Track page view ({page: string})'],
    ]
  ));

  children.push(pageBreak());

  // ===================== CHAPTER 16: AUTHENTICATION FLOW =====================
  children.push(h(`${sectionNumber(16)}Authentication & Authorization Flow`, 1));
  children.push(spacer(100));

  children.push(h('16.1 Authentication Architecture', 2));
  children.push(p('GreenHarvest uses JWT (JSON Web Token) based authentication with HTTP-only cookies and localStorage token storage. The authentication system is designed to provide secure, stateless authentication suitable for RESTful APIs.'));

  children.push(h('16.2 Registration Flow', 2));
  children.push(p('The registration process follows these steps:'));
  children.push(p(bold('1. Form Submission:'), ' User submits name, email, password, and confirmPassword from the React registration form.'));
  children.push(p(bold('2. Frontend Validation:'), ' The form validates email format, password length (min 6), and password match.'));
  children.push(p(bold('3. API Request:'), ' Axios sends a POST request to /api/auth/register with the form data.'));
  children.push(p(bold('4. Backend Validation:'), ' express-validator validates all fields. confirmPassword must match password.'));
  children.push(p(bold('5. Duplicate Check:'), ' The controller queries for existing user by email. If found, throws 400 error.'));
  children.push(p(bold('6. User Creation:'), ' User.create() triggers the pre-save hook which hashes the password with bcrypt (12 rounds).'));
  children.push(p(bold('7. Token Generation:'), ' user.generateToken() creates a JWT with payload { id, role } signed with JWT_SECRET.'));
  children.push(p(bold('8. Response:'), ' JWT is set as an HTTP-only cookie and returned in the JSON body. User data (without password) is included.'));
  children.push(p(bold('9. Frontend Storage:'), ' The JWT is stored in localStorage and the user state is set via AuthContext.'));

  children.push(h('16.3 Login Flow', 2));
  children.push(p('The login flow is similar but skips user creation:'));
  children.push(p(bold('1. Credential Verification:'), ' Email and password are validated against the database.'));
  children.push(p(bold('2. Password Comparison:'), ' bcrypt.compare() checks the provided password against the stored hash.'));
  children.push(p(bold('3. Token Issuance:'), ' Same token generation and response as registration.'));

  children.push(h('16.4 Session Management', 2));
  children.push(p(bold('Token Storage:'), ' JWT is stored in localStorage. The Axios interceptor automatically attaches it to all requests as a Bearer token in the Authorization header.'));
  children.push(p(bold('Session Restoration:'), ' On app mount, AuthContext checks localStorage for an existing token. If found, it validates the token by calling GET /api/auth/me. If valid, the user state is restored. If invalid (401), the token is removed and user is logged out.'));
  children.push(p(bold('Token Expiry:'), ' JWT expires after 7 days (configurable via JWT_EXPIRES_IN). The backend verifies expiry on every protected route request.'));
  children.push(p(bold('Logout:'), ' Clears the HTTP-only cookie (sets to "none" with 5-second expiry), removes token from localStorage, and clears user state.'));

  children.push(h('16.5 Authorization Flow', 2));
  children.push(p('Role-based access control operates at two levels:'));
  children.push(p(bold('1. Route Level (Backend):'), ' The protect middleware verifies JWT and attaches user to req.user. The admin middleware checks req.user.role === "admin". Routes are configured as:'));
  children.push(bullet('Public: All GET routes for content resources'));
  children.push(bullet('JWT Required: Auth profile/password routes'));
  children.push(bullet('Admin Only: All POST/PUT/DELETE routes, user management, analytics'));
  children.push(p(bold('2. Component Level (Frontend):'), ' The Admin page checks isAdmin from AuthContext. Non-admin users are redirected to home. The Navbar conditionally renders admin links for admin users only.'));

  children.push(h('16.6 JWT Payload Structure', 2));
  children.push(codeBlock(`// JWT Payload
{
  "id": "65a1b2c3d4e5f6a7b8c9d0e1",  // MongoDB User ID
  "role": "user" | "admin",            // User role
  "iat": 1704067200,                    // Issued at (Unix timestamp)
  "exp": 1704672000                     // Expiry (Unix timestamp)
}`));

  children.push(pageBreak());

  // ===================== CHAPTER 17: SECURITY =====================
  children.push(h(`${sectionNumber(17)}Security Measures`, 1));
  children.push(spacer(100));

  children.push(p('GreenHarvest implements multiple layers of security to protect against common web vulnerabilities. The following security measures are in place:'));

  children.push(h('17.1 HTTP Security Headers (Helmet)', 2));
  children.push(p('Helmet middleware sets security-related HTTP headers including:'));
  children.push(bullet('Content-Security-Policy: Controls resources the browser is allowed to load'));
  children.push(bullet('X-Content-Type-Options: nosniff - Prevents MIME type sniffing'));
  children.push(bullet('X-Frame-Options: SAMEORIGIN - Prevents clickjacking'));
  children.push(bullet('Strict-Transport-Security: Enforces HTTPS connections'));
  children.push(bullet('X-DNS-Prefetch-Control: Controls browser DNS prefetching'));
  children.push(bullet('Cross-Origin-Resource-Policy: cross-origin - Required for uploaded images'));

  children.push(h('17.2 Rate Limiting', 2));
  children.push(p('The express-rate-limit middleware limits API requests to 100 requests per 15-minute window per IP address. This protects against brute force attacks and DDoS attempts. When the limit is exceeded, the API returns a 429 status code with a message.'));
  children.push(codeBlock(`const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                    // 100 requests per window
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  }
});
app.use('/api', limiter);`));

  children.push(h('17.3 NoSQL Injection Prevention', 2));
  children.push(p('The express-mongo-sanitize middleware prevents NoSQL injection attacks by removing $ and . from user-supplied input in req.body, req.params, and req.headers. This prevents attackers from injecting MongoDB operators like $ne, $gt, or $where into queries.'));
  children.push(codeBlock(`app.use(mongoSanitize());`));

  children.push(h('17.4 Password Security', 2));
  children.push(p('Password hashing uses bcryptjs with 12 salt rounds. This is a computationally expensive algorithm specifically designed for password hashing, making brute force attacks impractical. The password field is excluded from query results by default (select: false in the Mongoose schema).'));

  children.push(h('17.5 Input Validation', 2));
  children.push(p('Critical endpoints use express-validator to validate and sanitize input before processing:'));
  children.push(bullet('Registration: Validates name, email format, password length, and password confirmation match'));
  children.push(bullet('Login: Validates email format and password presence'));
  children.push(bullet('Contact: Validates name, email, subject, and message'));
  children.push(bullet('Password Update: Validates currentPassword and newPassword length'));

  children.push(h('17.6 CORS Configuration', 2));
  children.push(p('CORS is configured to allow only the specific frontend origin with credentials support. In production, this should be set to the deployed frontend URL.'));
  children.push(codeBlock(`app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));`));

  children.push(h('17.7 Additional Security Measures', 2));
  children.push(bullet('HTTP-only Cookies: JWT is stored in an HTTP-only cookie that cannot be accessed by JavaScript (XSS protection). Secure flag is enabled in production.'));
  children.push(bullet('Compression: Gzip compression reduces response sizes and improves performance.'));
  children.push(bullet('Error Handling: The global error handler ensures no stack traces are leaked to clients in production.'));
  children.push(bullet('File Upload Restrictions: Multer is configured to accept only image files (jpeg, jpg, png, gif, webp, svg) with a maximum size of 5MB.'));
  children.push(bullet('MongoDB Atlas: The cloud database provides built-in network isolation, IP whitelisting, and encryption at rest.'));

  children.push(pageBreak());

  // ===================== CHAPTER 18: DEPLOYMENT =====================
  children.push(h(`${sectionNumber(18)}Deployment Guide`, 1));
  children.push(spacer(100));

  children.push(h('18.1 Deployment Overview', 2));
  children.push(p('GreenHarvest can be deployed to various hosting platforms. The backend (Node.js/Express) can be deployed to platforms like Heroku, Render, Railway, or AWS Elastic Beanstalk. The frontend (Vite build) can be deployed to Vercel, Netlify, or any static file host. MongoDB Atlas provides the cloud database layer.'));

  children.push(h('18.2 Backend Deployment (Node.js/Express)', 2));
  children.push(p(bold('Requirements:')));
  children.push(bullet('Node.js >= 14.0.0 runtime'));
  children.push(bullet('Environment variables configured on the hosting platform'));
  children.push(bullet('MongoDB Atlas connection string with IP whitelist updated'));
  children.push(p(bold('Steps:')));
  children.push(p(bold('1. Set Production Environment Variables:'), ' Configure all env vars from .env.example on the hosting platform. Ensure NODE_ENV=production.'));
  children.push(p(bold('2. Build the Frontend:'), ' Run npm run build from the root. This generates optimized static files in frontend/dist/.'));
  children.push(p(bold('3. Serve Static Files (Optional):'), ' The backend can serve the built frontend as static files instead of running a separate frontend server:'));
  children.push(codeBlock(`// Add to server.js for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
  });
}`));
  children.push(p(bold('4. Start Production Server:'), ' Run npm start (starts backend with node server.js).'));
  children.push(p(bold('5. Verify:'), ' Visit the deployed URL. The API should respond at /api endpoints and the frontend should load for all routes.'));

  children.push(h('18.3 Frontend Deployment (Vite Build)', 2));
  children.push(p('The frontend can be deployed independently to static hosting services:'));
  children.push(p(bold('Vercel:'), ' Connect the Git repository, set build command to cd frontend && npm run build, output directory to frontend/dist, and configure rewrites to proxy /api to the backend URL.'));
  children.push(p(bold('Netlify:'), ' Set build command to cd frontend && npm run build, publish directory to frontend/dist, add _redirects file with /* /index.html 200 for SPA routing, and configure API proxy via Netlify Functions or environment variables.'));

  children.push(h('18.4 Docker Deployment', 2));
  children.push(p('For containerized deployment, create a Dockerfile in the project root:'));
  children.push(codeBlock(`FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/

RUN npm run install:all

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]`));

  children.push(h('18.5 Production Checklist', 2));
  children.push(bullet('Change JWT_SECRET to a strong, unique value'));
  children.push(bullet('Set NODE_ENV=production'));
  children.push(bullet('Configure MongoDB Atlas IP whitelist for the deployment server'));
  children.push(bullet('Enable HTTPS via the hosting platform or a reverse proxy (nginx)'));
  children.push(bullet('Set up a process manager (PM2) for Node.js process monitoring'));
  children.push(bullet('Configure database backups for MongoDB Atlas'));
  children.push(bullet('Set up monitoring and alerting (e.g., Sentry, LogRocket)'));
  children.push(bullet('Configure custom domain and SSL certificate'));
  children.push(bullet('Update CORS origin to the production frontend URL'));

  children.push(pageBreak());

  // ===================== CHAPTER 19: FUTURE ENHANCEMENTS =====================
  children.push(h(`${sectionNumber(19)}Future Enhancements & Roadmap`, 1));
  children.push(spacer(100));

  children.push(h('19.1 Planned Features', 2));
  children.push(p('The following features are planned for future releases of GreenHarvest:'));

  children.push(p(bold('E-Commerce Integration'), ' - Full shopping cart and checkout system with payment gateway integration (Stripe/Razorpay), order management, and invoice generation.'));
  children.push(p(bold('Email Notifications'), ' - The nodemailer configuration is already in place. Implement automated email notifications for contact form submissions, order confirmations, password resets, and newsletter campaigns.'));
  children.push(p(bold('Advanced Search'), ' - Implement full-text search with MongoDB text indexes for improved product and blog search. Add faceted filtering with multiple categories.'));
  children.push(p(bold('User Dashboard'), ' - Personal farmer dashboard with order history, saved crops, bookmarked articles, and personalized recommendations.'));
  children.push(p(bold('Multi-language Support'), ' - Internationalization (i18n) for regional language support using react-i18next or similar library.'));
  children.push(p(bold('Progressive Web App'), ' - Add service workers, offline support, push notifications, and install prompts.'));
  children.push(p(bold('Image Optimization'), ' - Implement image resizing and compression on upload using Sharp or similar library. Add lazy loading with blur placeholder effects.'));
  children.push(p(bold('API Rate Limiting by Route'), ' - Implement granular rate limiting with different limits for auth endpoints (stricter) vs content endpoints (more lenient).'));

  children.push(h('19.2 Technical Improvements', 2));
  children.push(bullet('TypeScript Migration: Convert both backend and frontend to TypeScript for improved type safety and developer experience'));
  children.push(bullet('Automated Testing: Add Jest unit tests for controllers and models, React Testing Library for components, and Cypress for end-to-end tests'));
  children.push(bullet('CI/CD Pipeline: Set up GitHub Actions for automated testing, linting, and deployment'));
  children.push(bullet('API Documentation: Generate interactive API documentation with Swagger/OpenAPI'));
  children.push(bullet('Performance Optimization: Implement Redis caching for frequently accessed data, database query optimization, and CDN for static assets'));
  children.push(bullet('Monitoring: Integrate application performance monitoring (APM) with tools like Sentry for error tracking and LogRocket for session replay'));

  children.push(h('19.3 Version History', 2));
  children.push(makeTable(
    ['Version', 'Date', 'Changes'],
    [
      ['1.0.0', '2024', 'Initial release with core features: crop catalog, product marketplace, blog system, admin panel, authentication, analytics'],
    ]
  ));

  children.push(spacer(400));

  // ===================== CONCLUSION =====================
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 600 },
    children: [new TextRun({ text: '--- End of Document ---', size: 22, color: '999999', italics: true })],
  }));
  children.push(spacer(200));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'GreenHarvest Agriculture Platform v1.0.0', size: 18, color: 'AAAAAA' })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Built with Node.js, Express, MongoDB, React, Vite, and Tailwind CSS', size: 18, color: 'AAAAAA' })],
  }));

  // ===================== BUILD DOCUMENT =====================
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { size: 22, font: 'Inter' },
          paragraph: { spacing: { after: 120, line: 276 } },
        },
      },
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: 'GreenHarvest Agriculture Platform - Technical Documentation', size: 16, color: '999999', italics: true })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'Page ', size: 16, color: '999999' }), new TextRun({ text: '| Confidential', size: 16, color: '999999' })],
          })],
        }),
      },
      children,
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUTPUT, buffer);
  console.log(`Document generated: ${OUTPUT}`);
  console.log(`File size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
