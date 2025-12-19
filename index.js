const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'API OK' });
});
app.post('/grade', (req, res) => {
  const { answer } = req.body || {};

  // Very simple fake grading for now
  const score = answer && answer.trim().length > 0 ? 100 : 0;

  res.json({
    status: 'graded',
    score,
    feedback: score > 0 ? 'Answer received.' : 'No answer provided.',
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
app.post('/grade', (req, res) => {
  const { answer } = req.body; // text from frontend
  // For now, fake grading
  res.json({
    status: 'graded',
    score: 100,
    feedback: `You wrote: ${answer}`,
  });
});
