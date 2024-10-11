const express = require('express');
const router = express.Router();

// Create Item
router.post('/', (req, res) => {
  db.collection('items').insertOne(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(result.ops[0]);
  });
});

// Read All Items
router.get('/', (req, res) => {
  db.collection('items').find().toArray((err, items) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(items);
  });
});

// Update Item
router.put('/:id', (req, res) => {
  const { id } = req.params;
  db.collection('items').updateOne({ _id: id }, { $set: req.body }, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Delete Item
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.collection('items').deleteOne({ _id: id }, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(204).send(result);
  });
});

module.exports = router;
