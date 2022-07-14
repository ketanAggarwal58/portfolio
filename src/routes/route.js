import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Home from "../screens/home";
import About from "../screens/about";
import Projects from "../screens/projects";
import Skills from "../screens/skills"
import Navbar from "../components/navbar";
import Podcasts from "../screens/podcasts";
import Blog from "../screens/blog";

export const Routers = (props) => {
    return (
        <main>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/project" element={<Projects />} />
                    <Route exact path="/skills" element={<Skills />} />
                    <Route exact path="/podcats" element={<Podcasts />} />
                    <Route exact path="/blogs" element={<Blog />} />
                </Routes>
            </Router>
        </main>
    );
}