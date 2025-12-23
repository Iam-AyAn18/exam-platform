# ExamHub - Online Exam Platform

A React-based exam platform for students and administrators.

## Features

### Admin Features
- Create and manage test papers
- Add/edit/delete questions (MCQ and True/False)
- Publish/unpublish test papers
- View exam statistics
- Track student exam attempts

### Student Features
- View available published exams
- Take exams with timer
- Submit answers with confirmation
- View detailed results with question-wise breakdown
- Retake exams
- Track personal exam history

## Project Structure

```
src/
  ├── components/
  │   ├── Auth/          # Authentication components
  │   │   └── LoginPage.jsx
  │   ├── Admin/         # Admin-specific components
  │   │   ├── TestPaperForm.jsx
  │   │   └── QuestionEditor.jsx
  │   ├── Student/       # Student-specific components
  │   │   ├── ExamTaker.jsx
  │   │   ├── ExamResults.jsx
  │   │   ├── TimerComponent.jsx
  │   │   └── SubmitConfirmation.jsx
  │   └── Common/        # Shared components
  ├── pages/             # Main page components
  │   ├── AdminPage.jsx
  │   └── StudentPage.jsx
  ├── context/           # React Context for state management
  │   ├── AuthContext.jsx
  │   └── ExamContext.jsx
  ├── data/              # Mock data
  │   └── mockData.js
  ├── styles/            # Global styles
  │   └── App.css
  ├── App.jsx            # Main app component
  └── index.js           # Entry point
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

### Login
- **Admin Login**: Select "Login as Admin" and enter your name
- **Student Login**: Select "Login as Student" and enter your name

### Admin Workflow
1. Login as admin
2. Create a new test paper using "Create New Test Paper" button
3. Add questions to the test paper using "Edit Questions" button
4. Publish the test paper when ready
5. View statistics on the dashboard

### Student Workflow
1. Login as student
2. Browse available exams
3. Click "Start Exam" to begin
4. Answer questions within the time limit
5. Submit exam to view results
6. Review detailed results and retake if needed

## Sample Test Papers

The application includes 3 pre-loaded sample test papers:
1. **Basic Mathematics** - Easy level, 5 questions
2. **General Knowledge Quiz** - Medium level, 8 questions
3. **English Grammar Test** - Hard level, 6 questions

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Context API** - State management
- **CSS3** - Styling with CSS variables and responsive design

## Features Implemented

✅ Role-based authentication (Admin/Student)  
✅ Test paper CRUD operations  
✅ Question editor with MCQ and True/False support  
✅ Publish/unpublish functionality  
✅ Real-time countdown timer  
✅ Exam submission with confirmation  
✅ Detailed results with question-wise breakdown  
✅ Pass/Fail status (40% passing threshold)  
✅ Retake exam functionality  
✅ Responsive design for mobile, tablet, and desktop  
✅ Statistics dashboard for admins  

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- This is a client-side only application with in-memory storage
- Data is not persisted between page refreshes
- No backend or database required for MVP
- User authentication is simplified (no passwords)

## Future Enhancements

- Backend integration with REST API
- Database persistence
- User management system
- Advanced analytics and reporting
- Question bank management
- Bulk import/export of questions
- Timed practice mode
- Discussion forums
- Certificate generation

## License

MIT
