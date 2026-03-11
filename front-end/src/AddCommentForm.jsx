import { useState } from 'react';

export default function AddCommentForm({ onAddComment }) {
  const [nameText, setNameText] = useState('');
  const [commentText, setCommentText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!nameText || !commentText) return;

    onAddComment({ nameText, commentText });

    setNameText('');
    setCommentText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={nameText}
        onChange={(e) => setNameText(e.target.value)}
      />
      <input
        placeholder="Your comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}