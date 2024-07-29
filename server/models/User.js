import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    kakaoId: String,
    password: { type: String },
    email: { type: String, unique: true },
    nickname: String,
});

const User = mongoose.model('User', userSchema);

export default User;
