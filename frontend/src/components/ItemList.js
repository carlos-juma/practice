import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ItemList extends Component {
  state = { items: [] };

  componentDidMount() {
    fetch('/api/items')
      .then(response => response.json())
      .then(items => this.setState({ items }))
      .catch(error => console.error("Error fetching items:", error));
  }

  handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    fetch(`/api/items/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.json();
      })
      .then(() => {
        // Remove the deleted item from the local state
        this.setState({ items: this.state.items.filter(item => item._id !== id) });
        alert('Item successfully deleted!');
      })
      .catch(error => {
        console.error('Error deleting item:', error);
        alert('Error deleting item');
      });
  };

  render() {
    return (
      <div>
        <h1>Items List</h1>
        <ul>
          {this.state.items.map(item => (
            <li key={item._id}>
              <Link to={`/item/${item._id}`}>{item.name}</Link>
              <br />
              {/* Link to edit the item */}
              <Link to={`/edit/${item._id}`}>Edit</Link>
              <br />
              {/* Dynamic Delete Button */}
              <button onClick={() => this.handleDelete(item._id)}>Delete</button>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ItemList;
