import { useState, createContext, useEffect } from 'react';

const postsUrl = process.env.REACT_APP_API_POSTS_URL;

export const ApiContext = createContext(null);

export function ApiProvider(props) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPost = (id) => {
    return posts.find((post) => post.id === id);
  }

  const loadPosts = async () => {
    try {
      setError(null);
      setLoading(true);

      const resp = await fetch(postsUrl);
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error('Failed to load posts');
      }

      data.sort((a,b) => b.created - a.created);

      setPosts(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const createPost = async (post) => {
    try {
      setError(null);
      setLoading(true);

      const resp = await fetch(postsUrl, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          id: 0,
        }),
      });

      if (resp.status !== 204) {
        throw new Error('Failed to create post');
      }

      await loadPosts();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const updatePost = async (post) => {
    try {
      setError(null);
      setLoading(true);

      const resp = await fetch(postsUrl, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...post }),
      });

      if (resp.status !== 204) {
        throw new Error();
      }

      await loadPosts();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const deletePost = async (id) => {
    try {
      setError(null);
      setLoading(true);

      const requestUrl = `${postsUrl}/${id}`;
      const resp = await fetch(requestUrl, {
        method: 'delete',
      });

      if (!resp.ok || resp.status !== 204) {
        throw new Error();
      }

      await loadPosts();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const api = {
    posts,
    error,
    loading,
    getPost,
    loadPosts,
    createPost,
    updatePost,
    deletePost,
  };

  return (
    <ApiContext.Provider value={api}>
      {props.children}
    </ApiContext.Provider>
  );
}
