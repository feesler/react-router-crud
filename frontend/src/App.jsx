import React from 'react';
import {
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import { ApiProvider } from './contexts/ApiContext.js';
import Feed from './components/Feed/Feed.jsx';
import PostView from './components/PostView/PostView.jsx';
import PostForm from './components/PostForm/PostForm.jsx';
import './App.css';

function App() {
  let history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <ApiProvider>
      <div className="feed">
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/posts/new">
            <PostForm onDone={goBack} onCancel={goBack} />
          </Route>
          <Route path="/posts/:id" component={PostView} />
        </Switch>
      </div>
    </ApiProvider>
  );
}

export default App;
