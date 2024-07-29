import express from 'express';
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';
//import { assert } from 'superstruct';
//import { CreateReview, UpdateReview } from './structs.js';

dotenv.config();

const prisma = new PrismaClient();
const location = express.Router();
location.use(express.json());

// id에 해당하는 장소 조회
location.get('/locationsByName/:id/', async (req, res) => {
    const { id } = req.params;
    const location = await prisma.locaiton.findUnique({
      where: { id: Number(id) },
      include: {reviews: true},
    });
    if (location){
        res.send(location);
    }
    else{
        res.status(404).send({message:"Location not found."});
    }
  });
  
  location.post('/locationsByName/:id/reviews', async (req, res) => {
    // 리퀘스트 바디 내용으로 리뷰 생성
    assert(req.body, CreateReview);
    const review = await prisma.review.create({
      data: {
        ...req.body,
        locationId: Number(id), // 해당 location의 리뷰로 연결
      },
    });
    res.status(201).send(review);
  });
  
  //리뷰 수정 
  location.patch('/reviews/:reviewId', async (req, res) => {
      assert (req.body, UpdateReview);
      const { reviewId } = req.params;
      const user = await prisma.review.update({
          where: {id: Number(reviewId)},
          data: req.body,
      });
      res.send(user);
  });
  
  //리뷰 삭제 
  location.delete('/reviews/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
      await prisma.review.delete({
          where: {id: Number(reviewId)},
      });
    res.sendStatus(204);
  });