
import{ createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import axios from 'axios';
import './App.css'
import HomePage from './pages/HomePage'
import About from './pages/About'
import ArticlesList from './pages/ArticlesListPage'
import ArticlePage, { loader as articleLoader } from './pages/ArticlePage' 
import Layout from './pages/Layout'
import NotFoundPage from './pages/NotFoundPage'

const routes = [{
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />, //Displays this page if the user tries to access a page that doesn't exist (e.g. /asdf)
    children: [{
      path: '/',
      element: <HomePage /> 
    },{
      path: '/about',
      element: <About />
    },{ 
      path: '/articles',
      element: <ArticlesList />
    },{   
      path: 'articles/:name', //This is a parameter that we can use to load different articles based on the name in the URL - anything after the articles/ will be captured
      element: <ArticlePage />,
      loader: articleLoader //This is a function that will be called when the user navigates to this page - it will load the article data based on the name in the URL and pass it to the ArticlePage component as a prop
    }]
}]
const router = createBrowserRouter(routes);

function App() {
  return (
   <RouterProvider router={router} />
  )
}

export default App
