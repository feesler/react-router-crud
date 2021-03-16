import React from 'react';
import PropTypes from 'prop-types';
import { formatTimePretty } from '../../utils/DateTimeUtils.js';

function PostItem(props) {
  const { content, created } = props;

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__avatar"></div>
        <div className="post__title">
          <div className="post__user">User name</div>
          <div className="post__time">{formatTimePretty(created)}</div>
        </div>
      </div>
      <div className="post__content">{content}</div>
    </div>
  );
};

PostItem.propTypes = {
  content: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
};

export default PostItem;
