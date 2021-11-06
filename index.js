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
	// const dir = `${drive}/${req.query.folder}` || 'COURSES'
	const dir = `${req.query.folder.trim()}` || 'COURSES'
	
	let files = fs.readdirSync(dir)


	/*file number weird sorting case*/
	/*mapping the (regex extract) first digits(decimal) as id for sorting*/
	files = files.map((file,index)=>{

		/*unmatched condition...*/
		let match = file.match(/^\D*(\d+(?:\.\d+)?)/)
		let id=index;
		if(match){id=match[0]}

		return { id: id, file: file }
	})

	/*sorting the id (digit)*/
	files.sort(function (a, b) {
	  return a.id - b.id;
	});

	/*front end expecting simple non object list -- for the case */
	files = files.map(file=>file.file)

	res.json({files, dir})
});


app.listen(port, ()=>{
	console.log(`Example app listening at http://localhost:${port}`)
})