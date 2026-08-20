const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const personaRoutes = require('./routes/personaRoutes');
app.use('/api/personas', personaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en: http://localhost:${PORT}`);
});