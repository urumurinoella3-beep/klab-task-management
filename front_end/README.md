# Task Management System - Frontend

This is the frontend application for the Task Management System, built with React and Vite for the kLab Tech Upskill Program.

## 🛠️ Technologies Used

- **React 19.2.8**
- **Vite 8.3.0** (Build tool & dev server)
- **Axios** (HTTP client for API calls)
- **CSS3** (Styling with modern features)
- **ESLint** (Code quality)

## 📋 Features

The frontend provides a beautiful, responsive user interface with the following capabilities:

- ✅ **View all tasks** in a card-based grid layout
- ➕ **Create new tasks** with title, description, status, and priority
- ✏️ **Edit existing tasks** inline
- 🗑️ **Delete tasks** with confirmation
- ✓ **Toggle task status** between Pending and Completed
- 🔍 **Filter tasks** by status (All, Pending, Completed)
- 📱 **Responsive design** - works on desktop, tablet, and mobile
- 🎨 **Beautiful UI** with gradient backgrounds and smooth animations

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+ and npm installed
- Backend API running on http://localhost:8080

### Installation Steps

1. **Navigate to the frontend directory:**
   ```bash
   cd front_end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   
   The application will be available at **http://localhost:5173**

### Build for Production

To create a production build:

```bash
npm run build
```

The build files will be in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
front_end/
├── public/                  # Static assets
├── src/
│   ├── App.jsx             # Main application component
│   ├── App.css             # Application styles
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md
```

## 🎨 User Interface

### Main Features

1. **Task Cards**: Each task is displayed in a beautiful card with:
   - Title and description
   - Priority badge (Low/Medium/High) with color coding
   - Status badge (Pending/Completed)
   - Creation timestamp
   - Action buttons (Toggle status, Edit, Delete)

2. **Task Form**: Clean form interface for creating/editing tasks with:
   - Title input (required)
   - Description textarea
   - Status dropdown
   - Priority dropdown
   - Submit and cancel buttons

3. **Filter System**: Easy-to-use dropdown to filter tasks by:
   - All Tasks
   - Pending Only
   - Completed Only

4. **Responsive Layout**: Adapts to different screen sizes:
   - Desktop: Multi-column grid
   - Tablet: 2-column grid
   - Mobile: Single-column layout

## 🔧 Technical Decisions

### Why React?
- Component-based architecture for reusable UI elements
- Virtual DOM for efficient rendering
- Large ecosystem and community support
- Hooks for clean state management

### Why Vite?
- Lightning-fast hot module replacement (HMR)
- Optimized build process
- Modern development experience
- Better than Create React App for performance

### Why Axios?
- Simple and intuitive API for HTTP requests
- Automatic JSON transformation
- Better error handling than fetch API
- Interceptor support for future enhancements

### State Management
- Using React Hooks (useState, useEffect) for simple state management
- No need for Redux or other complex state management libraries for this application size

### Styling Approach
- Pure CSS with modern features (Grid, Flexbox, CSS Variables)
- No CSS framework dependency - keeps bundle size small
- Custom animations and transitions for better UX

## 🌐 API Integration

The frontend connects to the backend API at `http://localhost:8080/api/tasks`

### API Calls Made:
- `GET /api/tasks` - Fetch all tasks
- `GET /api/tasks?status=Pending` - Filter by status
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Error Handling
- User-friendly alerts for API errors
- Console logging for debugging
- Graceful handling of network issues

## 🧪 Testing

Run linter:
```bash
npm run lint
```

## 🐛 Troubleshooting

### Backend Connection Issues
**Problem**: "Error fetching tasks"
**Solution**: 
- Ensure backend server is running on port 8080
- Check CORS configuration in backend
- Verify API URL in App.jsx (line 5)

### Port Conflicts
**Problem**: Port 5173 is already in use
**Solution**: Vite will automatically try the next available port, or you can specify a port in `vite.config.js`

### Dependencies Issues
**Problem**: Module not found errors
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## 🎯 Future Enhancements

Potential features that could be added:
- 🔐 User authentication
- 🔍 Search functionality
- 📄 Pagination for large datasets
- ✅ Form validation with error messages
- 🌙 Dark mode toggle
- 📊 Task statistics dashboard
- 🔔 Notifications
- 🗂️ Task categories/tags
- 📤 Export tasks to CSV/PDF

## 👨‍💻 Author

Built for the kLab Tech Upskill Program - Full-Stack Coding Challenge

## 📄 License

This project is for educational purposes as part of the kLab Tech Upskill Program.
