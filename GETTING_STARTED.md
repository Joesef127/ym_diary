# 🚀 YMDiary - Getting Started Guide

Welcome to **YMDiary** - Your personal diary application built with modern web technologies!

## 📋 Quick Setup (5 minutes)

### Step 1: Install Dependencies

If you encountered issues with `npm install`, try these commands:

```bash
# Clear npm cache
npm cache clean --force

# Install dependencies
npm install

# If the above fails, try with legacy peer deps
npm install --legacy-peer-deps

# If bcrypt fails to compile, use this
npm install --build=from-source
```

### Step 2: Set Up Prisma & Database

```bash
# Generate Prisma Client
npx prisma generate

# Create the SQLite database and run migrations
npx prisma migrate dev --name init

# (Optional) View your database with Prisma Studio
npx prisma studio
```

### Step 3: Configure Environment Variables

The `.env.local` file has already been created. Verify it contains:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

**⚠️ Important**: Change `NEXTAUTH_SECRET` to a strong random value in production!

Generate a secure secret:
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Start the Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

## 🎯 First Steps After Starting

1. **Sign Up**: Create a new account with your email and password
2. **Create Your First Note**: Click "New Note" and start writing
3. **Edit Your Note**: Use the rich text formatting toolbar
4. **Save Your Note**: Click "Save" to persist to database
5. **View Notes**: Your notes appear in the sidebar with timestamps

## 🔧 Troubleshooting

### "PORT 3000 already in use"
```bash
# Use a different port
npm run dev -- -p 3001
```

### Prisma errors
```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database (careful! deletes all data)
rm prisma/dev.db
npx prisma migrate dev --name init
```

### Authentication not working
- Clear browser cookies
- Check `.env.local` file exists and has correct values
- Restart the dev server

### bcrypt compilation errors
```bash
# Install build tools (Windows)
npm install --global windows-build-tools

# Then reinstall
npm install
```

##  📁 Project Structure

```
ym_diary/
├── src/
│   ├── app/
│   │   ├── api/                    # Backend API routes
│   │   │   ├── auth/login
│   │   │   ├── auth/signup
│   │   │   └── notes/              # CRUD endpoints
│   │   ├── diary/page.tsx          # Main app interface
│   │   ├── login/page.tsx          # Login UI
│   │   ├── signup/page.tsx         # Signup UI
│   │   ├── layout.tsx              # Root layout
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── ui/                     # Reusable UI components
│   │   ├── rich-text-editor.tsx    # Text formatter
│   │   ├── note-item.tsx           # Note list item
│   │   └── loading.tsx             # Loading spinners
│   └── lib/
│       ├── utils.ts                # Utility functions
│       └── api-client.ts           # Axios configuration
├── prisma/
│   ├── schema.prisma               # Database schema
│   ├── dev.db                      # SQLite database (auto-created)
│   └── migrations/                 # Database migrations
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── tailwind.config.ts              # Tailwind config
└── README.md                       # Full documentation
```

## 🎨 Features Guide

### Creating a Note
1. Click **"New Note"** button in sidebar
2. Enter a **Title**
3. Write your content with optional formatting:
   - **Bold**: Select text → Click B button or use `**text**`
   - *Italic*: Use `*text*`
   - Headings: Use `## heading`
   - Lists: Start line with `- ` or `1. `
   - Code: Use `` `code` ``
   - Quotes: Start with `> `
4. Click **"Save"** when done

### Editing a Note
1. Click the note in the sidebar
2. Click **"Edit Note"** button
3. Modify title and content
4. Click **"Save"** to update

### Deleting a Note
1. Click the **three dots** (⋮) next to any note
2. Click **"Delete"**
3. Confirm deletion

### Viewing a Note
- Simply click any note in the sidebar to view it
- The note's full content appears in the main area
- Timestamps show when it was created or last updated

## 🔐 Security

- **Passwords**: Hashed with bcrypt (salt rounds: 10)
- **Tokens**: JWT with 7-day expiration
- **Cookies**: HTTP-only for XSS protection
- **Database**: User data isolated by `userId`

## 📦 Built With

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15.5 | React framework & API routes |
| React | 19.2 | UI library |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS | 3.4 | Styling |
| Radix UI | Latest | Accessible components |
| Prisma | 5.22 | Database ORM |
| SQLite | 3 | Database |
| bcrypt | 5.1 | Password hashing |
| JWT | 9.0 | Authentication |
| Framer Motion | 11.18 | Animations |
| Lucide React | 0.408 | Icons |

## 🚀 Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Docker Deployment
```bash
# Build image
docker build -t ymdiary .

# Run container
docker run -p 3000:3000 ymdiary
```

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript

# Database
npx prisma generate     # Generate Prisma Client
npx prisma studio       # Open Prisma Studio GUI
npx prisma migrate dev  # Create migration
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Radix UI Components](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

Open source - MIT License

## 💬 Support

If you encounter issues:

1. **Check the troubleshooting section** above
2. **Review the full README.md** for more details
3. **Check environment variables** (.env.local)
4. **Restart the dev server** after any changes
5. **Clear browser cache and cookies** if UI issues occur

## 🎉 You're All Set!

Start writing your diary entries today. YMDiary is ready to help you preserve your thoughts and memories!

---

**Happy writing! ✍️📓**
