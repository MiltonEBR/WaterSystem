import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/router';

const port = Number(process.env.PORT) || 4000;
const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use('/api', router)

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});