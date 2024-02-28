import React from 'react';
import {
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { ApiProvider } from './contexts/ApiContext.js';
import Feed from './components/Feed/Feed.jsx';
import PostView from './components/PostView/PostView.jsx';
import PostForm from './components/PostForm/PostForm.jsx';
import './App.css';

function App() {
  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <ApiProvider>
      <div className="feed">
        <Routes>
          <Route path="/" exact component={Feed} />
          <Route path="/posts/new">
            <PostForm onDone={goBack} onCancel={goBack} />
          </Route>
          <Route path="/posts/:id" component={PostView} />
        </Routes>
      </div>
    </ApiProvider>
  );
}

export default App;
