import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        })
        await mongoose.connect(`${process.env.MONGODB_URI}quick-stay`);

    } catch (e) {
        console.log(e.message);
    }
}

export default connectDB;