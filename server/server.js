//imports
let express =  require('express')
let cors = require('cors')
let path = require('path')
let apiRouter = require('./apiRouter').router
// let cookieParser = require('cookie-parser')
// let session = require('express-session')

let server  =  express() 

// body parser configuration
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use(express.static(path.join(__dirname, "./uploads")))

server.use(cors({
    origin: true,
    allowedHeaders: ["Origin", "X-Requested-with", "Content-Type", "Accept","x-access-token"],
    methods: ["GET","PUT","POST","DELETE"],
    credentials: true
}))

// server.use(cookieParser())
// server.use(session({
//     key: 'userId',
//     secret: 'subscribe',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 60*60*24
//     }
// }))

/*server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-with, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Credentials", true);
    
    next()
})*/

//routes
server.get('/', (req, res) => res.send('INDEX is changed'));

server.use('/eni/', apiRouter)

server.listen(8000,()=>{
    console.log('serveur demarer port 8000')
})