import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get('/locations', async(req, res) => {
    //장소 목록 조회
    const locations = await prisma.location.findMany();
    res.send(locations);
})

app.get('/locationsByName', async (req, res) => {
    //이름으로 장소 검색
    const { name } = req.query;

    if (!name) {
        return res.status(400).send({ error: 'Name query parameter is required' });
    }

    try {
        const locations = await prisma.location.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });

        if (locations.length > 0) {
            res.send(locations);
        } else {
            res.status(404).send({ message: 'No locations found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while retrieving the locations' });
    }
});


//사용자의 찜목록 조회
// 사용자의 찜목록 조회
app.get('/scraps/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const scraps = await prisma.scrap.findMany({
            where: { scrapperId: email },
            include: { scrapPlace: true }, // 장소 정보 포함
        });

        res.send(scraps);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while retrieving scraps' });
    }
});


//특정 사용자 찜추가
app.post('/scraps/:email', async (req, res) => {
    const { email } = req.params;
    const { locationId } = req.body;

    try {
        // 해당 사용자가 이미 이 장소를 찜했는지 확인
        const existingScrap = await prisma.scrap.findUnique({
            where: {
                scrapperId_scrapPlaceId: {
                    scrapperId: email,
                    scrapPlaceId: locationId,
                },
            },
        });

        if (existingScrap) {
            // 이미 찜한 장소라면 해당 사실을 반환
            return res.status(200).send({ message: 'This location is already in your scrap list.' });
        }

        // 찜하지 않은 장소라면 새로 추가
        const newScrap = await prisma.scrap.create({
            data: {
                scrapper: { connect: { email } },
                scrapPlace: { connect: { id: locationId } },
            },
        });

        res.status(201).send(newScrap);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while adding the scrap' });
    }
});




//사용자의 일정 조회
app.get('/events/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const events = await prisma.event.findMany({
            where: { eventCreatorId: email },
            include: { locations: { include: { location: true } } },
        });

        res.send(events);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while retrieving events' });
    }
});


//일정 생성하기
// 기존 날짜에 이벤트가 없으면 생성하고, 있으면 장소 추가 API  -- 이메일을 통해서 사용자 아이디 가져오는 함수 필요
app.post('/events', async (req, res) => {
    const { eventCreatorId, eventDate, locationId } = req.body;

    try {
        // 해당 날짜에 이벤트가 있는지 확인
        const existingEvent = await prisma.event.findFirst({
            where: {
                eventCreatorId,
                eventDate: new Date(eventDate)
            }
        });

        if (existingEvent) {
            // 기존 이벤트에 장소 추가
            const updatedEvent = await prisma.event.update({
                where: { id: existingEvent.id },
                data: {
                    locations: {
                        create: {
                            location: {
                                connect: { id: locationId }
                            }
                        }
                    }
                },
                include: {
                    locations: {
                        include: { location: true }
                    }
                }
            });

            res.status(200).send(updatedEvent);
        } else {
            // 새로운 이벤트 생성
            const newEvent = await prisma.event.create({
                data: {
                    eventCreatorId: eventCreatorId,
                    eventDate: new Date(eventDate),
                    locations: {
                        create: {
                            location: {
                                connect: { id: locationId }
                            }
                        }
                    }
                },
                include: {
                    locations: {
                        include: { location: true }
                    }
                }
            });

            res.status(201).send(newEvent);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while processing the event' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});