const express = require('express')
const cors = require('cors')
const fs = require('fs');

const app = express()
app.use(cors())
const port = 3001

app.get('/', function (req, res) {
  /*const dir = `E:/${req.query.folder}` || 'E:/COURSES/[DesireCourse.Net] Udemy - Microservices with Node JS and React/'
	*/

	const drive = req.query.drive || 'E:'
	const dir = `${drive}/${req.query.folder}` || 'COURSES'

	const files = fs.readdirSync(dir).filter((file)=>{
		return file.includes('.mp4')
	})

	res.json({files, dir})
});


app.listen(port, ()=>{
	console.log(`Example app listening at http://localhost:${port}`)
})