import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notification, setNotification] = useState(null);
  
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (!message) {
      return null;
    }
  
    return <div>{message}</div>;
  };

  const showNotification = (message) => {
    setNotification({ message});
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

 

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('Login error:', exception);
      showNotification('wrong username or password.')
  }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null);
    

  }

  const blogList= () => {
    return(
    <div>
        <h2>blogs</h2>
        <p>{user.name} has logged in<button onClick={handleLogOut}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>)}
  

  const loginForm = () => {
    return(
    <div>
    <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>

      </form>
      </div>
  )}
  const handleNewBlog = async (event) => {
    event.preventDefault();
  
    try {
      const newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
      };
  
    
      const createdBlog = await blogService.create(newBlog);
  
     
      setBlogs([...blogs, createdBlog]);
      showNotification(`A new blog "${createdBlog.title}" has been added`)
     
      setNewBlogTitle('');
      setNewBlogAuthor('');
      setNewBlogUrl('');
      
    } catch (exception) {
      console.error('Create blog error:', exception);
    }
  };

  const blogForm = () => {
    return (
      <div>
        <h2>Create New Blog</h2>
        <form onSubmit={handleNewBlog}>
          <div>
            Title:
            <input
              type="text"
              value={newBlogTitle}
              onChange={({ target }) => setNewBlogTitle(target.value)}
            />
          </div>
          <div>
            Author:
            <input
              type="text"
              value={newBlogAuthor}
              onChange={({ target }) => setNewBlogAuthor(target.value)}
            />
          </div>
          <div>
            URL:
            <input
              type="text"
              value={newBlogUrl}
              onChange={({ target }) => setNewBlogUrl(target.value)}
            />
          </div>
          <button type="submit">Create Blog</button>
        </form>
      </div>
    );
  };

  

  return (
    
    <div>
       <Notification message={notification?.message}/>
      {!user && loginForm()}
      
            
       
      {user && <div>
        
        {blogList()}
        {blogForm()}
      </div>}
    </div>
  )
}

export default App