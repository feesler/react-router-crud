import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useApi from '../../hooks/useApi.js';
import { useHistory, useParams } from 'react-router';
import PostItem from '../PostItem/PostItem';
import PostForm from '../PostForm/PostForm.jsx';

const PostView = () => {
  const { id } = useParams();
  let history = useHistory();
  const { posts, getPost, deletePost } = useApi();
  const [post, setPost] = useState(null);
  const [state, setState] = useState('view');

  const handleUpdate = () => {
    setState('update');
  };

  const handleDelete = async () => {
    await deletePost(id);
    history.replace('/');
  };

  const setViewState = () => {
    setState('view');
  };

  useEffect(() => {
    const data = getPost(+id);
    setPost(data);
  }, [id, posts]);

  if (!post) {
    return null;
  }

  if (state === 'update') {
    return <PostForm {...post} onDone={setViewState} onCancel={setViewState} />
  }

  if (state === 'view') {
    return (
      <div className="feed-item post-view">
        <PostItem {...post} />
        <div className="post-view__controls">
          <button className="action-btn" onClick={handleUpdate}>
            Изменить
          </button>
          <button className="action-btn danger-btn" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    );
  }
};

PostView.propTypes = {
};

export default PostView;
