import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useApi from '../../hooks/useApi.js';
import PostItem from '../PostItem/PostItem.jsx';

function Feed(props) {
  const { posts } = useApi();

  return (
    <>
      <div className="feed-item feed-controls">
        <Link className="action-btn" to="/posts/new">Создать пост</Link>
      </div>
      {posts && posts.map((item) =>
        <Link
          key={item.id}
          to={`/posts/${item.id}`}
          className="feed-item"
        >
          <PostItem {...item} />
        </Link>
      )}
    </>
  );
};

Feed.propTypes = {
};

export default Feed;
