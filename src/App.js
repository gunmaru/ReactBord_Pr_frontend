import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import { Route } from 'react-router-dom';

const App = () =>{
  return(
    <>
      <Route component={PostListPage} path={['/@:username','/']} exact></Route>
      <Route component={LoginPage} path="/login"></Route>
      <Route component={PostPage} path="/@:username/:postId"></Route>
      <Route component={RegisterPage} path="/register"></Route>
      <Route component={WritePage} path="/write"></Route>
    </>

  );
}


export default App;
