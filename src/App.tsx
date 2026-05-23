/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import SubjectDetail from './pages/SubjectDetail';
import Tutorials from './pages/Tutorials';
import Slides from './pages/Slides';
import Glossary from './pages/Glossary';
import Quizzes from './pages/Quizzes';
import Tools from './pages/Tools';
import Settings from './pages/Settings';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/materie/:id", element: <SubjectDetail /> },
      { path: "/tutorial", element: <Tutorials /> },
      { path: "/slides", element: <Slides /> },
      { path: "/glossario", element: <Glossary /> },
      { path: "/quiz", element: <Quizzes /> },
      { path: "/strumenti", element: <Tools /> },
      { path: "/impostazioni", element: <Settings /> }
    ]
  }
]);

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
