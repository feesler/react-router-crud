import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useApi from '../../hooks/useApi.js';

const initialValidation = {
  content: true,
};

function PostForm(props) {
  const { id, content, onCancel, onDone } = props;
  const [state, setState] = useState({ id, content });
  const [validation, setValidation] = useState(initialValidation);
  const [sent, setSent] = useState(false);
  const { loading, error, createPost, updatePost } = useApi();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.content.length) {
      setValidation((prev) => ({
        ...prev,
        content: false,
      }));
      return;
    }

    if (state.id) {
      updatePost(state);
    } else {
      createPost(state);
    }
    setSent(true);
  }

  const handleChange = (e) => {
    setValidation(initialValidation);
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  }

  useEffect(() => {
    if (sent) {
      if (!loading) {
        if (error) {
          setSent(false);
        } else {
          if (onDone) {
            onDone();
          }
        }
      }
    }
  }, [sent, error, loading]);

  return (
    <div className="feed-item post-form">
      <div className="post-form__header">
        {id !== 0 && <div className="post-form__title">Редактировать публикацию</div>}
        <button className="close-btn align-right" type="button" onClick={handleCancel}>&times;</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="post-form__main">
          <div className="post-form__avatar"></div>
          <textarea
            className={classNames('post-form__content', { 'is-invalid': !validation.content })}
            name="content"
            type="text"
            value={state.content}
            onChange={handleChange}
          />
        </div>
        <div className="post-form__controls">
          <button className="action-btn align-right" type="submit">
            {id ? 'Сохранить' : 'Опубликовать'}
          </button>
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  id: PropTypes.number,
  content: PropTypes.string,
  onDone: PropTypes.func,
  onCancel: PropTypes.func,
};

PostForm.defaultProps = {
  id: 0,
  content: '',
  onDone: null,
  onCancel: null,
};

export default PostForm;
