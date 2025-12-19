const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'API OK' });
});

// Simple text grading route
app.post('/grade', (req, res) => {
  const { answer } = req.body || {};
  const score = answer && answer.trim().length > 0 ? 100 : 0;

  res.json({
    status: 'graded',
    score,
    feedback: score > 0 ? 'Answer received.' : 'No answer provided.',
  });
});

// Image upload route (for coins / banknotes)
app.post('/grade-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'error', message: 'No image uploaded' });
  }

  res.json({
    status: 'image_received',
    originalName: req.file.originalname,
    storedAs: req.file.filename,
    sizeBytes: req.file.size
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
