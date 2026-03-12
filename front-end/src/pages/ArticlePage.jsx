import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import axios from "axios";
import articles from "./Article-content";
import CommentsList from '../CommentsList';
import AddCommentForm from "../AddCommentForm";
import useUser from '../useUser';

export default function ArticlePage() {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments: initialComments } = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);

  const { user, isLoading } = useUser();

  const article = articles.find(article => article.name === name); //Find the article that matches the name in the URL (useParams)
  if (!article) {
    return <div>Article not found</div>; //If we can't find the article name, show an error message
  }

    async function onUpvoteClicked() {
      const token = user && await user.getIdToken(); //Get the user's ID token from Firebase Authentication
      const headers = token ? { authtoken: token } : undefined; //If the user is logged in, include the authtoken header with the ID token, otherwise use undefined for the headers (which will result in no headers being sent with the request)
      
      const response = await axios.post('/api/articles/' + name + '/upvote', null, { headers }); //add the headers to the POST request to the upvote endpoint, which will allow the server to verify the user's identity and determine if they are allowed to upvote the article
      const updatedArticleData = response.data;
      setUpvotes(updatedArticleData.upvotes);

  }

    async function onAddComment({ nameText, commentText }) {
      const token = user && await user.getIdToken(); //Get the user's ID token from Firebase Authentication
      const headers = token ? { authtoken: token } : undefined; //If the user is logged in, include the authtoken header with the ID token, otherwise use undefined for the headers (which will result in no headers being sent with the request)

      const response = await axios.post('/api/articles/' + name + '/comments', {
        postedBy: nameText,
        text: commentText,
      }, { headers });
      const updatedArticleData = response.data;
      setComments(updatedArticleData.comments);
  }

  return (
    <>
    <h1>{article.title}</h1>
    {user && <button onClick={onUpvoteClicked}>Upvote</button>}
    <p>This article has {upvotes} upvotes</p>
    {article.content.map(p => <p key={p}>{p}</p>)}
    {user ? (
      <AddCommentForm onAddComment={onAddComment} />
    ) : (
      <p>You must be logged in to add a comment</p>
    )}
    <CommentsList comments={comments} />
    </>
  );
}

export async function loader({ params }) {
  const response = await axios.get('/api/articles/' + params.name);
  const { upvotes, comments } = response.data;
  return { upvotes, comments };
}