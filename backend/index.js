// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: 'Item One', description: 'This is item one.' },
  { id: 2, name: 'Item Two', description: 'This is item two.' },
];

app.get('/api/items', (req, res) => {
  res.json({ data: items });
});

app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  const newItem = { id: items.length + 1, name, description };
  items.push(newItem);
  res.status(201).json({ data: newItem });
});

// Câu lệnh quan trọng để khởi động server:
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
