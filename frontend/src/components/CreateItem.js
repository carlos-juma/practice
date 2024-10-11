import React, { Component } from 'react';

class CreateItem extends Component {
  state = {
    name: '',
    description: '',
    price: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: this.state.name,
      description: this.state.description,
      price: parseFloat(this.state.price) // Convert price to a number
    };

    fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create item');
        }
        return response.json();
      })
      .then(data => {
        console.log('Item created:', data);
        alert('Item successfully created!');
        this.setState({ name: '', description: '', price: '' });
      })
      .catch(error => {
        console.error('Error creating item:', error);
        alert('Error creating item');
      });
  };

  render() {
    return (
      <div>
        <h2>Create New Item</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name: </label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Description: </label>
            <textarea name="description" value={this.state.description} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Price: </label>
            <input type="number" name="price" value={this.state.price} onChange={this.handleChange} required />
          </div>
          <button type="submit">Create Item</button>
        </form>
      </div>
    );
  }
}

export default CreateItem;
