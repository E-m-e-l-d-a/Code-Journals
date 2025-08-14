import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Blogs from "./components/Blogs"
import About from "./components/About"
import Contact from "./components/Contact"
import Compose from "./components/Compose"
import NotFound from "./components/Notfound"
import BlogEdit from "./components/BlogEdit"

export default function App(){
  return(
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogEdit />} />
        <Route path="/about" element={<About/>} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
