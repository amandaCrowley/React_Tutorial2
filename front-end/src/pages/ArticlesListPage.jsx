import ArticleList from "./ArticleList";
import articles from "./Article-content";

export default function ArticlesListPage() {
  return (
      <>
      <h1>Articles</h1>
      <ArticleList articles={articles} />
      </>
  );
}