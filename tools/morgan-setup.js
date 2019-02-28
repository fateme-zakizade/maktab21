const rfs = require('rotating-file-stream');
const uuid = require('node-uuid');

module.exports = (morgan, app) =>{

    let accessLogStream = rfs('access.log', {
        interval: '1d', //rotate daily!
        path: 'log'
    });

    morgan.token('id', (req) => {
        return req.id;
    });

    morgan.token('cookies', (req) =>{
        return JSON.stringify(req.cookies);
    });

    morgan.token('body', (req) =>{
        return JSON.stringify(req.body);
    });

    morgan.token('date', () =>{
        let date = Date(Date.now());
        let dateArr = date.split(' ');
        let result = dateArr[0] + '/' + dateArr[2] + '/' + dateArr[1] + '/' + dateArr[3] + ':' + dateArr[4] + ' ' + dateArr[5];
        return '[' + result + ']';
    });

    morgan.token('plain-date', () => {
        return Date.now();
    });

    const assignId = (req, res, next) => {
        req.id = uuid.v4();
        next();
    };
    app.use(assignId);
    app.use(morgan('dev'));
    app.use(morgan(':id :remote-addr :date[clf] :method ":url" :status :response-time :body :cookies ' +
        ':referrer ":user-agent" :plain-date :remote-user', {stream: accessLogStream}));
};