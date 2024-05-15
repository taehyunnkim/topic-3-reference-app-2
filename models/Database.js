const mongoose = require('mongoose');

const account = {
  user: "admin",
  password: "password",
}

const connectToDatabase = () => {
    const DB_URI = `mongodb://${account.user}:${account.password}@mongo:27017/open-devsecops`;

    mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin'
    });
}


module.exports = connectToDatabase;