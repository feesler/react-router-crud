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
          <Route path="/" Component={Feed} />
          <Route
            path="/posts/new"
            element={<PostForm onDone={goBack} onCancel={goBack} />}
          />
          <Route path="/posts/:id" Component={PostView} />
        </Routes>
      </div>
    </ApiProvider>
  );
}

export default App;
