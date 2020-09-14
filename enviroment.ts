const secret = process.env.SECRET || 't5b3b9a5';
const mongoUrl = process.env.MONGOURL || 'mongodb+srv://salami1996:salami1996@cluster0-utam0.gcp.mongodb.net/produtos-app?retryWrites=true&w=majority';
const port = process.env.PORT || 9000;

export { secret, mongoUrl, port };
