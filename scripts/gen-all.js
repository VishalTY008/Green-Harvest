const fs=require("fs"),path=require("path"),{Document,Packer,Paragraph,TextRun,HeadingLevel,AlignmentType,PageBreak,Header,Footer,TabStopType}=require("docx");
const O=path.join(__dirname,"..","GreenHarvest-Documentation.docx");
function H(l,t){return new Paragraph({heading:[null,HeadingLevel.HEADING_1,HeadingLevel.HEADING_2][l],spacing:{before:360,after:160},children:[new TextRun({text:t,bold:true,size:l===1?26:24})]})}
function P(t){return new Paragraph({spacing:{after:100,line:276},children:[new TextRun({text:t,size:20})]})}
function S(n){return new Paragraph({spacing:{after:n||200},children:[]})}
function BP(){return new Paragraph({children:[new PageBreak()]})}
function CT(t,sz,cl){return new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:t,size:sz||20,color:cl||"000000"})]})}

var CH=[
["01","Introduction",[
["1.1 Project Overview",[
["comprehensive agriculture platform bridging farmers, suppliers, and industry experts","full-stack MERN architecture","centralized hub for agricultural information and e-commerce","unified ecosystem serving the entire agricultural community"],
["RESTful API backend with 33 endpoints across 11 resource groups","Node.js, Express, and MongoDB with layered architecture","CRUD operations for all resources with consistent patterns","scalable and maintainable API design that supports future growth"],
["modern single-page frontend with 13 distinct page views","React 18, Vite 5, and Tailwind CSS 3 with responsive design","smooth animations, dark/light themes, and mobile-first layout","engaging user experience across desktop, tablet, and mobile devices"],
["monorepo structure with co-located backend and frontend","concurrently for parallel server execution in development","shared configurations and consistent build workflows","simplified developer onboarding and streamlined maintenance"],
["comprehensive technical documentation covering all platform aspects","complete architecture, component hierarchy, and data flow patterns","detailed API contracts and operational procedures","essential reference for developers, administrators, and stakeholders"],
["platform designed for scalability and extensibility","modular architecture supporting feature additions","standardized patterns reducing development complexity","future-ready foundation for agricultural technology solutions"]
]],
["1.2 Brand Identity",[
["name GreenHarvest reflecting core agricultural mission","sustainable farming and environmental consciousness in Green","abundant yields and agricultural prosperity in Harvest","memorable brand identity aligned with platform purpose and values"],
["five-color visual identity inspired by nature and agriculture","Earth tones providing grounding and stability","Leaf greens representing growth and natural vitality","Sunset orange evoking harvest warmth and energy"],
["Sprout greens for freshness and new beginnings","Cream for natural backgrounds and generous whitespace","cohesive palette applied consistently across all interfaces","nature-inspired aesthetic appropriate for the agricultural sector"],
["Playfair Display serif typography for headings and titles","Inter sans-serif for body text ensuring readability","professional typographic hierarchy guiding user attention","balanced pairing of character and clarity"],
["glass-morphism UI with backdrop blur and transparency","animated gradient backgrounds with organic color transitions","nature-inspired decorative particles adding visual interest","modern polished aesthetic while maintaining professional credibility"]
]],
["1.3 Target Audience and Use Cases",[
["farmers and agricultural workers as primary platform users","crop research, product discovery, and knowledge access needs","tailored interfaces supporting agricultural workflows","addressing real-world farming information requirements"],
["agricultural suppliers and product vendors","product listing, inventory management, and customer outreach","B2B marketplace connecting suppliers with farming communities","streamlined commerce for agricultural supply chain"],
["agronomists, agricultural experts, and content contributors","blog publishing for knowledge sharing and thought leadership","community education and expert guidance platform","establishing authority in agricultural topics and practices"],
["general users interested in sustainable farming and organic products","educational content about agricultural practices","marketplace access for organic and specialty products","broadening agricultural awareness beyond professional farming"],
["platform administrators and content management teams","comprehensive admin panel for all platform resources","user management with role-based access control","analytics oversight and platform configuration capabilities"]
]],
["1.4 Core Capabilities and Features",[
["comprehensive crop information database","growing seasons, soil requirements, water needs, and cultivation periods","organized by category with search and filtering functionality","essential reference for informed farming decisions"],
["agricultural product marketplace with category management","seeds, fertilizers, equipment, pesticides, and organic supplies","category-based browsing with stock availability tracking","streamlined procurement process for farmers and suppliers"],
["content management system with full CRUD operations","blog posts, testimonials, FAQs, and services management","rich text editing with image and media support","dynamic content delivery to end users"],
["JWT-based user authentication and role management","secure registration and login with bcrypt password hashing","role-based access control distinguishing users from administrators","protected resources and personalized user experiences"],
["contact inquiry management with read tracking","form submission handling with unread notification","efficient communication channel between users and administrators","organized inquiry workflow preventing missed messages"],
["analytics dashboard with page view tracking","30-day aggregation with per-page breakdown","content performance analysis and traffic insights","data-driven decision making for content strategy"]
]],
["1.5 Document Structure and Navigation Guide",[
["chapters one through four establishing foundation","introduction covering project overview and scope","architecture explaining system design decisions","technology stack detailing framework and library choices"],
["chapters five through eight covering backend implementation","server entry point and configuration details","database models with schema documentation","API routes with controller business logic"],
["chapters nine through fourteen exploring frontend architecture","application structure and build configuration","context providers for global state management","routing, components, admin panel, and animation systems"],
["chapters fifteen through twenty providing operational guidance","complete API reference with endpoint documentation","authentication flow explaining security implementation","deployment procedures and production readiness assessment"]
]]
]],
["02","Project Architecture",[
["2.1 High-Level System Architecture",[
["modern client-server architecture with clear separation of concerns","React single-page application frontend for presentation","Express RESTful API backend for business logic","MongoDB Atlas cloud database for persistent storage"],
["four-layer backend processing pipeline","middleware layer handling cross-cutting concerns","routing layer directing requests to appropriate handlers","controller layer implementing business logic"],
["model layer managing database interactions via Mongoose","strict layer separation with defined interfaces","maintainable codebase supporting team development","testable architecture with isolated components"],
["comprehensive middleware stack in specific order","Helmet for security headers at the outermost layer","Compression for response size optimization","CORS enabling secure cross-origin communication"],
["JSON and URL-encoded body parsers for request processing","Cookie parser for authentication token support","Mongo-sanitize preventing NoSQL injection attacks","Morgan providing HTTP request logging for debugging"],
["Express rate limiter restricting API usage per IP","route matching after complete middleware processing","global error handler catching all uncaught exceptions","consistent request processing pipeline"]
]],
["2.2 Complete Request Lifecycle",[
["request originates from frontend Axios client","DNS resolution to backend server address","TCP connection establishment for HTTP communication","Vite proxy forwarding in development environment"],
["middleware stack traversal in defined sequential order","security headers applied for vulnerability protection","request body parsed and validated for processing","sanitization removes dangerous query patterns"],
["logging records request details for debugging","rate limiting check prevents API abuse","route matching identifies appropriate handler","authentication middleware verifies JWT for protected routes"],
["controller executes business logic with input validation","database interaction via Mongoose model methods","response serialization to JSON format","consistent error handling via global exception handler"],
["response delivered through middleware chain in reverse","compression applied for bandwidth optimization","headers set for browser compatibility","final delivery to frontend Axios client"],
["frontend response interceptor processes result","success responses update application state","401 responses trigger automatic token cleanup","error responses display user-friendly notifications"]
]],
["2.3 Monorepo Structure and Directory Organization",[
["co-located backend and frontend in single git repository","root package.json with workspace management scripts","shared ESLint configuration and development tooling","simplified dependency management across both applications"],
["backend directory organized by architectural layer","server.js as application entry point","config/ for database and environment configuration","models/ containing nine Mongoose schema definitions"],
["controllers/ with eleven business logic modules","routes/ with eleven route definition files","middleware/ with three custom middleware components","utils/ with four utility modules for common operations"],
["frontend directory organized by feature and concern","context/ containing three React context providers","components/ divided into common, home, and admin","pages/ with thirteen lazy-loaded route components"],
["hooks/ with four custom React hooks for reusable logic","animations/ with Framer Motion variant definitions","styles/ for global CSS and custom properties","utils/ for helper functions and constants/ for static data"],
["scripts in root package.json for unified development","npm run dev starting both servers concurrently","npm run build for production builds","npm run install:all for complete dependency installation"]
]],
["2.4 Component Architecture and Data Flow",[
["provider layer managing global application state","ThemeProvider for dark and light theme management","AuthProvider for authentication lifecycle","AppProvider for global UI state and notifications"],
["hierarchical provider nesting with correct order","ThemeProvider as outermost for theme availability","AuthProvider inside for auth-dependent services","AppProvider innermost wrapping page content"],
["layout layer providing persistent application shell","Navbar with responsive mobile menu and theme toggle","Footer with sitemap, social links, and newsletter","consistent interface elements across all routes"],
["page layer with route-specific content components","thirteen lazy-loaded components with code splitting","independent data fetching and state management","optimized bundle loading for performance"],
["section layer for composable page sections","ten home page sections handling own data fetching","scroll-triggered animation integration","modular architecture supporting independent development"],
["common component layer with ten reusable elements","consistent styling and behavior across the application","reduced duplication and maintenance overhead","unified user interface language"]
]]
]],
["03","Technology Stack",[
["3.1 Backend Runtime and Framework",[
["Node.js providing JavaScript runtime on the server","event-driven non-blocking I/O for concurrent request handling","single-threaded event loop architecture with async processing","efficient handling of multiple simultaneous API connections"],
["Express 4.18.2 as the web application framework","comprehensive routing system with parameter handling","rich middleware ecosystem for extensibility","minimalist design allowing flexible application structure"],
["Mongoose 8.0.3 as MongoDB Object-Document Mapper","schema-based modeling with built-in validation","middleware hooks for pre and post operation logic","powerful query building with chainable methods"],
["MongoDB Atlas as cloud database service","automatic failover for high availability","encryption at rest for data security","daily automated backups with point-in-time recovery"]
]],
["3.2 Security Libraries and Authentication",[
["bcryptjs for password hashing and comparison","twelve salt rounds providing computational expense","approximately 250 milliseconds per hash operation","strong protection against brute force cracking attempts"],
["jsonwebtoken for stateless token-based authentication","JWT generation with configurable expiration","token verification using server-side secret","scalable authentication without server-side session storage"],
["helmet for HTTP security header configuration","Content-Security-Policy preventing XSS attacks","X-Content-Type-Options preventing MIME sniffing","X-Frame-Options protecting against clickjacking"],
["express-rate-limit for API request throttling","one hundred requests per fifteen minutes per IP address","configurable window and limit parameters","effective protection against API abuse and DoS attacks"],
["express-mongo-sanitize for injection prevention","removal of dollar signs from query parameters","blocking dangerous MongoDB operators","critical defense against NoSQL injection vulnerabilities"]
]],
["3.3 Frontend Framework and Build Tools",[
["React 18 with modern hooks-based architecture","component composition for reusable UI elements","useState and useEffect for local state management","useContext for accessing global provider state"],
["React Router DOM 6 for client-side navigation","BrowserRouter for clean URL structure without hash","nested route configurations for admin panel","lazy loading for route-based code splitting"],
["Vite 5 as next-generation build tool","native ES module support for fast development server","Hot Module Replacement for instant code updates","Rollup-based production builds with tree shaking"],
["Tailwind CSS 3 for utility-first styling","custom agriculture-themed color palette configuration","responsive breakpoint system for all device sizes","JIT compilation for minimal production CSS output"]
]],
["3.4 Animation and UI Enhancement Libraries",[
["Framer Motion 10 for declarative animations","page transition effects with AnimatePresence","scroll-triggered reveals using whileInView","hover and gesture animations for interaction feedback"],
["Axios for HTTP communication with interceptors","request interceptor attaching JWT authorization headers","response interceptor handling 401 unauthorized errors","consistent API communication pattern across all components"],
["react-helmet-async for document head management","per-page title and meta tag configuration","Open Graph and Twitter Card support for social sharing","search engine optimization through structured metadata"],
["Lenis for smooth scrolling behavior","configurable lerp values for scroll feel","easing curves for natural scroll deceleration","integration with Framer Motion for animation syncing"]
]]
]],
["04","Environment Setup and Installation",[
["4.1 System Prerequisites",[
["Node.js runtime version 14 or higher","npm package manager version 8 or higher","MongoDB Atlas account with free tier cluster","Git distributed version control system"],
["Visual Studio Code with ESLint extension","Tailwind CSS IntelliSense for development productivity","Postman or Insomnia for API endpoint testing","MongoDB Compass optional for database exploration"]
]],
["4.2 Environment Variable Configuration",[
["PORT server port defaulting to 5000","MONGO_URI MongoDB Atlas connection string","JWT_SECRET token signing key with strong random value","JWT_EXPIRES_IN token lifetime defaulting to 30 days"],
["FRONTEND_URL allowed CORS origin matching deployment","NODE_ENV environment mode for behavior control","SMTP_HOST and SMTP_PORT for email server","SMTP_USER and SMTP_PASS for email authentication"],
["CLOUDINARY_URL optional cloud image storage","each variable documented in .env.example template","sensible development defaults provided","easy environment reproduction across team members"]
]],
["4.3 Step-by-Step Installation Process",[
["clone repository using git clone command","navigate to project root directory","run npm run install:all for complete dependency installation","hierarchical installation across root, backend, and frontend"],
["copy backend/.env.example to backend/.env","configure each variable for local environment","set JWT_SECRET to cryptographically strong random value","verify MongoDB Atlas connection string includes credentials"],
["run npm run dev to start development servers","backend initializes on port 5000","frontend starts on port 5173 with Vite","automatic API proxy forwarding configured"]
]],
["4.4 Verification and Validation Steps",[
["verify backend by visiting localhost:5000/api/crops","confirm JSON response with crop data array","verify frontend at localhost:5173 loading pages","check console for MongoDB Connected log message"],
["test authentication flow with Postman or browser","register new user account with email and password","login with created credentials receiving JWT token","access protected endpoint using received token"],
["verify admin panel by creating admin user","test CRUD operations on sample resources","confirm file upload with sample image","validate theme switching between light and dark modes"]
]],
["4.5 Common Issues and Troubleshooting",[
["MongoDB connection failures from invalid URIs","verify username and password in connection string","check Atlas IP whitelist includes current address","confirm network allows outbound MongoDB connections"],
["port conflicts preventing server startup","change PORT variable in environment file","modify Vite server port in vite.config.js","verify no existing processes on target ports"],
["CORS errors blocking frontend API requests","ensure FRONTEND_URL exactly matches browser origin","include protocol and port in origin value","verify no trailing slashes in URL configuration"]
]]
]],
["05","Backend Entry Point and Configuration",[
["5.1 Server Initialization and Setup",[
["Express application instance creation","MongoDB database connection establishment","complete middleware stack application in sequence","eleven route group mounting under /api prefix"],
["static file serving from uploads directory","404 handler for unmatched route requests","global error handler catching all exceptions","HTTP server initialization on configured port"],
["environment-aware configuration loading","development versus production mode differences","graceful shutdown handling for clean termination","robust server initialization ensuring reliability"]
]],
["5.2 Middleware Pipeline Architecture",[
["Helmet security headers as first middleware layer","compression for gzip response body encoding","CORS configuration for cross-origin request handling","security-first ordering preventing data exposure"],
["JSON body parser with ten megabyte size limit","URL-encoded parser for form submission handling","cookie parser for JWT cookie-based authentication","complete request payload processing capability"],
["mongo-sanitize for NoSQL injection prevention","Morgan HTTP request logging with format options","rate limiter enforcing API usage policies","route mount point for request distribution"],
["static file serving for uploaded content access","404 catch-all handler for undefined routes","centralized error handler for consistent responses","well-defined middleware ordering ensuring proper operation"]
]],
["5.3 Database Connection Management",[
["mongoose.connect with MONGO_URI environment variable","connection pooling for optimal throughput","auto-reconnection on temporary network interruptions","query buffering during connection establishment"],
["success logging with connected host information","failure logging with detailed error messages","process exit on connection failure preventing unstable state","robust database connectivity ensuring application reliability"]
]],
["5.4 Environment Configuration Management",[
["centralized config/config.js configuration module","type conversion for numeric configuration values","sensible development defaults for all variables","single source of truth eliminating scattered configuration"],
["all backend modules import configuration module","elimination of direct process.env access throughout codebase","improved testability through configuration injection","consistent environment-aware application behavior"]
]]
]],
["06","Database Models",[
["6.1 Data Modeling Conventions and Patterns",[
["consistent schema patterns across all nine models","automatic timestamps for createdAt and updatedAt tracking","field validation through required, enum, and min/max constraints","database indexes for frequently queried field optimization"],
["toJSON transform for serialization control","automatic __v field removal from responses","sensitive field exclusion like passwords","consistent data presentation across all endpoints"],
["PascalCase naming convention for model classes","camelCase naming for model source files","appropriate Mongoose data types for each field","sensible default values for optional fields"]
]],
["6.2 Crop Model Schema and Fields",[
["name field as required unique identifier","category enumeration with eight agricultural classifications","description field for comprehensive cultivation information","primary crop data model serving information needs"],
["growingSeason specifying optimal planting periods","soilType indicating preferred ground conditions","waterNeeds describing irrigation requirements","daysToMaturity as numeric cultivation duration"],
["image field for crop photograph URL storage","additional info fields for extensible metadata","category-based filtering for organized browsing","full CRUD API support for data management"]
]],
["6.3 Product Model Schema and Fields",[
["name and description for product identification","category enumeration for marketplace classification","price field with minimum value validation","stock tracking with default zero quantity"],
["images array supporting multiple product photographs","isFeatured flag enabling promotional display","rating aggregation for quality feedback","e-commerce ready data structure supporting transactions"],
["category filtering for catalog organization","featured product queries for homepage marketing","stock awareness preventing overselling","extensible schema supporting future commerce features"]
]],
["6.4 User Model Schema and Fields",[
["name for user identification and display","email with unique index for login identification","lowercase conversion for case-insensitive matching","password hashed via bcryptjs pre-save hook"],
["role field with user and admin enum values","phone and address for profile completeness","avatar for profile image display","timestamps for account activity tracking"],
["toJSON transform excluding password from responses","comparePassword instance method for login verification","bcrypt.compare for secure password comparison","comprehensive user management model"]
]],
["6.5 Supporting Models Overview",[
["Blog model for content publishing","title, content, author, tags, image fields","timestamps for publication management","categorized and searchable content storage"],
["Inquiry model for contact form management","name, email, phone, message, isRead fields","read and unread submission tracking","organized communication workflow support"],
["Testimonial model for social proof","name, role, content, image, rating fields","star rating for quality feedback","customer experience representation"],
["FAQ model for information management","question, answer, order fields","sorted display ordering","structured knowledge base support"],
["Service model for platform offerings","title, description, icon, features, isActive fields","active service filtering","organized platform capability presentation"],
["Gallery model for media management","title, image, category fields","category filtering for organized display","visual content management support"],
["Analytics model for usage tracking","path and count fields","page view count aggregation","usage pattern analysis support"]
]]
]],
["07","API Routes and Controllers",[
["7.1 Routing Architecture and Patterns",[
["resource-based route file organization","separate route file per resource group","Express Router instance for each resource","consistent URL structure across all endpoints"],
["mounting under /api/resource-name URL pattern","HTTP method to CRUD operation mapping","middleware chain per route definition","controller function as request handler"],
["separation of route definitions from controller logic","routes defining HTTP interface only","controllers implementing business logic","middleware handling cross-cutting concerns"],
["asyncHandler wrapper for error propagation","elimination of try-catch boilerplate code","automatic error forwarding to global handler","consistent error handling across all routes"]
]],
["7.2 Crop and Product API Endpoints",[
["GET /api/crops listing all crops with filtering","GET /api/crops/:id for single crop detail","POST /api/crops for creating new crops (admin)","PUT /api/crops/:id for updating crops (admin)","DELETE /api/crops/:id for removing crops (admin)"],
["GET /api/products with category query filtering","GET /api/products/:id for single product detail","POST /api/products for creating products (admin)","PUT /api/products/:id for updating products (admin)","DELETE /api/products/:id for removing products (admin)"],
["consistent CRUD pattern across resource endpoints","standardized JSON response format","pagination support for list endpoints","query parameter support for filtering and search"],
["GET /api/blogs with search query parameter","GET /api/blogs/:id for single article","POST, PUT, DELETE for admin blog management","search and filtering across content resources"]
]],
["7.3 Authentication and User Endpoints",[
["POST /api/users/register for account creation","name, email, password body parameters","duplicate email detection returning 409 status","bcrypt password hashing before database storage"],
["POST /api/users/login for authentication","email and password credential validation","401 response for invalid credentials without specificity","JWT token generation on successful authentication"],
["GET /api/users/me for current user profile","requires valid JWT in Authorization header","returns complete user data excluding password","PUT /api/users/me for profile updates"],
["GET /api/users for admin user listing","DELETE /api/users/:id for admin user removal","admin role verification for sensitive operations","comprehensive user lifecycle management"]
]],
["7.4 Content Management and Utility Endpoints",[
["Inquiry routes: POST create, GET list (admin), DELETE remove (admin)","read and unread tracking for submission management","efficient communication workflow for administrators"],
["Testimonial routes: GET public list, full CRUD admin","social proof content management","rating-based sorting capabilities"],
["FAQ routes: GET sorted public list, admin CRUD","ordered question and answer management","searchable knowledge base support"],
["Service routes: GET active public list, admin CRUD","active service filtering for public display","platform offering management"],
["Gallery routes: GET filtered public list, admin CRUD","category-based filtering for organized display","visual content management"],
["Analytics routes: POST track page view, GET aggregated stats","thirty-day aggregation for trend analysis","per-page breakdown for content insight"],
["Upload routes: POST single file with type validation","image format acceptance: jpg, png, gif, webp","five megabyte maximum file size","file metadata return for database storage"]
]]
]],
["08","Middleware and Utilities",[
["8.1 Authentication Middleware Implementation",[
["JWT extraction from Authorization Bearer header","token verification using jsonwebtoken.verify","JWT_SECRET from configuration for signing","user lookup by decoded ID from database"],
["user object attachment to req.user for downstream use","401 status response on verification failure","TokenExpiredError handling for expired tokens","JsonWebTokenError handling for malformed tokens"],
["applied to all protected route definitions","consistent authentication enforcement across API","extensible authorization foundation","essential security component for application"]
]],
["8.2 Error Handling Middleware",[
["centralized error catching via next(error) pattern","custom ErrorResponse class extending Error","statusCode property for HTTP response codes","preservation of thrown error status codes"],
["default status code of 500 for unclassified errors","JSON error response with consistent format","success false indicator in response body","stack trace inclusion in development mode only"],
["production mode stack trace exclusion","sensible error messages for common failure modes","single error handling entry point","reduced error handling code duplication"]
]],
["8.3 Async Handler Utility",[
["wrapper function eliminating try-catch blocks","return of promise catching errors automatically","error forwarding to Express next function","consistent error propagation across all controllers"],
["used by every controller function","reduced boilerplate in controller code","simplified controller implementation","enhanced code readability and maintainability"]
]],
["8.4 Upload and Configuration Utilities",[
["multer-based file upload handling middleware","disk storage configuration for file persistence","image type validation against allowed formats","file size limit enforcement at five megabytes"],
["descriptive error messages for rejected uploads","config/db.js for centralized database connection","config/config.js for environment variable management","improved code organization through utility separation"]
]]
]],
["09","Frontend Structure",[
["9.1 Build and Development Configuration",[
["Vite 5 with React plugin for JSX support","development server proxy for /api route forwarding","proxy target to backend at localhost:5000","seamless development without CORS configuration"],
["path alias @ resolving to src directory","Tailwind CSS JIT mode for optimized compilation","PostCSS with autoprefixer for vendor prefixing","modern build pipeline for efficient development"],
["entry point main.jsx rendering App component","BrowserRouter wrapping for client-side routing","React.StrictMode for development warnings","clean application initialization"]
]],
["9.2 Source Code Organization",[
["context directory for React provider components","ThemeContext for theme state management","AuthContext for authentication state","AppContext for global application state"],
["components directory organized by usage scope","common subdirectory for ten reusable components","home subdirectory for ten page section components","admin subdirectory for seven panel components"],
["pages directory for route-level components","thirteen lazy-loaded page components","Suspense wrapper with loading spinner","code splitting for optimized bundle loading"],
["hooks directory for custom React logic","useAuth, useTheme, useFetch, useForm, useClickOutside","reusable logic extracted from components","consistent hook naming conventions"],
["animations directory for Framer Motion variants","fade, stagger, scale, slide, and text animation definitions","named variant exports for component import","organized animation code separation"]
]],
["9.3 Client-Side Routing Configuration",[
["fifteen routes defined with React Router DOM","home route at root path","about, crops, products information routes","blog list and detail routes with parameter"],
["gallery, contact, FAQ public resource routes","login and register authentication routes","profile protected user route","admin nested routes with seven sub-pages"],
["all page components using React.lazy lazy loading","Suspense wrapper with spinner fallback","reduced initial bundle size through code splitting","wildcard route for 404 not-found handling"]
]]
]],
["10","Context Providers",[
["10.1 ThemeProvider for Theme Management",[
["React context creation for theme state","localStorage persistence for user preference","dark class application on HTML element","Tailwind dark mode integration via class strategy"],
["initial theme from localStorage with system fallback","prefers-color-scheme media query detection","toggleTheme function for manual switching","consistent theme API for all components"],
["useTheme hook returning theme and toggle function","isDark boolean for conditional rendering","wraps entire application in App.jsx","comprehensive theme management solution"]
]],
["10.2 AuthProvider for Authentication",[
["authentication lifecycle from mount to logout","localStorage token check on application start","GET /api/users/me call for token validation","user state, loading indicator, and error tracking"],
["login function with token storage and header configuration","register function for new account creation","logout function for state cleanup and token removal","complete authentication API for application"],
["Axios default Authorization header configuration","response interceptor monitoring for 401 errors","automatic token cleanup on expiration","protected route rendering based on auth state"]
]],
["10.3 AppProvider and Provider Architecture",[
["global state for page loading indicators","alert notification system with auto-dismiss","cross-component communication channel","shared UI state management without prop drilling"],
["hierarchical provider nesting for correct context availability","ThemeProvider as outermost for theme access","AuthProvider inside for auth-dependent features","AppProvider innermost wrapping application content"],
["combined AppProviders export for cleaner composition","consistent provider ordering across application","reduced App.jsx complexity","scalable state management architecture"]
]]
]],
["11","Routing and Pages",[
["11.1 Home Page Section Architecture",[
["Hero section with animated gradient background","call-to-action buttons linking to key features","TextGenerateEffect for animated headline reveal","first impression establishing platform purpose"],
["Stats section with animated counting display","platform metrics showing user adoption","scroll-triggered animation for engagement","social proof through numerical evidence"],
["Crops carousel with auto-scrolling navigation","featured crop showcase with details","manual navigation controls for user interaction","discovery interface for crop database"],
["Services grid with hover effect cards","platform offering overview with icons","interactive card animation for engagement","organized service presentation"],
["Products showcase with category filtering","featured product display with prices","category tabs for filtered browsing","marketplace preview driving engagement"],
["Testimonials carousel with auto-play rotation","user feedback and success stories","star rating display for credibility","social proof building trust"],
["Gallery section with filterable grid","categorized media display","image thumbnail grid for visual browsing","visual content engagement"],
["Newsletter section with email validation","subscription form with validation","community building tool","user engagement and retention feature"]
]],
["11.2 Content and Authentication Pages",[
["About page with platform mission and timeline","company story and development history","team and value proposition presentation","brand building and trust establishment"],
["Crops page with full database grid","category filtering for organized browsing","detail modal with complete crop information","comprehensive crop reference tool"],
["Products page with category-based filtering","price display and stock indicators","shopping cart integration point","product discovery and browsing experience"],
["Blog page with search functionality","article list with preview content","keyword search for content discovery","knowledge base access point"],
["Gallery page with lightbox viewing","category-filtered image display","full-screen image preview","visual content showcase"],
["Contact page with form and embedded map","message submission with validation","location information for physical presence","communication channel for inquiries"],
["FAQ page with accordion interaction","expandable question and answer display","categorized FAQ organization","self-service information resource"],
["Login and Register pages with form validation","email and password authentication forms","client-side validation with error display","secure credential collection interface"],
["Profile page for personal information management","editable name, email, phone, address fields","pre-filled form from auth state","personal data management interface"]
]],
["11.3 Admin Page Structure",[
["private layout with sidebar and header","navigation sidebar with active state","header showing logged-in user info","Outlet for sub-page content rendering"],
["admin role verification on route access","user.role === admin check","redirect to home with error on failure","defense-in-depth access control"],
["Dashboard with statistics and charts","metric cards for key platform data","thirty-day page view trend chart","platform health overview"],
["Manage Crops with searchable data table","CRUD modal for create and edit","pagination and sorting for large datasets","efficient crop data management"],
["Manage Products with similar management pattern","category filtering in data table","CRUD operations with image upload","product catalog administration"],
["Manage Blogs with rich text editor","content creation with formatting tools","tag management for categorization","blog publishing workflow"],
["Manage Inquiries with status tracking","read and unread submission management","contact form administration","communication workflow oversight"],
["Manage Users with role display and deletion","user account administration","role-based access management","platform user oversight"],
["Settings for platform configuration","application settings management","platform customization options","administrative configuration interface"]
]]
]],
["12","Components and Hooks",[
["12.1 Common Reusable UI Components",[
["Navbar with responsive mobile menu","sticky positioning with glass-morphism on scroll","theme toggle button for dark/light switching","auth-aware link rendering for login or profile"],
["hamburger menu below lg breakpoint","conditional navigation items based on auth","consistent navigation across all routes","responsive navigation design"],
["Footer with sitemap and social links","organized link sections for navigation","newsletter subscription form","complete site footer information"],
["Button component with variant support","primary, secondary, outline style variants","size options for different contexts","loading state with spinner display"],
["Input component with validation states","label and error message display","controlled input pattern support","accessible form input component"],
["Card component for content containers","consistent card styling across application","flexible content composition","reusable container pattern"],
["Modal component for overlay dialogs","backdrop with click-outside close","keyboard escape key support","accessible dialog implementation"],
["Badge for status indicator display","color-coded status visualization","compact information display","status communication component"],
["Spinner for loading state indication","configurable size and color","centered loading display","asynchronous operation feedback"],
["Alert for notification display","success, error, warning, info variants","auto-dismiss timer support","user notification system"],
["SkeletonLoader for placeholder content","animated loading placeholder","content-aware sizing","improved perceived performance"]
]],
["12.2 Home Page Section Components",[
["Hero with TextGenerateEffect animation","gradient background with overlay","call-to-action button integration","page introduction and branding"],
["Stats with count-up animation on viewport entry","scroll-triggered number animation","platform metric display","engagement and social proof"],
["CropCarousel with auto-scrolling behavior","manual navigation arrow controls","featured crop card display","crop discovery interface"],
["ServicesGrid with hover card animation","service icon and description display","interactive card effects","platform offering showcase"],
["AboutSection with timeline presentation","platform development history","mission and vision display","brand story telling"],
["TestimonialsCarousel with auto-play rotation","user review card display","star rating visualization","social proof presentation"],
["ProductsShowcase with tab filtering","category tab navigation","product card with price display","marketplace preview"],
["BlogPreview with article cards","recent blog post display","read more navigation","content discovery integration"],
["GallerySection with filterable grid","category filter buttons","image thumbnail display","visual content browsing"],
["Newsletter with form validation","email input with validation","subscription button","community building feature"]
]],
["12.3 Admin Panel Components",[
["Sidebar with navigation links","active route highlighting","collapsible responsive design","admin navigation structure"],
["DataTable for tabular data display","search input for filtering","sortable column headers","pagination controls for large datasets"],
["FormModal for create and edit operations","form field rendering with validation","submit and cancel actions","consistent CRUD interface"],
["StatCard for metric visualization","icon, label, and value display","trend indicator support","dashboard metric presentation"],
["Chart component with recharts integration","bar chart for view trends","configurable chart dimensions","data visualization support"],
["ImageUpload with preview functionality","file selection and type validation","preview before upload","upload progress indication"],
["ConfirmDialog for destructive action confirmation","action description and warning","confirm and cancel options","accidental action prevention"]
]],
["12.4 Custom React Hooks",[
["useAuth wrapping AuthContext access","user, loading, login, register, logout return","convenience hook for auth state","consistent auth access pattern"],
["useTheme wrapping ThemeContext access","theme, toggleTheme, isDark return","convenience hook for theme state","consistent theme access pattern"],
["useFetch for GET request management","loading and error state tracking","automatic request dispatch","data fetching abstraction"],
["useForm for form state and validation","field value management","validation rule configuration","form submission handling"],
["useClickOutside for element detection","dropdown and modal closing","ref-based outside click detection","interactive element behavior"],
["all hooks following React naming conventions","consistent return value patterns","TypeScript ready interface design","reusable logic extraction pattern"]
]]
]],
["13","Admin Panel",[
["13.1 Dashboard and Navigation",[
["statistics cards showing key platform metrics","total crops, products, blogs, and inquiries counts","visual overview of platform content","quick status assessment for administrators"],
["thirty-day page view trend visualization","recharts bar chart for daily view data","per-page breakdown for content analysis","traffic pattern identification and insight"],
["sidebar navigation to all management sections","active route visual highlighting","responsive collapsible on smaller screens","consistent navigation experience across admin"],
["user information display in admin header","logged-in user identification","role indication for context","personalized admin interface"]
]],
["13.2 Content Management Workflows",[
["Manage Crops: data table with search","CRUD modal with field validation","image upload for crop photographs","complete crop lifecycle management"],
["Manage Products: category filtering support","price and stock management fields","image gallery management","product catalog administration"],
["Manage Blogs: rich text editor integration","tag management for categorization","publish and draft status control","content publishing workflow"],
["Manage Inquiries: submission status tracking","read and unread toggle functionality","contact form response management","communication workflow oversight"],
["Manage Users: complete user listing","role display and management","account deletion with confirmation","user base administration"],
["toast notifications for operation feedback","success confirmation on completed actions","error details on failed operations","responsive user interface feedback"],
["optimistic UI updates for immediate response","client-side state update before server confirmation","smooth and responsive user experience","reduced perceived latency"]
]]
]],
["14","Animations and Theming",[
["14.1 Framer Motion Animation System",[
["animation variants defined in dedicated files","fadeIn with directional up, down, left, right variants","staggerChildren for sequenced parent-child timing","scaleOnHover providing interactive feedback"],
["slideIn variants for page transition effects","textReveal for character-by-character animation","named exports for component import","organized animation codebase"],
["AnimatePresence wrapping router Outlet","fade and slide combination for page transitions","mount and unmount animation support","smooth navigation experience"],
["whileInView for scroll-triggered reveals","configurable threshold for trigger timing","once:true for performance optimization","efficient scroll-based animations"],
["reduced-motion query support for accessibility","prefers-reduced-motion media query detection","automatic animation disable for user preference","inclusive animation design"]
]],
["14.2 Lenis Smooth Scroll Integration",[
["useSmoothScroll hook for Lenis initialization","Lenis library for smooth scrolling behavior","configurable lerp value for scroll feel","easing curves for natural motion"],
["Framer Motion useAnimationFrame synchronization","optimized performance through frame sync","breakpoint-based disabling for mobile","touch inertia for mobile scroll momentum"],
["wheel multiplier for scroll speed control","accessibility-friendly configuration","enhanced content browsing experience","polished scrolling across all pages"]
]],
["14.3 Theme Implementation",[
["Tailwind dark mode using class strategy","ThemeProvider programmatic class toggling","dark class on HTML element for CSS","seamless dark mode integration"],
["CSS custom properties for color tokens","light mode variables: white backgrounds, gray text","dark mode variables: dark backgrounds, light text","comprehensive color system for both modes"],
["accent colors in green range for brand consistency","custom cursor with magnetic hover effect","glass-morphism panels with backdrop blur","animated gradient backgrounds with color shifts"],
["responsive design with mobile-first breakpoints","sm: 640px for mobile landscape","md: 768px for tablet portrait","lg: 1024px for tablet landscape and desktop","xl: 1280px for large desktop displays"],
["navigation collapse to hamburger below lg","grid reflow from 4 to 2 to 1 columns","fullscreen modals on mobile devices","scaled typography for small screens"]
]]
]],
["15","API Reference",[
["15.1 Authentication Endpoint Details",[
["POST /api/users/register with JSON body","body parameters: name, email, password","success response 201 with JWT and user data","error 409 on duplicate email address"],
["POST /api/users/login with JSON body","body parameters: email, password","success response 200 with JWT and user data","error 401 on invalid credentials without specificity"],
["GET /api/users/me with Authorization header","success response 200 with user profile data","error 401 without valid authentication","protected endpoint for user data access"],
["PUT /api/users/me for profile updates","body parameters: name, email, phone, address","success response 200 with updated data","authentication required for access"]
]],
["15.2 Resource Management Endpoint Details",[
["GET endpoints with query parameter support","category filtering: ?category=value","text search: ?search=keyword","sorting: ?sort=fieldname"],
["pagination: ?page=1 and ?limit=10 parameters","pagination metadata in response including total pages","consistent pagination across all list endpoints","efficient data retrieval for large collections"],
["POST endpoints with JSON body for creation","success response 201 with created resource","validation errors 400 with field details","admin authentication required for mutation"],
["PUT endpoints with partial JSON for updates","success response 200 with updated resource","not found 404 on invalid identifier","admin authentication for protected resources"],
["DELETE endpoints for resource removal","success response 200 with confirmation","not found 404 on invalid identifier","admin authentication for deletion"]
]],
["15.3 File Upload and Response Format Details",[
["POST /api/upload for file upload","multipart/form-data content type","field name: file","accepted formats: jpg, jpeg, png, gif, webp"],
["maximum file size: five megabytes","success response 200 with file metadata","filename, path, size, mimetype in response","error 400 on invalid file type or size"],
["standard success response format","wrapping object with success boolean field","data field containing response payload","count field for array responses"],
["standard error response format","success false in error responses","error object with message string","stack trace in development mode only"],
["HTTP status code conventions","200 for successful GET, PUT, DELETE","201 for successful resource creation","400 for validation and bad request errors"],
["401 for authentication failures","403 for authorization failures","404 for resource not found","409 for resource conflicts like duplicate emails"]
]]
]],
["16","Authentication Flow",[
["16.1 Registration Process Flow",[
["user completes registration form with required fields","frontend validates email format for correctness","password minimum length of six characters enforced","client-side validation before server submission"],
["POST request sent to /api/users/register endpoint","backend checks for existing email in database","409 Conflict returned on duplicate email detection","required field validation on server side"],
["password hashing with bcryptjs twelve salt rounds","approximately 250 milliseconds for hash computation","User document creation in MongoDB database","JWT token generation with user ID payload"],
["thirty day token expiration for user convenience","token and user data returned to frontend","localStorage token storage for persistence","AuthProvider state update with user data"],
["automatic page redirect to home on success","error display for validation failures","seamless registration experience","complete account creation workflow"]
]],
["16.2 Login Process Flow",[
["user submits email and password on login form","POST request to /api/users/login endpoint","case-insensitive email lookup in database","401 response if no matching user found"],
["bcrypt.compare for secure password verification","constant-time comparison preventing timing attacks","401 response on password mismatch without field specificity","successful authentication triggers JWT generation"],
["JWT with user ID payload and thirty day expiration","token and user data returned to client","localStorage token persistence","Authorization header configuration on Axios"],
["AuthProvider state update with user and token","home page redirect after successful login","error display for authentication failures","secure and reliable login workflow"]
]],
["16.3 Token Management and Session Handling",[
["JWT payload containing user identifier","signed with JWT_SECRET from environment configuration","thirty day configurable expiration period","stateless authentication without server session storage"],
["Axios request interceptor for automatic token attachment","Authorization header set with Bearer scheme","consistent authentication on every API request","centralized token management pattern"],
["Axios response interceptor for 401 monitoring","automatic token clearance on unauthorized response","redirect to login page on expired token","seamless session expiration handling"],
["AuthProvider mount validation for existing tokens","GET /api/users/me call on application start","automatic cleanup of expired or invalid tokens","consistent authentication state initialization"]
]]
]],
["17","Security",[
["17.1 Authentication Security Implementation",[
["bcryptjs password hashing with twelve salt rounds","computationally expensive hash function","approximately 250 milliseconds per hash operation","strong protection against brute force cracking attempts"],
["JWT token signing with server-side secret","cryptographically signed token payload","tamper-proof token validation","stateless and scalable authentication architecture"],
["no plaintext password storage in database","passwords excluded from JSON responses","toJSON transform removing sensitive fields","defense-in-depth for credential protection"],
["HttpOnly cookie option available for production","XSS-resistant token storage alternative","enhanced security for sensitive deployments","flexible token storage configuration"],
["rate limiting on authentication endpoints","one hundred requests per fifteen minute window","brute force and credential stuffing prevention","combined with bcrypt computational cost for robust protection"]
]],
["17.2 API Security Measures",[
["Helmet security headers comprehensive configuration","Content-Security-Policy preventing XSS and data injection","X-Content-Type-Options preventing MIME type sniffing","X-Frame-Options protecting against clickjacking attacks"],
["express-mongo-sanitize for NoSQL injection prevention","automatic removal of dollar signs from queries","blocking dangerous MongoDB query operators","critical injection attack defense layer"],
["CORS restricted to single allowed frontend origin","protocol, domain, and port specific configuration","prevention of unauthorized cross-origin requests","controlled API access policy"],
["request body size limitations for attack prevention","ten megabyte limit for JSON payloads","five megabyte limit for file uploads","resource exhaustion attack mitigation"],
["static file serving restricted to uploads directory","no directory traversal vulnerability","controlled file access pattern","secure file serving configuration"]
]],
["17.3 Frontend Security Practices",[
["React automatic JSX output encoding","XSS attack prevention through escaping","safe rendering of user-supplied content","built-in framework security protection"],
["VITE_ prefixed environment variables","compile-time embedding in application bundle","no runtime environment variable exposure","secure configuration management"],
["Axios interceptor centralized token management","reduced token leakage risk","consistent authentication pattern","secure HTTP communication"],
["no sensitive business logic in client code","authentication and authorization on server","client-side checks for UX only","defense-in-depth access control architecture"],
["admin route protection on both client and server","client-side UI conditional rendering","server-side middleware authorization enforcement","layered security for administrative functions"]
]]
]],
["18","Deployment",[
["18.1 Production Build Configuration",[
["frontend npm run build in frontend directory","optimized bundle output in dist folder","code splitting via React.lazy route chunks","asset hashing for cache busting on updates"],
["CSS extraction and minification for optimal loading","tree shaking eliminating unused code","dead code elimination for minimal bundles","comprehensive production optimization"],
["backend NODE_ENV production configuration","detailed error message suppression for security","compression middleware activation for bandwidth","optimized Mongoose connection pool settings"],
["environment-specific configuration files","development, staging, production variants","no code changes required between environments","flexible environment management"]
]],
["18.2 Deployment and Hosting Options",[
["Vercel for frontend static hosting","automatic deployment from git repository","built-in SSL and CDN distribution","optimized for single-page applications"],
["Render or Railway for backend hosting","Node.js runtime environment support","automatic deployments from git","managed infrastructure with scaling"],
["DigitalOcean Droplets for full control","custom server configuration option","direct server access for customization","traditional hosting approach"],
["AWS EC2 for enterprise deployment","comprehensive infrastructure services","scalable cloud computing option","enterprise-grade hosting solution"],
["MongoDB Atlas across all deployment options","consistent database experience","automatic failover and backups","managed database without operational overhead"],
["environment variables configured per platform","hosting dashboard configuration interface","CLI tool alternatives for automation","consistent configuration management"]
]],
["18.3 CI/CD Pipeline Configuration",[
["GitHub Actions for automated workflow","lint checking on every push event","test suite execution for quality assurance","build verification before deployment"],
["main branch trigger for auto-deployment","frontend build to Vercel automatic deploy","backend build to Render automatic deploy","streamlined release process"],
["GitHub Secrets for environment variable management","secure credential storage during builds","automatic injection during deployment","no credential exposure in codebase"],
["post-deployment health verification checks","API health endpoint automated testing","frontend connectivity validation","authentication flow verification"]
]]
]],
["19","Production Readiness",[
["19.1 Current Implementation Status",[
["all core features implemented and verified","backend and frontend build without errors","thirty three API endpoints fully functional","authentication flow working end-to-end"],
["admin panel providing complete content management","responsive design across all device sizes","dark and light theme support implemented","smooth animation system operational"],
["platform ready for production deployment","comprehensive feature coverage","stable and tested codebase","production-quality implementation"]
]],
["19.2 Performance Optimizations",[
["React.lazy for route-based code splitting","reduced initial bundle load time","optimized chunk loading strategy","improved page load performance"],
["Framer Motion reduced-motion query support","accessibility-driven animation control","user preference respect","inclusive animation design"],
["Tailwind CSS purge for minimal stylesheets","elimination of unused utility classes","optimized CSS bundle size","reduced bandwidth consumption"],
["compression middleware for API responses","gzip encoding for reduced transfer size","faster response delivery","bandwidth optimization"],
["MongoDB indexes on frequently queried fields","improved query execution time","reduced database load","optimized data retrieval"],
["image validation in upload middleware","prevention of oversized uploads","type safety for uploaded content","resource management optimization"],
["Vite tree-shaken and minified production builds","dead code elimination","optimal bundle compression","efficient deployment artifacts"]
]],
["19.3 Testing and Monitoring Recommendations",[
["manual testing covering all CRUD operations","authentication flow verification across scenarios","responsive design validation on multiple devices","theme switching functionality testing"],
["Jest unit tests recommended for controllers","business logic verification","model method testing","unit-level quality assurance"],
["React Testing Library for component tests","user interaction simulation","rendering behavior verification","component-level quality assurance"],
["Cypress for end-to-end user flow testing","complete user journey simulation","integration testing across layers","regression prevention"],
["Sentry for production error tracking","real-time error monitoring and alerts","source map integration for debugging","error trend analysis"],
["Logtail or Papertrail for log aggregation","centralized log management","search and filter capabilities","operational insight from logs"],
["UptimeRobot or Pingdom for availability","service health monitoring","alert on downtime","service level agreement compliance"],
["MongoDB Atlas monitoring for database","query performance analysis","connection pool monitoring","database health oversight"]
]]
]],
["20","Future Enhancements",[
["20.1 E-Commerce Integration",[
["complete shopping cart with session persistence","add, remove, and update item quantities","persistent cart across browser sessions","foundation for online transaction capability"],
["checkout flow with payment gateway integration","Razorpay support for Indian payment processing","Stripe integration for international payments","secure payment processing infrastructure"],
["order management dashboard for administrators","order status tracking and updates","customer order history view","fulfillment workflow management"],
["invoice generation with GST and tax calculation","automatic tax computation","professional invoice documents","regulatory compliance for transactions"],
["shipping tracking with courier API integration","real-time shipment status","carrier integration for tracking updates","end-to-end delivery visibility"],
["inventory management with low-stock alerts","automatic reorder notifications","stock level monitoring","supplier notification integration"],
["new Order and Cart models required","existing Product model as foundation","extended database schema for commerce","scalable e-commerce architecture"]
]],
["20.2 Artificial Intelligence Features",[
["crop disease detection using image recognition","photograph analysis for disease identification","instant diagnosis and treatment recommendations","AI-powered agricultural assistance"],
["personalized crop recommendations from soil analysis","soil data integration for tailored suggestions","local climate and weather pattern consideration","data-driven farming decisions"],
["weather API integration for automated alerts","planting and harvesting timing notifications","adverse weather condition warnings","proactive agricultural alerts"],
["NLP chatbot for farmer queries","regional language understanding capability","agricultural knowledge base access","24/7 farmer assistance availability"],
["yield prediction using historical data analysis","machine learning model for forecasting","data-driven crop planning support","agricultural business intelligence"],
["market price forecasting for crop planning","historical price trend analysis","future price prediction insights","informed selling decision support"]
]],
["20.3 Community and Mobile Platform",[
["farmer forum with Q&A capabilities","community question and answer platform","peer knowledge sharing and support","collective agricultural wisdom repository"],
["expert sessions with agronomists","scheduled Q&A events with experts","live interaction opportunities","expert knowledge accessibility"],
["peer-to-peer marketplace for direct sales","farmer-to-farmer transaction platform","local agricultural product exchange","community commerce enablement"],
["cooperative buying groups for bulk discounts","group purchasing power aggregation","cost reduction through bulk orders","community economic benefit"],
["event management for workshops and webinars","agricultural training event organization","registration and attendance management","educational program support"],
["achievement badges and reputation system","platform participation incentives","gamification for user engagement","community contribution recognition"],
["React Native mobile application","offline-first architecture design","push notification support for alerts","GPS integration for field mapping"],
["barcode scanning for product lookup","quick product identification and pricing","inventory management on mobile","convenient shopping experience"],
["voice input supporting regional languages","accessibility for users with limited literacy","regional language speech recognition","inclusive design for diverse users"],
["camera integration for crop imaging","field documentation and monitoring","disease detection photo capture","visual agricultural record keeping"]
]],
["20.4 Multi-Tenant and Localization",[
["regional instance support with tenant isolation","separate database and configuration per tenant","custom branding and feature sets","scalable multi-tenant architecture"],
["customizable branding per regional instance","tenant-specific logos and color schemes","localized content management","flexible white-label solution"],
["Indian language localization support","Hindi, Tamil, Telugu, Marathi, Bengali translations","translated UI and content","accessible to non-English speaking farmers"],
["GST and tax calculation integration","automated tax computation for transactions","regulatory compliance automation","financial accuracy for e-commerce"],
["role-specific dashboards for user types","farmer, supplier, expert, admin views","tailored interface per role","personalized user experience"],
["data export and import tools","interoperability with other agricultural systems","CSV and JSON format support","data portability and integration"]
]]
]]
];

function buildContent(){
 var C=[];
 C.push(S(2500));
 C.push(CT("GreenHarvest",56,"2E7D32"));
 C.push(CT("Agriculture Platform",40,"4CAF50"));
 C.push(S(600));
 C.push(CT("Complete Technical Documentation",28,"666666"));
 C.push(S(400));
 C.push(CT("Version 1.0.0",22,"999999"));
 C.push(S(1200));
 C.push(CT("A full-stack agriculture management platform built with the MERN stack",20,"888888"));
 C.push(BP());
 C.push(H(1,"Table of Contents"));
 C.push(S(100));
 CH.forEach(function(ch){C.push(new Paragraph({spacing:{after:30},tabStops:[{type:TabStopType.RIGHT,position:9360}],children:[new TextRun({text:ch[0]+". "+ch[1],size:20})]}))});
 C.push(BP());
 CH.forEach(function(ch){
  C.push(H(1,ch[0]+". "+ch[1]));
  ch[2].forEach(function(sec){
   C.push(H(2,sec[0]));
   sec[1].forEach(function(item){
    if(item.length>=4){C.push(P("The platform implements "+item[0]+". This uses a "+item[1]+" approach, providing "+item[2]+" and ensuring "+item[3]+"."))}
    else{C.push(P(item.join(". ")+"."))}
   })
  });
  C.push(BP())
 });
 C.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:600},children:[new TextRun({text:"--- End of Document ---",size:22,color:"999999",italics:true})]}));
 C.push(S(200));
 C.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"GreenHarvest Agriculture Platform v1.0.0",size:18,color:"AAAAAA"})]}));
 C.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"Built with Node.js, Express, MongoDB, React, Vite, and Tailwind CSS",size:18,color:"AAAAAA"})]}));
 return C
}

async function main(){
 var children=buildContent();
 var doc=new Document({
  styles:{default:{document:{run:{size:22,font:"Inter"},paragraph:{spacing:{after:120,line:276}}}}},
  sections:[{
   properties:{page:{margin:{top:1440,bottom:1440,left:1440,right:1440}}},
   headers:{default:new Header({children:[new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:"GreenHarvest Agriculture Platform - Technical Documentation",size:16,color:"999999",italics:true})]})]})},
   footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"Page ",size:16,color:"999999"}),new TextRun({text:"| Confidential",size:16,color:"999999"})]})]})},
   children:children
  }]
 });
 var buffer=await Packer.toBuffer(doc);
 fs.writeFileSync(O,buffer);
 console.log("Document generated: "+O);
 console.log("File size: "+(buffer.length/1024).toFixed(0)+" KB")
}
main().catch(console.error)
