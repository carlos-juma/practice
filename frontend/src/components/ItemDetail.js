import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '../withRouter';

class ItemDetail extends Component {
  state = { item: {} };

  componentDidMount() {
    const { id } = this.props.router.params;

    fetch(`/api/items/${id}`)
      .then(response => response.json())
      .then(item => this.setState({ item }))
      .catch(error => console.error("Error fetching item:", error));
  }

  handleDelete = () => {
    const { id } = this.props.router.params;

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
        alert('Item successfully deleted!');
        this.props.router.navigate('/');  // Navigate back to the home page
      })
      .catch(error => {
        console.error('Error deleting item:', error);
        alert('Error deleting item');
      });
  };

  render() {
    const { item } = this.state;
    return (
      <div>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>Price: {item.price}</p>
        {/* Navigation Links */}
        <Link to={`/edit/${item._id}`}>Edit Item</Link>
        <br />
        {/* Delete Button */}
        <button onClick={this.handleDelete}>Delete Item</button>
        <br />
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
}

export default withRouter(ItemDetail);
