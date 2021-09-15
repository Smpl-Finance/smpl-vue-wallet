const express = require('express')
const compression = require('compression')
const app = express()
const port = process.env.PORT || 8080

const appFolder = 'dist/'

app.use(compression())

app.get('*.*', express.static(appFolder, {maxAge: '1y'}))

app.all('*', function (req, res) {
	res.status(200).sendFile(`/`, {root: appFolder});
})

app.listen(port, () =>{
	console.log(`app is started on port: ${port}`)
})
