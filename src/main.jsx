import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CourseEvaluationProvider from './Components/CourseEvaluation/CourseEvaluationContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CourseEvaluationProvider>
      <App />
    </CourseEvaluationProvider>
  </StrictMode>
);