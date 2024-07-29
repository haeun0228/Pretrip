const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

//루트 경로는 일단 index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// /detail 경로 요청 시 templates/detail.html 서빙
app.get('/detail', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'templates', 'detail.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});