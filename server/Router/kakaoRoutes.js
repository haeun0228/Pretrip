import express from 'express';
import axios from 'axios';
import qs from "qs";
import User from "../models/User.js";
import generateToken from '../utils/token.js';
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';

dotenv.config();

const router = express.Router(); //express()를 express.Router()로 변경함

const kakao = {
    CLIENT_ID: process.env.REST_API_KEY,
    REDIRECT_URI: process.env.REDIRECT_URI,
};

function asyncHandler(handler) {
    return async function (req, res) {
        try {
            await handler(req, res);
        } catch (e) {
            if (e.name === 'ValidationError') {
                res.status(400).send({ message: e.message }); // bad request
            } else if (e.name === 'CastError') {
                res.status(404).send({ message: e.message });
            } else {
                res.status(500).send({ message: e.message }); // server error
            }
        }
    }
};

router.post('/register', asyncHandler(async (req, res) => {
    const { email, password, nickname } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ message: '이미 사용중인 이메일입니다.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, nickname });
    await user.save();

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    res.send({ message: '회원가입 성공', user });
}));

router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const pwMatch = await bcrypt.compare(password, user.password);
    if (!pwMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Login Success', user });
}));

router.get('/kakao', asyncHandler(async (req, res) => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.CLIENT_ID}&redirect_uri=${kakao.REDIRECT_URI}&response_type=code`;
    res.redirect(KAKAO_AUTH_URL);
}));

router.get('/kakao/callback',asyncHandler( async (req, res) => {
    const tokenResponse  = await axios({
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                grant_type: 'authorization_code',
                client_id: kakao.CLIENT_ID,
                redirect_uri: kakao.REDIRECT_URI,
                code: req.query.code
            })
        });

    const accessToken = tokenResponse.data.access_token;
    //req.session.kakaoToken = { access_token, refresh_token };
    
    // 사용자 정보 요청
    const userResponse = await axios({
        method: 'GET',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    
    const kakaoId = userResponse.data.id;                                       //kakaoId 받기위해 추가
    const nickname = userResponse.data.properties?.nickname || userResponse.data.properties?.profile_nickname;
                 //원래 코드 :     const nickname = userResponse.data.properties.nickname;
                 //원래 코드 :     const email = userResponse.data.properties.kakao_account.email;
    const email = userResponse.data.kakao_account?.email || userResponse.data.properties?.account_email;

    console.log('User Response:', userResponse.data);                           //정보 잘 받아지는지 확인 위해 추가
    console.log('User Info:', { kakaoId, nickname, email });                    //정보 잘 받아지는지 확인 위해 추가


    let user = await User.findOne({ email });                      

    let createAccount = false;
    if (!user) {
        user = new User({
            kakaoId,
            email,
            nickname,
        });
        await user.save();
        createAccount = true;
    }
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Login Success', user });

        //const payload = {profile_nickname, account_email};
        // const accessToken = generateToken(account_email);
        // const cookiOpt = { maxAge: 1000*60*60 };
        // res.cookie('accessToken', accessToken, cookiOpt);

        // if(user || createAccount){
        //     //return await this.login({ email, password });

        //     res.send({message: "로그인 성공"});
        // }    
    
    
    //req.session.kakao = userResponse.data;
    res.redirect('/');

}));


        // const { id, kakao_account: { email, profile: { nickname } } } = userResponse.data;
        // const token = generateToken(user);
        // res.cookie('token', token, { httpOnly: true });
        // res.json({ message: 'Login Success', user });

    

router.get('/logout', asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.send('Logged out');
}));

export default router;
