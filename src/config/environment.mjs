import dotenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config({
  encoding: 'utf8',
  path: path.join(__dirname, '../..', '.env'),
  silent: true
})

if (result.error) {
  console.log(`ERROR: Load environment variables ${result.error}`)
} else if (process.env.NODE_ENV !== 'production') {
  console.log(`ENVs Loaded: ${JSON.stringify(result.parsed)}`)
} else {
  console.log('ENVs Loaded')
}
