const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://surajbhoji1111:SuRaj1208@cluster0.fmyja.mongodb.net/devTinder");

}

module.exports = connectDB