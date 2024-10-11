const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');
const { ObjectId } = require('mongodb');
const app = express();

// Read MongoDB connection string from `details.txt`
const connectionString = "mongodb+srv://dbUser:dbUserPassword@crud-app.kurpd.mongodb.net/?retryWrites=true&w=majority&appName=crud-app";
console.log("Connection String Loaded:", connectionString);

// Create a new MongoClient instance with the connection string
const client = new MongoClient(connectionString);

// Database and Collection
const databaseName = 'crud-app';
const collectionName = 'items';

async function startServer() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected successfully to MongoDB.');

    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    // Middleware to parse JSON bodies
    app.use(express.json());

    // Define a simple route to test the server
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/public/index.html'));    
    });

    app.get('/bundle.js', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/public/bundle.js'));
      });

    // Create: Add a new item
    app.post('/api/items', async (req, res) => {
        try {
          console.log("Request Body:", req.body);  // Log the incoming request body
      
          const newItem = req.body;
      
          // Ensure that required fields are present
          if (!newItem.name || !newItem.description || typeof newItem.price !== 'number') {
            return res.status(400).send({ message: 'Invalid input. Ensure that name, description, and price are provided.' });
          }
      
          // Insert the new item into the collection
          const result = await collection.insertOne(newItem);
      
          if (!result.acknowledged) {
            throw new Error('Failed to create item');
          }
      
          console.log('Item created successfully:', result);
          res.status(201).send({ message: 'Item created successfully', insertedId: result.insertedId });
        } catch (error) {
          console.error('Error creating item:', error);
          res.status(500).send({ message: 'Error creating item', error: error.message });
        }
      });
      

    // Read: Get all items
    app.get('/api/items', async (req, res) => {
      try {
        const items = await collection.find({}).toArray();
        res.status(200).send(items);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching items', error });
      }
    });

    // Read: Get an item by ID
    app.get('/api/items/:id', async (req, res) => {
        try {
          const itemId = req.params.id;
          
          // Check if the ID is a valid ObjectId
          if (!ObjectId.isValid(itemId)) {
            return res.status(400).send({ message: 'Invalid ID format' });
          }
      
          const item = await collection.findOne({ _id: new ObjectId(itemId) });
          
          if (!item) {
            return res.status(404).send({ message: 'Item not found' });
          }
      
          res.status(200).send(item);
        } catch (error) {
          console.error('Error fetching item:', error);  // Log the error
          res.status(500).send({ message: 'Error fetching item', error });
        }
      });

    // Update: Update an item by ID
    app.put('/api/items/:id', async (req, res) => {
        try {
          const itemId = req.params.id;
      
          // Check if the ID is a valid MongoDB ObjectId
          if (!ObjectId.isValid(itemId)) {
            return res.status(400).send({ message: 'Invalid ID format' });
          }
      
          // Clone the request body and remove the _id field
          const updateData = { ...req.body };
          delete updateData._id;  // Remove _id to avoid modification error
      
          const result = await collection.updateOne(
            { _id: new ObjectId(itemId) },  // Match document by ObjectId
            { $set: updateData }  // Only set the fields to be updated
          );
      
          if (result.matchedCount === 0) {
            return res.status(404).send({ message: 'Item not found' });
          }
      
          res.status(200).send({ message: 'Item updated successfully', item: updateData });
        } catch (error) {
          console.error('Error updating item:', error);
          res.status(500).send({ message: 'Error updating item', error });
        }
      });

    // Delete: Delete an item by ID
    app.delete('/api/items/:id', async (req, res) => {
        try {
          const itemId = req.params.id;
      
          // Check if the ID is a valid ObjectId
          if (!ObjectId.isValid(itemId)) {
            return res.status(400).send({ message: 'Invalid ID format' });
          }
      
          // Delete the item by ID
          const result = await collection.deleteOne({ _id: new ObjectId(itemId) });
      
          if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Item not found' });
          }
      
          res.status(200).send({ message: 'Item deleted successfully' });
        } catch (error) {
          console.error('Error deleting item:', error);
          res.status(500).send({ message: 'Error deleting item', error });
        }
      });

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

startServer().catch(console.error);
