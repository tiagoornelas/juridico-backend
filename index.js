const express = require('express');
const progressRouter = require('./controller/progress');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/progress', progressRouter);

app.listen(PORT, () => console.log(`Juridico server running on port ${PORT}`));
