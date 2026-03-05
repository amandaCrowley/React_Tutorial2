
import{ createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import { Children, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import About from './pages/About'
import ArticlesList from './pages/ArticlesListPage'
import ArticlePage from './pages/ArticlePage' 
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
      element: <ArticlePage />
    }]
}]
const router = createBrowserRouter(routes);

function App() {
  return (
   <RouterProvider router={router} />
  )
}

export default App
