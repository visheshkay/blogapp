import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Main from './components/Main';
import Error from './components/Error';
import AdminProfile from './components/AdminProfile';
import AuthorProfile from './components/AuthorProfile';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import AuthorAdd from './components/AuthorAdd';
import AuthorArticles from './components/AuthorArticles';
import Article from './components/Article';
import UserArticles from './components/UserArticles';
import { Navigate } from 'react-router-dom';
function App() {
  let router = createBrowserRouter([
      {
        path:'',
        element:<Main/>,
        errorElement:<Error/>,
        children:[
          {
          path:'',
          element:<Home/>
          },
          {
            path:'/login',
            element:<SignIn/>
          },
          {
            path:'/new-user',
            element:<SignUp/>
          },
          {
            path:'/author',
            element:<AuthorProfile/>,
            children:[
              {
                path:'new-article',
                element:<AuthorAdd/>
              },
              {
                path:'articles',
                element:<AuthorArticles/>,
                
              },
              {
                path:'',
                element:<Navigate to="articles"/>,
              },
              {
                path:'article/:articleid',
                element:<Article/>
              }
            ]
          },
          {
            path:'/admin/:name',
            element:<AdminProfile/>
          },
          {
            path:'/user',
            element:<UserProfile/>,
            children:[
              {
                path:'articles',
                element:<UserArticles/>
              },
              {
                path:'article/:articleid',
                element:<Article/>
              },
            ]
          }
        ]
      }
  ]);
  return (
    <div className="App">
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
