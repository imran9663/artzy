import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dummy from './components/Dummy';
import MainCanvas from './components/MainCanvas/MainCanvas';
import { Route, Routes, useRoutes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
const App = () => {
  const NewRoute = () => {
    let routes = useRoutes([
      { path: "/", element: <MainCanvas /> },
      { path: "dummy", element: <Dummy /> },
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