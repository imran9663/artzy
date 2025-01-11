import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useRoutes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Dummy from './components/Dummy';
import MainCanvas from './components/MainCanvas/MainCanvas';
import TestCavas from './components/TestCanvas';
const App = () => {
  const NewRoute = () => {
    let routes = useRoutes([
      { path: "/", element: <MainCanvas /> },
      { path: "dummy", element: <Dummy /> },
      { path: "test", element: <TestCavas /> },
    ]);
    return routes;
  };
  return (
    <BrowserRouter>
      <NewRoute />
    </BrowserRouter>
  )
}

export default App