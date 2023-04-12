import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
export const addPrivateChat = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const chat = await prisma.privateChat.findFirst({
        where: {
          AND: [{ sender_id: decodedAccess.id }, { receiver_id: req.body.receiverId }],
        },
      });
      if (chat) {
        return res.status(400).json({ message: 'Chat already exist' });
      }
      const data = { sender_id: decodedAccess.id, receiver_id: req.body.receiverId };
      const result = await prisma.privateChat.create({
        data,
      });
      res.status(200).json(result);
      return false;
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getPrivateChats = async (req, res) => {
  const name = req.query.name || '';
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const results = await prisma.privateChat.findMany({
        where: { OR: [{ sender_id: decodedAccess.id }, { receiver_id: decodedAccess.id }] },
        include: {
          message: { orderBy: { createdAt: 'desc' }, take: 1 },
          sender: {
            select: { name: true, uuid: true, online: true, last_online: true, img: true },
          },
          receiver: {
            select: { name: true, uuid: true, online: true, last_online: true, img: true },
          },
        },
      });

      const filteredResults = results.filter(
        (chat) => chat.sender.name.includes(name) || chat.receiver.name.includes(name),
      );

      return res.status(200).json(filteredResults);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getPrivateChat = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const result = await prisma.privateChat.findFirst({
        where: {
          AND: [
            {
              uuid: req.params.id,
            },
            { OR: [{ sender_id: decodedAccess.id }, { receiver_id: decodedAccess.id }] },
          ],
        },
        include: {
          message: true,
          sender: {
            select: { name: true, uuid: true, online: true, last_online: true, img: true },
          },
          receiver: {
            select: { name: true, uuid: true, online: true, last_online: true, img: true },
          },
        },
      });
      res.status(200).json(result);
      return false;
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deletePrivateChat = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const chat = await prisma.privateChat.findFirst({
        where: {
          AND: [
            {
              uuid: req.params.id,
            },
            { OR: [{ sender_id: decodedAccess.id }, { receiver_id: decodedAccess.id }] },
          ],
        },
      });
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
      await prisma.privateChat.delete({
        where: { uuid: chat.uuid },
      });
      res.status(200).json({ message: 'Chat has been deleted' });
      return false;
    });
  } catch (error) {
    res.status(500).json(error);
  }
  return false;
};
