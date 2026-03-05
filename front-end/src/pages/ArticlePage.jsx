import {useParams} from "react-router-dom";
import articles from "./Article-content";

export default function ArticlePage() {
  const { name } = useParams();

  const article = articles.find(article => article.name === name); //Find the article that matches the name in the URL (useParams)
  if (!article) {
    return <div>Article not found</div>; //If we can't find the article name, show an error message
  }

  return (
    <> {/*React fragment - allows us to return multiple elements without adding an extra div*/}
        <h1>{article.title}</h1>
        {article.content.map( p => <p key={p}>{p}</p>)} {/*paragraph tag with paragraph content for each paragraph in the article content array (map through the content array and return a paragraph tag for each one)*/}
    </>
  );
}