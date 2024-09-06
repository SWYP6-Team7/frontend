import { setupWorker } from 'msw/browser'
import { handlers } from './handler'

const worker = setupWorker(...handlers)

export default worker
