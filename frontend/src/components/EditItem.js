import React, { Component } from 'react';
import { withRouter } from '../withRouter';  // Use withRouter to access params

class EditItem extends Component {
  state = {
    item: {
      name: '',
      description: '',
      price: ''
    }
  };

  componentDidMount() {
    const { id } = this.props.router.params;

    fetch(`/api/items/${id}`)
      .then(response => response.json())
      .then(item => this.setState({ item }))
      .catch(error => console.error("Error fetching item:", error));
  }

  handleChange = (e) => {
    this.setState({ item: { ...this.state.item, [e.target.name]: e.target.value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.router.params;

    fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.item)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update item');
        }
        return response.json();
      })
      .then(data => {
        console.log('Item updated:', data);
        alert('Item successfully updated!');
      })
      .catch(error => {
        console.error('Error updating item:', error);
        alert('Error updating item');
      });
  };

  render() {
    const { name, description, price } = this.state.item;
    return (
      <div>
        <h2>Edit Item</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name: </label>
            <input type="text" name="name" value={name} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Description: </label>
            <textarea name="description" value={description} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Price: </label>
            <input type="number" name="price" value={price} onChange={this.handleChange} required />
          </div>
          <button type="submit">Update Item</button>
        </form>
      </div>
    );
  }
}

export default withRouter(EditItem);
