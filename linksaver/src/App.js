import AddLink from "./views/add";
import Content from "./views/content";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddLink />} />
        <Route path="/content" element={<Content />} />
      </Routes>
    </Router>
  );
}

export default App;
