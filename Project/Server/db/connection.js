const mongoose = require('mongoose');
const URI="mongodb+srv://airline:airline@cluster0.wr3uk.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};
 
module.exports = connectDB;