import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Home from "../screens/home";
import About from "../screens/about";

export const Routers = (props) => {
    return (
        <main>
            <Router>
                <Home />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/project" element={<About />} />
                    <Route exact path="/skills" element={<About />} />
                    <Route exact path="/podcats" element={<About />} />
                    <Route exact path="/blogs" element={<About />} />
                </Routes>
            </Router>
        </main>
    );
}