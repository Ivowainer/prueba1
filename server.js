const app = require('./app')
const {createServer} = require('http');
const http = createServer(app);
const PORT = process.env.PORT || 8000
app.set('port',PORT)

http.listen(PORT, () =>
    console.log('SERVER READY ON PORT: '+app.get('port'))
)
