# Developer Portfolio & Blog

A modern, full-stack portfolio and blog platform built with Next.js 16, featuring a protected admin dashboard for content management.

## Features

### Public-Facing

- **Portfolio Page** - Showcase personal information, skills, experience, and education
- **Project Showcase** - Display featured and regular projects with detailed information
- **Blog System** - Publish articles with full markdown support
- **Responsive Design** - Mobile-first, fully responsive UI using Tailwind CSS
- **SEO Optimized** - Metadata and structured content for search engines

### Admin Dashboard

- **Protected Routes** - Secure authentication with HTTP-only cookies
- **Portfolio Management** - Update personal information and contact details
- **Project CRUD** - Create, read, update, and delete projects
- **Blog CRUD** - Full blog post management with draft/publish status
- **Dashboard Overview** - Statistics and recent content at a glance

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Language:** TypeScript
- **Data Storage:** JSON files (acting as API endpoints)
- **Authentication:** Cookie-based auth with middleware protection

## Project Structure

\`\`\`
├── app/
│   ├── (public routes)
│   │   ├── page.tsx              # Portfolio homepage
│   │   ├── showcase/             # Projects showcase
│   │   └── blog/                 # Blog listing & posts
│   ├── admin/                    # Protected admin dashboard
│   │   ├── layout.tsx            # Admin layout with auth check
│   │   ├── login/                # Admin login page
│   │   ├── portfolio/            # Portfolio settings
│   │   ├── projects/             # Project management
│   │   └── blogs/                # Blog management
│   └── api/                      # API routes
│       ├── auth/                 # Authentication endpoints
│       ├── portfolio/            # Portfolio data endpoint
│       ├── projects/             # Project CRUD endpoints
│       └── blogs/                # Blog CRUD endpoints
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── admin/                    # Admin-specific components
│   ├── header.tsx                # Public site header
│   └── footer.tsx                # Public site footer
├── lib/
│   ├── auth.ts                   # Authentication logic
│   ├── data-service.ts           # Data management service
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Utility functions
├── data/
│   ├── portfolio.json            # Portfolio data
│   ├── projects.json             # Projects data
│   └── blogs.json                # Blog posts data
└── proxy.ts                      # Next.js 16 middleware (formerly middleware.ts)
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone or download the project
2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Access

The admin dashboard is available at `/admin` and protected by authentication.

**Default Credentials:**
- Email: `admin@portfolio.com`
- Password: `admin123`

**Important:** Change these credentials in `lib/auth.ts` before deploying to production.

## API Endpoints

All API endpoints are located in the `/app/api` directory and serve/manage JSON data.

### Public Endpoints

- `GET /api/portfolio` - Get portfolio data
- `GET /api/projects` - Get all projects
- `GET /api/projects/[id]` - Get specific project
- `GET /api/blogs` - Get published blog posts
- `GET /api/blogs/slug/[slug]` - Get blog post by slug

### Protected Endpoints (Require Authentication)

- `PUT /api/portfolio` - Update portfolio data
- `POST /api/projects` - Create new project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- `POST /api/blogs` - Create new blog post
- `PUT /api/blogs/[id]` - Update blog post
- `DELETE /api/blogs/[id]` - Delete blog post

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

## Data Management

All data is stored in JSON files in the `/data` directory:

- `portfolio.json` - Personal information, skills, experience, education
- `projects.json` - Project showcase items
- `blogs.json` - Blog posts with content

The data service (`lib/data-service.ts`) provides CRUD operations for all data types.

## Security Features

1. **Protected Routes** - Middleware intercepts `/admin` routes and validates authentication
2. **HTTP-Only Cookies** - Auth tokens stored securely, not accessible via JavaScript
3. **Server-Side Validation** - All mutations require authentication check
4. **Type Safety** - TypeScript ensures data integrity throughout the application

## Customization

### Styling

- Modify `app/globals.css` for global styles and design tokens
- Update color schemes using CSS variables in `@theme` block
- Component styles use Tailwind CSS utility classes

### Content

- Edit JSON files in `/data` directory directly, or
- Use the admin dashboard to manage content via the UI

### Authentication

- Update credentials in `lib/auth.ts`
- For production, implement proper password hashing (bcrypt) and database storage

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Deploy with default settings
4. Update environment variables if needed

### Other Platforms

The application can be deployed to any platform that supports Next.js 16:
- AWS Amplify
- Netlify
- Railway
- Self-hosted with Docker

## Production Considerations

Before deploying to production:

1. **Change default admin credentials** in `lib/auth.ts`
2. **Implement proper password hashing** (bcrypt or similar)
3. **Add rate limiting** to API routes
4. **Set up proper environment variables** for API URLs
5. **Consider migrating from JSON files to a database** for better scalability
6. **Add image optimization** and CDN for assets
7. **Implement proper logging** and error tracking
8. **Add form validation** on both client and server
9. **Set up HTTPS** and security headers

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.
