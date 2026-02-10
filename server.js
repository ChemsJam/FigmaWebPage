const express = require('express');
const path = require('path');

const app = express();

// Sirve el build de Oracle JET
app.use(express.static('web'));

// Fallback SPA
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});