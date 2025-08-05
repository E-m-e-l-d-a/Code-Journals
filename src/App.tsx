import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import Home from "./components/Home"
import Blogs from "./components/Blogs"
import About from "./components/About"
import Contact from "./components/Contact"
import Compose from "./components/Compose"
import NotFound from "./components/Notfound"

interface Post {
  title: string;
  post: string;
}

export default function App(){
  const [posts, setPosts] = useState<Post[]>([]);

  return(
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/blogs" element={<Blogs posts={posts} />} />
        <Route path="/about" element={<About/>} />
        <Route path="/compose" element={<Compose setPosts={setPosts} />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
