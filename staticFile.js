const express = require('express');
const app = express();
const port = 8011;
app.use('/', express.static('upload'));
app.listen(port, () =>
    console.log(`Static file server is running on port ${port}!`)
);
