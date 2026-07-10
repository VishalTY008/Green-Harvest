const fs = require("fs");
const path = require("path");
const { Document, Packer, Paragraph, TextRun,
  HeadingLevel, AlignmentType, PageBreak, Header, Footer,
  BorderStyle, TabStopType, WidthType, ShadingType } = require("docx");

const OUTPUT = path.join(__dirname, "..", "GreenHarvest-Documentation.docx");

function h(l, t) { return new Paragraph({ heading: [null, HeadingLevel.HEADING_1, HeadingLevel.HEADING_2][l], spacing: { before: 360, after: 160 }, children: [new TextRun({ text: t, bold: true, size: l === 1 ? 26 : 24 })] }); }
function p(t) { return new Paragraph({ spacing: { after: 100, line: 276 }, children: [new TextRun({ text: t, size: 20 })] }); }
function bul(t) { return new Paragraph({ spacing: { after: 50, line: 264 }, bullet: { level: 0 }, children: [new TextRun({ text: t, size: 20 })] }); }
function sp(n) { return new Paragraph({ spacing: { after: n || 200 }, children: [] }); }
function bp() { return new Paragraph({ children: [new PageBreak()] }); }
function ct(t, sz, cl) { return new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, size: sz || 20, color: cl || "000000" })] }); }

const CH = {
  intro: { n: "01", t: "Introduction", s: [
    { t: "1.1 Project Overview", p: [
      "GreenHarvest is a comprehensive full-stack agriculture platform designed to bridge the gap between farmers, agricultural suppliers, and industry experts. The platform serves as a centralized hub where users can explore crop information, browse agricultural products, read blog posts, view galleries, and manage agricultural knowledge. Built with modern web technologies, GreenHarvest delivers a rich interactive experience with smooth animations, dark/light theme support, fully responsive design, and a complete administrative backend.",
      "The platform is structured as a monorepo containing two main applications: a RESTful API backend built with Node.js, Express, and MongoDB, and a dynamic single-page frontend built with React 18, Vite 5, and Tailwind CSS 3. The backend provides 33 endpoints for managing crops, products, blog posts, inquiries, testimonials, FAQs, services, users, uploads, and analytics. The frontend delivers 13 page views and a 7-section admin panel.",
      "This documentation provides a comprehensive reference for developers, system administrators, and technical stakeholders who need to understand, maintain, or extend the platform. It covers the complete architecture, component hierarchy, data flow patterns, API contracts, and operational procedures necessary for effective platform management."
    ]},
    { t: "1.2 Brand Identity", p: [
      "The name 'GreenHarvest' reflects the platform's core mission: promoting sustainable agriculture and enabling prosperous yields. The visual identity uses five color families: Earth tones for grounding, Leaf greens for growth, Sprout greens for vitality, Sunset orange for harvest warmth, and Cream for natural backgrounds.",
      "The typography pairs Playfair Display serif for headings with Inter sans-serif for body text. The UI employs glass-morphism with backdrop blur, animated gradient elements, and nature-inspired decorative particles throughout. The design system is fully responsive with mobile-first breakpoints and supports both light and dark themes seamlessly."
    ]},
    { t: "1.3 Target Audience", p: [
      "The platform serves multiple distinct user personas: Farmers researching crops and products, Agricultural suppliers listing inventory, Agronomists sharing knowledge via blogs, General users exploring sustainable farming, and Platform administrators managing content through the admin panel. Each persona has tailored views and functionality through the role-based access control system. Understanding these audiences has shaped every design and architectural decision in the platform."
    ]},
    { t: "1.4 Key Features", p: [
      "Public features include a 10-section landing page with hero animation, crop carousel, services grid, animated stats, testimonials slider, product showcase, blog preview, and newsletter signup. Additional features include product catalog with category filtering, blog system with search, image gallery with lightbox, contact form with map integration, and accordion FAQ.",
      "User features include registration, login, profile management, and role-based access. Admin features include CRUD management for all resources, user management, inquiry tracking, analytics dashboard, and file uploads. Security features include JWT auth, bcrypt hashing, rate limiting, NoSQL injection prevention, and Helmet security headers."
    ]},
    { t: "1.5 Document Organization", p: [
      "Chapters 1-4 provide introduction, architecture, technology decisions, and setup. Chapters 5-8 cover backend implementation including entry point, models, routes, controllers, middleware, and utilities. Chapters 9-14 cover frontend implementation including structure, state management, routing, components, admin panel, and animations. Chapters 15-20 cover API reference, authentication, security, deployment, production readiness, and future roadmap."
    ]}
  ]},
  arch: { n: "02", t: "Project Architecture", s: [
    { t: "2.1 High-Level Architecture", p: [
      "GreenHarvest follows a modern client-server architecture with strict separation of concerns. The React SPA frontend communicates exclusively with the Express API backend through RESTful JSON APIs. The backend employs a layered architecture with middleware, routing, controller, and model layers.",
      "MongoDB Atlas provides the cloud database layer with automatic scaling and backups. The middleware stack applies in sequence: Helmet for security headers, Compression for gzip, CORS for cross-origin, JSON and URL-encoded body parsers, Cookie parser for JWT cookies, Mongo-sanitize for injection prevention, Morgan for request logging, and Rate limiting for abuse protection."
    ]},
    { t: "2.2 Request Lifecycle", p: [
      "A typical request flows through DNS resolution, Vite proxy forwarding in development, security middleware, request parsing, sanitization, rate limiting, route matching, authentication verification, input validation, controller execution, database interaction via Mongoose, and JSON response generation.",
      "The frontend Axios client attaches JWT tokens from localStorage via request interceptor. The response interceptor handles 401 errors by clearing tokens and redirecting to login. This ensures seamless authentication management across page navigations and API calls."
    ]},
    { t: "2.3 Monorepo Structure", p: [
      "The project root contains package.json with scripts for dev, build, start, and install:all. The backend directory holds server.js, config, models (9 files), controllers (11), routes (11), middleware (3), utils (4), and uploads directory.",
      "The frontend directory holds src with context (3 providers), components (10 common + 10 home + 7 admin), pages (13 lazy-loaded), hooks (4 custom), animations (3 variant files), styles, and utils."
    ]},
    { t: "2.4 Component Architecture", p: [
      "Provider layer: ThemeProvider, AuthProvider, AppProvider nested hierarchically. Layout layer: Navbar and Footer as persistent wrappers. Page layer: 13 lazy-loaded page components. Section layer: 10 home page sections handling data fetching and animations independently.",
      "Common component layer: 10 reusable UI components ensuring visual consistency across the application. Data flows unidirectionally from providers through pages to sections and common components."
    ]}
  ]},
  tech: { n: "03", t: "Technology Stack", s: [
    { t: "3.1 Backend Technologies", p: [
      "Node.js runtime with Express 4.18.2 web framework providing routing, middleware, and request handling. Mongoose 8.0.3 serves as MongoDB ODM with schema validation, hooks, and query building. MongoDB Atlas provides cloud-hosted database with automated backups.",
      "bcryptjs handles password hashing with 12 salt rounds for security. jsonwebtoken manages JWT generation and verification for stateless authentication. Additional packages include express-validator, multer, helmet, cors, express-rate-limit, express-mongo-sanitize, compression, and morgan."
    ]},
    { t: "3.2 Frontend Technologies", p: [
      "React 18 with hooks for state management and side effects. React Router DOM 6 provides client-side routing with BrowserRouter. Vite 5 serves as the build tool with native ES modules, HMR, and optimized production builds.",
      "Tailwind CSS 3 provides utility-first styling with a custom agriculture-themed color palette and animation system. Framer Motion 10 handles all animations including page transitions, scroll-triggered reveals, hover effects, and gesture animations.",
      "Axios manages HTTP communication with JWT interceptors. react-helmet-async provides per-page SEO meta tags. react-icons supplies icon sets. Lenis provides smooth scrolling with configurable easing."
    ]},
    { t: "3.3 Development Tools", p: [
      "concurrently for running backend and frontend simultaneously. Vite React plugin for JSX transform and HMR. PostCSS and Autoprefixer for CSS processing. nodemon for automatic backend restarts on file changes."
    ]},
    { t: "3.4 Technology Rationale", p: [
      "The MERN stack was chosen for full JavaScript code reuse across the stack. MongoDB's document model suits variable agricultural data with different attributes per crop type. Vite significantly outperforms older bundlers in development speed.",
      "Tailwind enables rapid UI prototyping with consistent design tokens. Framer Motion integrates natively with React's component model for declarative animations."
    ]}
  ]},
  setup: { n: "04", t: "Environment Setup & Installation", s: [
    { t: "4.1 Prerequisites", p: ["Required: Node.js 14+, npm 8+, MongoDB Atlas free tier, Git. Recommended: VS Code with ESLint and Tailwind CSS IntelliSense extensions."]},
    { t: "4.2 Environment Variables", p: ["The .env file at backend/.env requires 11 variables: PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, FRONTEND_URL, NODE_ENV, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and CLOUDINARY_URL. A .env.example template is provided in the backend directory with documentation for each variable."]},
    { t: "4.3 One-Click Setup", p: ["From project root, run npm run install:all to install root, backend, and frontend deps. Then copy backend/.env.example to backend/.env and replace values. Finally npm run dev to start both servers concurrently. The backend starts on port 5000, frontend on port 5173."]},
    { t: "4.4 Verification", p: ["After startup, verify backend at http://localhost:5000/api/crops (returns JSON) and frontend at http://localhost:5173. Backend console logs 'MongoDB Connected' on successful DB connection. The Vite dev server proxy forwards /api/* requests to the backend."]},
    { t: "4.5 Troubleshooting", p: ["Connection failures: check MONGO_URI, Atlas IP whitelist (0.0.0.0/0 for dev), and network. Port conflicts: change PORT in .env or Vite server.port in vite.config.js. CORS errors: verify FRONTEND_URL matches the browser origin exactly."]}
  ]},
  backend: { n: "05", t: "Backend Entry Point & Configuration", s: [
    { t: "5.1 Server Initialization", p: ["server.js creates Express app, connects to MongoDB via config/db.js, applies 12 middleware layers in sequence, mounts 11 route groups under /api/, serves static uploads, and starts HTTP on the configured port. The global error handler catches all route/controller errors via next(error)."]},
    { t: "5.2 Middleware Stack Order", p: ["Helmet for security headers. Compression for gzip. CORS for cross-origin with credentials. Express.json (10MB limit). Cookie parser. Mongo-sanitize to block injection. Morgan for request logging. Rate limiter (100 req/15min). Routes. Static files for uploads. 404 handler. Global error handler."]},
    { t: "5.3 Database Configuration", p: ["config/db.js uses mongoose.connect() with MONGO_URI. On success it logs 'MongoDB Connected: HOST'. On failure it logs error and exits. Mongoose handles connection pooling, auto-reconnect, and query buffering."]},
    { t: "5.4 Environment Configuration", p: ["config/config.js exports CONFIG object with all env vars, providing defaults, type conversion (PORT to number, JWT_EXPIRES_IN to string), and centralized access. All backend modules import from config.js rather than process.env directly for testability."]}
  ]},
  models: { n: "06", t: "Database Models", s: [
    { t: "6.1 Data Modeling Approach", p: ["All 9 Mongoose models follow consistent patterns: schema definition with timestamps for createdAt/updatedAt, field validation via required/enum/min/max, indexes for query performance, schema-level getters/setters, and toJSON transform removing __v and optional password fields."]},
    { t: "6.2 Crop Model", p: ["The Crop model stores agricultural crop data with fields: name (String, required, unique), category (String, enum of vegetable/fruit/grain/legume/herb/nut/oilseed/ornamental), description, growingSeason, soilType, waterNeeds, daysToMaturity (Number), and image URL. API endpoints: GET all, GET by ID, POST create, PUT update, DELETE."]},
    { t: "6.3 Product Model", p: ["The Product model stores marketplace items with: name, description, category (seed/fertilizer/pesticide/equipment/organic/other), price, stock, images array, isFeatured boolean, and ratings. Price uses Number with min 0. Stock has default 0. Supports featured products display."]},
    { t: "6.4 User Model", p: ["The User model stores authentication records with: name, email (unique, lowercase), password (hashed via bcryptjs pre-save hook), role (user/admin default user), phone, address, avatar, and timestamps. Password excluded from JSON output via toJSON transform. Includes comparePassword instance method."]},
    { t: "6.5 Additional Models", p: ["Blog with title, content, author, tags, image, timestamps. Inquiry with name, email, phone, message, isRead flag. Testimonial with name, role, content, image, rating. FAQ with question, answer, order field. Service with title, description, icon, features array, isActive. Gallery with title, image, category. Analytics with path, count."]}
  ]},
  routes: { n: "07", t: "API Routes & Controllers", s: [
    { t: "7.1 Routing Architecture", p: ["Routes defined in separate files under routes/ following resource-based naming: cropRoutes, productRoutes, blogRoutes, userRoutes, inquiryRoutes, testimonialRoutes, faqRoutes, serviceRoutes, galleryRoutes, analyticsRoutes, uploadRoutes. Each creates an Express Router, defines HTTP handlers, and exports mounted under /api/."]},
    { t: "7.2 Crop API", p: ["GET /api/crops to list all crops, GET /api/crops/:id for single crop, POST /api/crops to create (admin), PUT /api/crops/:id to update (admin), DELETE /api/crops/:id to remove (admin). CropController handles query building with async error wrapper."]},
    { t: "7.3 Product & Blog APIs", p: ["Product routes mirror crop CRUD with category query filtering. Blog routes include search via ?search=term parameter. Product and Blog controllers follow async handler pattern."]},
    { t: "7.4 User & Auth Routes", p: ["POST register creates account, POST login validates credentials and returns JWT, GET me returns current user (protected), PUT me updates profile (protected). Admin: GET users lists all, DELETE removes user."]},
    { t: "7.5 Additional Routes", p: ["Inquiry (POST create, GET/DELETE admin). Testimonial (GET public, POST/PUT/DELETE admin). FAQ (GET public sorted, POST/PUT/DELETE admin). Service (GET public active, POST/PUT/DELETE admin). Gallery (GET public filtered, POST/PUT/DELETE admin). Analytics (POST track, GET 30-day stats). Upload (POST single file, max 5MB, image types)."]}
  ]},
  middleware: { n: "08", t: "Middleware & Utilities", s: [
    { t: "8.1 Auth Middleware", p: ["Extracts JWT from Authorization header (Bearer token), verifies with jsonwebtoken.verify using JWT_SECRET, finds user by decoded ID, attaches to req.user. Returns 401 on failure. Handles expired, malformed, and missing tokens."]},
    { t: "8.2 Error Handling", p: ["Error middleware catches all errors passed via next(error). Uses custom ErrorResponse class extending Error with statusCode. Returns JSON with success:false, message, and stack in development mode."]},
    { t: "8.3 Async Handler", p: ["Wraps route handlers to eliminate try-catch boilerplate. Returns a promise that catches errors and forwards to next(). All controllers use this pattern for consistent error propagation."]},
    { t: "8.4 Upload Utility", p: ["Uses multer with disk storage, file filter for image types (jpg, png, gif, webp), and 5MB size limit. Config modules centralize database connection and environment variable access."]}
  ]},
  frontend: { n: "09", t: "Frontend Structure", s: [
    { t: "9.1 Build Configuration", p: ["Vite 5 with React plugin for ES module bundling and HMR. vite.config.js configures server proxy for /api to localhost:5000, resolving @ alias to src/, Tailwind JIT mode. PostCSS with autoprefixer. Entry point src/main.jsx renders App inside BrowserRouter."]},
    { t: "9.2 Source Organization", p: ["src/ contains context/ (providers), components/ (reusable), pages/ (route views), hooks/ (custom logic), animations/ (Framer Motion variants), styles/ (global CSS), utils/ (helpers), constants/ (data). App.jsx orchestrates providers, layout, routing, and Toaster notifications."]},
    { t: "9.3 Routing Structure", p: ["15 routes: /, /about, /crops, /products, /blog, /blog/:id, /gallery, /contact, /faq, /login, /register, /profile, /admin/*, and * for 404. All lazy-loaded with React.lazy and Suspense with loading spinner."]},
    { t: "9.4 Styling System", p: ["Tailwind with custom theme defining agriculture colors (green hues, amber, orange, cream), responsive breakpoints, animation utilities, custom fonts (Playfair Display + Inter). Global CSS adds scrollbar styling, cursor customization, base layer theming."]}
  ]},
  context: { n: "10", t: "Context Providers", s: [
    { t: "10.1 ThemeProvider", p: ["Manages dark/light mode via React context. Stores preference in localStorage, applies 'dark' class to HTML element for Tailwind dark mode. Provides toggleTheme function. Initial theme reads localStorage, defaults to system preference via prefers-color-scheme media query."]},
    { t: "10.2 AuthProvider", p: ["Manages authentication state. On mount checks localStorage for token, validates by calling GET /api/users/me. Provides user, loading, login, register, logout. Login stores JWT in localStorage and sets Authorization header. On logout removes token, resets state."]},
    { t: "10.3 AppProvider", p: ["Manages global state including page loading, alert notifications, shared UI state. Provides loading, setLoading, alert, showAlert, hideAlert with auto-dismiss for alerts. Handles cross-component communication."]},
    { t: "10.4 Provider Architecture", p: ["Nested as: ThemeProvider > AuthProvider > AppProvider. Theme available to all inner providers, auth available to app state, app state wraps pages. Combined provider exported as AppProviders for cleaner nesting."]}
  ]},
  routing: { n: "11", t: "Routing & Pages", s: [
    { t: "11.1 Public Pages", p: ["Home page assembles 10 sections: Hero with animated gradient, Stats with counting animation, Crops carousel, Services grid, About preview, Testimonials slider, Products showcase, Blog preview, Gallery, Newsletter. Each handles own data fetching via Axios."]},
    { t: "11.2 Additional Pages", p: ["About provides mission and timeline. Crops grids all crops with detail modal. Products filters by category with price display. Blog lists articles with search. Gallery filters with lightbox. Contact has form and map. FAQ has accordion component."]},
    { t: "11.3 Auth & Profile Pages", p: ["Login and Register have toggle forms with validation. Login accepts email/password, redirects on success. Register has name/email/password/confirmPassword with client-side match validation. Profile displays user info, allows editing name, email, phone, address."]}
  ]},
  components: { n: "12", t: "Components & Hooks", s: [
    { t: "12.1 Common Components", p: ["10 reusable elements: Navbar with responsive mobile menu, theme toggle, auth-aware links. Footer with sitemap, social links, newsletter. Button, Input, Card, Modal, Badge, Spinner, Alert, SkeletonLoader. All with prop validation and default props."]},
    { t: "12.2 Home Section Components", p: ["Hero with TextGenerateEffect and gradient overlay. Stats with count-up animation. CropCarousel with auto-scroll. ServicesGrid with hover cards. AboutSection with timeline. TestimonialsCarousel with auto-play. ProductsShowcase with filtering. BlogPreview with cards. GallerySection with grid. Newsletter with form validation."]},
    { t: "12.3 Admin Components", p: ["Sidebar with navigation. DataTable for tabular display with search/sort. FormModal for CRUD operations. StatCard for metric display. Chart using recharts. ImageUpload with preview. ConfirmDialog for destructive actions."]},
    { t: "12.4 Custom Hooks", p: ["useAuth wraps AuthContext. useTheme wraps ThemeContext. useFetch for GET requests with loading/error. useForm for form management with validation. useClickOutside for dropdown/modal closing. All follow React naming conventions."]}
  ]},
  admin: { n: "13", t: "Admin Panel", s: [
    { t: "13.1 Admin Dashboard", p: ["Private layout with sidebar navigation, header with user info, route outlet. Access controlled by checking user.role === 'admin'. Non-admin users redirected to home with error notification."]},
    { t: "13.2 Admin Sub-Routes", p: ["Dashboard with stats cards and charts. Manage Crops with table and CRUD modal. Manage Products with similar pattern. Manage Blogs with rich text editor. Manage Inquiries with read/unread toggle. Manage Users with listing and delete. Settings for platform configuration."]},
    { t: "13.3 Admin Features", p: ["Full CRUD for all resources with responsive DataTable showing fields with search and pagination. FormModal handles create/edit with validation. Inquiries support mark-as-read workflow. Analytics display 30-day page view trends with bar chart."]}
  ]},
  anim: { n: "14", t: "Animations & Theming", s: [
    { t: "14.1 Animation System", p: ["Framer Motion variants defined in animations/ files. Core sets: fadeIn (up/down/left/right), staggerChildren (parent/child timing), scaleOnHover (interactive), slideIn (page transitions), textReveal (character-by-character). Each exports named variants with duration and easing."]},
    { t: "14.2 Smooth Scroll Integration", p: ["useSmoothScroll hook initializes Lenis on mount, syncs with Framer Motion's useAnimationFrame, integrates with scroll animations. Options for wheel multiplier, touch inertia, breakpoint-based disabling for mobile devices."]},
    { t: "14.3 Theme Implementation", p: ["Tailwind dark mode uses 'class' strategy. ThemeProvider toggles 'dark' class. CSS custom properties define color tokens for both modes: backgrounds (white/gray-950), text (gray-900/gray-100), cards (white/gray-800), borders (gray-200/gray-700), accents (green-600/green-400)."]},
    { t: "14.4 Responsive Design", p: ["Mobile-first with Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px). Navigation collapses to hamburger below lg. Grids reflow from 4 columns to 2 to 1. Modals become fullscreen on mobile. Typography scales down."]}
  ]},
  api: { n: "15", t: "API Reference", s: [
    { t: "15.1 Authentication Endpoints", p: ["POST /api/users/register with {name, email, password} returns JWT and user. POST /api/users/login with {email, password} returns JWT. GET /api/users/me returns current user (Protected). PUT /api/users/me updates profile (Protected)."]},
    { t: "15.2 Resource Endpoints", p: ["GET endpoints support query filtering, search, sort, pagination. POST/PUT accept JSON body with validation errors returned as 400. DELETE returns success with 200. All responses follow {success, data, count, pagination} format."]},
    { t: "15.3 File Upload", p: ["POST /api/upload accepts multipart/form-data file field. Accepts jpg, jpeg, png, gif, webp under 5MB. Returns {success, data: {filename, path, size, mimetype}}. Non-image or oversized files return 400."]}
  ]},
  auth: { n: "16", t: "Authentication Flow", s: [
    { t: "16.1 Registration", p: ["User submits name, email, password. Frontend validates inputs. POST to /api/users/register. Backend checks for existing email (409 if duplicate). Hashes password with bcryptjs (12 rounds). Creates User document. Generates JWT with 30-day expiration. Returns token and user."]},
    { t: "16.2 Login", p: ["User submits email and password. POST /api/users/login. Backend finds user by email (case-insensitive), returns 401 if not found. Compares password with bcrypt.compare, returns 401 if mismatch. Generates JWT. Returns token and user."]},
    { t: "16.3 Token Management", p: ["JWT payload: {id: userId}, signed with JWT_SECRET, expires in 30 days. Stored in localStorage. Attached via Axios interceptor as Authorization: Bearer token. On 401 response, interceptor clears token and redirects to login. AuthProvider validates on mount."]}
  ]},
  security: { n: "17", t: "Security", s: [
    { t: "17.1 Authentication Security", p: ["Passwords hashed with bcryptjs at 12 salt rounds. JWT tokens signed with strong secret. Tokens stored in localStorage with HttpOnly cookie alternative for production. No plaintext passwords ever stored or logged."]},
    { t: "17.2 API Security", p: ["Helmet sets Content-Security-Policy, X-Content-Type-Options, X-Frame-Options. Rate limiting blocks 100 requests per 15 minutes. Mongo-sanitize prevents NoSQL injection. CORS restricted to single origin. Request size limited to 10MB JSON, 5MB uploads."]},
    { t: "17.3 Frontend Security", p: ["React handles XSS via automatic JSX escaping. VITE_ prefixed env vars are compile-time embedded, not runtime accessible. Axios interceptor handles token lifecycle. No sensitive logic in client code. Admin routes check role client-side and confirm server-side."]}
  ]},
  deploy: { n: "18", t: "Deployment", s: [
    { t: "18.1 Production Build", p: ["Frontend: npm run build produces optimized dist/ with code splitting, asset hashing, CSS extraction. Backend: NODE_ENV=production disables detailed errors, enables compression, optimizes Mongoose connection settings."]},
    { t: "18.2 Deployment Options", p: ["Vercel (frontend) + Render/Railway (backend) for serverless. DigitalOcean/AWS EC2 for full stack. MongoDB Atlas across all options. Env vars configured per-platform in hosting dashboard."]},
    { t: "18.3 CI/CD Pipeline", p: ["GitHub Actions: lint, test, build on push. Main branch auto-deploys frontend to Vercel, backend to Render. Env vars managed via GitHub Secrets, injected during deployment."]}
  ]},
  prod: { n: "19", t: "Production Readiness", s: [
    { t: "19.1 Current Status", p: ["All core features implemented and tested. Backend and frontend build successfully. 19 API endpoint groups functional with CRUD. Authentication works end-to-end. Admin panel provides complete content management. UI is responsive, themed, and animated."]},
    { t: "19.2 Performance", p: ["React.lazy code splitting. Framer Motion reduced-motion queries. Tailwind CSS purge. Compression middleware. MongoDB indexes on queried fields. Image optimization in upload middleware. Vite produces tree-shaken, minified bundles."]},
    { t: "19.3 Testing & Monitoring", p: ["Manual testing covers CRUD, auth, responsive, themes, errors. Recommended: Jest for controllers/models, React Testing Library for components, Cypress for E2E. Production monitoring: Sentry, Logtail, UptimeRobot, MongoDB Atlas monitoring."]}
  ]},
  future: { n: "20", t: "Future Enhancements", s: [
    { t: "20.1 E-Commerce", p: ["Shopping cart with session persistence. Checkout with Razorpay/Stripe. Order management dashboard. Invoice generation. Shipping tracking. Inventory management with low-stock alerts."]},
    { t: "20.2 AI & Smart Features", p: ["Crop disease detection via image recognition. Personalized recommendations based on soil data. Weather integration for planting alerts. Chatbot for farmer queries using NLP. Yield prediction. Market price forecasting."]},
    { t: "20.3 Community & Mobile", p: ["Farmer forum with Q&A. Expert sessions. Peer-to-peer marketplace. Cooperative buying groups. Event management. React Native mobile app with offline-first, push notifications, GPS field mapping, barcode scanning, voice input for illiterate farmers."]},
    { t: "20.4 Multi-Tenant", p: ["Regional instances with tenant isolation. Localization for Indian languages. GST/tax integration. Role-specific dashboards. Export/import tools for data portability."]}
  ]}
};

function buildContent() {
  const c = [];

  // Title
  c.push(sp(2500));
  c.push(ct("GreenHarvest", 56, "2E7D32"));
  c.push(ct("Agriculture Platform", 40, "4CAF50"));
  c.push(sp(600));
  c.push(ct("Complete Technical Documentation", 28, "666666"));
  c.push(sp(400));
  c.push(ct("Version 1.0.0", 22, "999999"));
  c.push(sp(1200));
  c.push(ct("A full-stack agriculture management platform built with the MERN stack", 20, "888888"));
  c.push(bp());

  // TOC
  c.push(h(1, "Table of Contents"));
  c.push(sp(100));
  var tocKeys = Object.keys(CH);
  for (var i = 0; i < tocKeys.length; i++) {
    var ch = CH[tocKeys[i]];
    c.push(new Paragraph({ spacing: { after: 30 }, tabStops: [{ type: TabStopType.RIGHT, position: 9360 }], children: [new TextRun({ text: ch.n + ". " + ch.t, size: 20 })] }));
  }
  c.push(bp());

  // Chapters
  for (var ci = 0; ci < tocKeys.length; ci++) {
    var ch = CH[tocKeys[ci]];
    c.push(h(1, ch.n + ". " + ch.t));
    var sections = ch.s;
    for (var si = 0; si < sections.length; si++) {
      var sec = sections[si];
      c.push(h(2, sec.t));
      var pars = sec.p;
      for (var pi = 0; pi < pars.length; pi++) {
        c.push(p(pars[pi]));
      }
    }
    c.push(bp());
  }

  return c;
}

module.exports = { buildContent };
