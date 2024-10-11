import React, { Component } from 'react';
import { withRouter } from '../withRouter';

class DeleteItem extends Component {
  state = {
    itemId: ''
  };

  handleChange = (e) => {
    this.setState({ itemId: e.target.value });
  };

  handleDelete = (e) => {
    e.preventDefault();
    const { itemId } = this.state;

    fetch(`/api/items/${itemId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.json();
      })
      .then(() => {
        console.log('Item deleted successfully');
        alert('Item successfully deleted!');
        this.setState({ itemId: '' });
      })
      .catch(error => {
        console.error('Error deleting item:', error);
        alert('Error deleting item');
      });
  };

  render() {
    return (
      <div>
        <h2>Delete Item</h2>
        <form onSubmit={this.handleDelete}>
          <div>
            <label>Item ID: </label>
            <input type="text" name="itemId" value={this.state.itemId} onChange={this.handleChange} required />
          </div>
          <button type="submit">Delete Item</button>
        </form>
      </div>
    );
  }
}

export default withRouter(DeleteItem);
