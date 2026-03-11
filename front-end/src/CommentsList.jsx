export default function CommentsList({ comments }) {
  return (
    <div>
      {comments.map((comment, i) => (
        <div key={i}>
          <h4>Posted by: {comment.postedBy}</h4>
          <p>{comment.postedBy.commentText || comment.text}</p>
        </div>
      ))}
    </div>
  );
}