const express = require('express');
const andamentoRouter = require('./controller/andamentos');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/andamentos', andamentoRouter);

app.listen(PORT, () => console.log(`Juridico server running on port ${PORT}`));
