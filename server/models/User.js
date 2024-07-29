import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    kakaoId: String,
    password: { type: String , required: false },    //비밀번호 optional로 변경 : 'required: false' 추가    
    email: { type: String, unique: true },
    nickname: String,
});

const User = mongoose.model('User', userSchema);

export default User;
