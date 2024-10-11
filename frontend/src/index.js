import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import CreateItem from './components/CreateItem';
import EditItem from './components/EditItem';
import DeleteItem from './components/DeleteItem';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* Main Navigation */}
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/create">Create Item</Link></li>
              <li><Link to="/delete">Delete Item</Link></li>
            </ul>
          </nav>
          
          {/* Route Definitions */}
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/create" element={<CreateItem />} />
            <Route path="/edit/:id" element={<EditItem />} />
            <Route path="/delete" element={<DeleteItem />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
