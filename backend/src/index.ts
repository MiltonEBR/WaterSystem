import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/router';
import cors from 'cors'
import path from 'path'

const _app_folder = path.join(__dirname, '..', '..', 'frontend', 'dist');
const port = Number(process.env.PORT) || 4000;
const app = express()


app.use('/', express.static(_app_folder));
app.use('*', express.static(_app_folder));

app.use(cors())
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