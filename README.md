# Bolt Agency Operating System
 
A comprehensive agency management platform built with React, TypeScript, and Supabase.

## 🚀 Features

- **Project Management**: Organize work with Spaces, Folders, and Lists
- **Task Management**: Multiple views (List, Board, Calendar, Gantt)
- **Time Tracking**: Built-in timer and time logging
- **Team Collaboration**: Comments, mentions, and activity feeds
- **Client Portal**: Dedicated client access and approval workflows
- **Real-time Updates**: Live collaboration and notifications
- **Role-based Access**: Admin, Manager, Team Member, and Client roles

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **State Management**: React Context
- **UI Components**: Headless UI, Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## 🎨 Design System

Built with the Bolt Agency OS Design System featuring:
- Orange primary color palette (#f97316)
- Inter font family
- Consistent spacing and typography
- Component-based styling with Tailwind CSS

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd bolt-agency-os
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure Supabase:
   - Create a new Supabase project
   - Update `.env` with your Supabase URL and anon key
   - Run the database migrations from `supabase/migrations/`

5. Start the development server:
```bash
npm run dev
```

## 🗄️ Database Schema

The application uses a hierarchical structure:
- **Workspaces** → **Spaces** → **Folders** → **Lists** → **Tasks**

Key tables:
- `workspaces` - Top-level organization
- `spaces` - Project categories
- `folders` - Client or department groupings
- `lists` - Individual projects
- `tasks` - Work items with full lifecycle management
- `user_profiles` - User information and roles
- `time_entries` - Time tracking data

## 🚀 Deployment

The application is deployed on Netlify: https://lighthearted-dango-376206.netlify.app

To deploy your own instance:
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables for Supabase

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://lighthearted-dango-376206.netlify.app)
- [Design System Documentation](docs/design-system.md)
- [API Documentation](docs/api.md)# Portal
#   T a s k - A p p 
 
 
