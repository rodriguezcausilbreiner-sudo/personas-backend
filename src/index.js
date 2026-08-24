const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const personaRoutes = require('./routes/personaRoutes');
app.use('/api/personas', personaRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API personas-backend activa en la nube' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor activo en: http://localhost:${PORT}`);
  });
}

module.exports = app;