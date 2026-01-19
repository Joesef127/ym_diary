# YMDiary - Personal Diary Application

A modern, beautiful, and secure personal diary application built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Prisma**.

## 🎯 Features

### Authentication
- **Secure Sign Up & Login** with password hashing (bcrypt)
- JWT token-based authentication
- Secure HTTP-only cookies
- Auto-logout on token expiration

### Diary Management
- ✍️ **Create** new diary notes with rich text support
- 📝 **Edit** existing notes
- 🗑️ **Delete** notes with confirmation
- 📋 **View** note details
- 🔍 **List** all notes with timestamps

### Rich Text Editor
- **Text Formatting**: Bold, Italic, Underline
- **Headings**: Support for markdown headings
- **Lists**: Bullet points and numbered lists
- **Code Blocks**: Inline and block code formatting
- **Quotes**: Block quotes
- **Links**: Easy link insertion
- **Copy to Clipboard**: Quick copy all content

### User Interface
- **Modern Design** with glassmorphism effects
- **Responsive Layout** - Works on desktop and tablets
- **Animated Sidebar** with collapsible notes list
- **Real-time Updates** - Instant note list updates
- **Loading States** - Beautiful loading spinners
- **Dark Mode Support** - Professional color scheme
- **Smooth Animations** - Framer Motion transitions

### Timestamps
- **Created At**: Shows when note was created
- **Updated At**: Tracks note modifications
- Smart timestamp display using date-fns

### Data Persistence
- **SQLite Database** - Lightweight and fast
- **Prisma ORM** - Type-safe database queries
- **Automatic Migrations** - Schema management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (Currently using v22.18.0)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd ym_diary
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize the database**:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser. The application will automatically redirect you to the login page.

## 📁 Project Structure

```
ym_diary/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts          # Login endpoint
│   │   │   │   └── signup/route.ts         # Signup endpoint
│   │   │   └── notes/
│   │   │       ├── route.ts                # Get and create notes
│   │   │       └── [id]/route.ts           # Update and delete notes
│   │   ├── diary/page.tsx                  # Main diary interface
│   │   ├── login/page.tsx                  # Login page
│   │   ├── signup/page.tsx                 # Signup page
│   │   ├── layout.tsx                      # Root layout
│   │   ├── page.tsx                        # Home page (redirects to diary)
│   │   └── globals.css                     # Global styles
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx                  # Button component
│   │   │   ├── input.tsx                   # Input component
│   │   │   ├── textarea.tsx                # Textarea component
│   │   │   ├── dialog.tsx                  # Dialog component
│   │   │   └── dropdown-menu.tsx           # Dropdown menu component
│   │   ├── loading.tsx                     # Loading spinners
│   │   ├── rich-text-editor.tsx            # Rich text editor
│   │   └── note-item.tsx                   # Note list item
│   └── lib/
│       ├── utils.ts                        # Utility functions
│       └── api-client.ts                   # Axios client with interceptors
├── prisma/
│   └── schema.prisma                       # Database schema
├── package.json                            # Dependencies
├── tailwind.config.ts                      # Tailwind configuration
├── tsconfig.json                           # TypeScript configuration
└── next.config.ts                          # Next.js configuration
```

## 🔑 Key Technologies

- **Frontend**: React 19, Next.js 15, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Radix UI primitives
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT + bcrypt
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Register new user

### Notes
- `GET /api/notes` - Get all user's notes
- `POST /api/notes` - Create new note
- `GET /api/notes/[id]` - Get specific note
- `PUT /api/notes/[id]` - Update note
- `DELETE /api/notes/[id]` - Delete note

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **HTTP-Only Cookies**: Protection against XSS
- **CORS Protection**: Automatic with Next.js
- **Environment Variables**: Sensitive data protection
- **User Data Isolation**: Notes are user-specific

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Purple (#A855F7) to Pink (#EC4899) gradient
- **Dark Background**: Slate-900 (#0F172A)
- **Accent**: Custom accent colors for focus states
- **Glassmorphism**: Semi-transparent backgrounds with backdrop blur

### Animations
- **Page Transitions**: Smooth fade and slide animations
- **List Updates**: Staggered animations for notes
- **Button Interactions**: Hover and active states
- **Loading States**: Spinning loader icons

## 📱 Responsive Design

- **Desktop**: Full sidebar with collapsible menu
- **Tablet**: Optimized layout with touchable elements
- **Mobile**: Responsive sidebar that can be toggled

## 🔄 Data Flow

```
User Auth
    ↓
localStorage → API Client (with JWT)
    ↓
Next.js API Routes
    ↓
Prisma ORM
    ↓
SQLite Database
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check

# Database
npx prisma migrate dev    # Create migrations
npx prisma studio         # Open Prisma Studio
npx prisma generate       # Generate Prisma Client
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t ymdiary .
docker run -p 3000:3000 ymdiary
```

### Environment Variables for Production
- `DATABASE_URL`: Your production database URL
- `NEXTAUTH_SECRET`: Generate a strong secret key
- `NEXTAUTH_URL`: Your production URL
- `NODE_ENV`: Set to "production"

## 📝 Future Enhancements

- [ ] Note tagging and categorization
- [ ] Full-text search across notes
- [ ] Note sharing and collaboration
- [ ] Rich text export (PDF, Markdown)
- [ ] Image support in notes
- [ ] Dark/Light theme toggle
- [ ] Note encryption
- [ ] Mobile app (React Native)
- [ ] Voice-to-text notes
- [ ] AI-powered summaries

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips

- Use markdown formatting in your notes for better organization
- Regular backups are recommended
- Keep your authentication secret secure
- Use strong passwords

## 🐛 Troubleshooting

### Database Errors
```bash
# Reset database
rm prisma/dev.db
npx prisma migrate dev --name init
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Authentication Issues
- Clear browser cookies
- Check `.env.local` file
- Verify JWT_SECRET is set

## 📞 Support

For issues or questions, please create an issue in the repository or check the troubleshooting section above.

---

**Built with ❤️ for your personal reflections and memories**

Happy writing! ✍️📓
