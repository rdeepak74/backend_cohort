import cohort from './cohort.js'

const app = new cohort()

app.mujedena('/', (req, res) => {
  res.end('Get route chal rha he.....')
})

app.post('/', (req, res) => {
  res.end('Post route chal rha he.....')
})

app.sunreheho(3000, '0.0.0.0', () => {
  console.log('me sun rha hu 3000 pe...')
})
