import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
export const addMessage = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const chat = await prisma.privateChat.findUnique({
        where: { uuid: req.params.id },
      });
      let data = {};
      if (chat) {
        data = {
          chat_id: req.params.id,
          message: req.body.message,
          user_id: decodedAccess.id,
        };
      } else {
        data = {
          group_id: req.params.id,
          message: req.body.message,
          user_id: decodedAccess.id,
        };
      }
      const result = await prisma.message.create({
        data,
      });
      res.status(200).json(result);

      return false;
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getMessages = async (req, res) => {
  try {
    console.log(req.params.id);

    const result = await prisma.message.findMany({
      where: { OR: [{ chat_id: req.params.id }, { group_id: req.params.id }] },
      // include: { user: true },
      include: { user: { select: { name: true, img: true, online: true } } },
    });
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
