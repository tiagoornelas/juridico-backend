const express = require('express');

const app = express();

app.arguments(express.json());

const PORT = 3000;
app.listen(() => console.log(`Juridico server running on port ${PORT}`));
