import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const StudentForm = lazy(() => import('studentapp1/StudentForm'));

const App = () => (
  <div className="container">
    <div>Name: StudentAPP3</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <Suspense fallback={<div>Loading Form...</div>}>
      <StudentForm />
    </Suspense>
  </div>
);

const container = document.getElementById('app');
const root = createRoot(container);

root.render(<App />);