import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
export const addChat = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const findChat = await prisma.chat.findFirst({
        where: {
          privateChat: { some: { contact_id: req.body.contact_id } },
        },
      });
      if (findChat) {
        return res.status(400).json({ messagge: 'Chat is existed' });
      }
      const result = await prisma.chat.create({
        data: { user_id: decodedAccess.id },
      });
      if (result) {
        const data = { ...req.body, chat_id: result.uuid };
        if (req.body.group_name && req.body.member) {
          const addGroup = await prisma.groupChat.create({
            data,
          });
          res.status(200).json(addGroup);
        } else if (req.body.contact_id) {
          const addPrivate = await prisma.privateChat.create({
            data: { user_id: decodedAccess.id, ...req.body, chat_id: result.uuid },
          });
          res.status(200).json(addPrivate);
        }
      }
      return false;
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getChats = async (req, res) => {
  const name = req.query.name || '';
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const result = await prisma.chat.findMany({
        where: {
          OR: [
            { user_id: decodedAccess.id },
            {
              privateChat: { some: { contact: { contact: { uuid: decodedAccess.id } } } },
            },
          ],
          AND: {
            OR: [
              { groupChat: { some: { group_name: { contains: name } } } },
              {
                privateChat: { some: { contact: { contact: { name: { contains: name } } } } },
              },
            ],
          },
        },
        select: {
          uuid: true,
          message: {
            select: { message: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          groupChat: true,
          privateChat: {
            select: {
              contact: {
                select: {
                  contact: {
                    select: {
                      uuid: true,
                      name: true,
                      img: true,
                    },
                  },
                },
              },
            },
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
export const getChat = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const result = await prisma.chat.findFirst({
        where: {
          AND: [
            {
              uuid: req.params.id,
            },
            {
              OR: [
                { user_id: decodedAccess.id },
                { privateChat: { some: { contact: { contact: { uuid: decodedAccess.id } } } } },
              ],
            },
          ],
        },
        select: {
          uuid: true,
          message: true,
          groupChat: true,
          privateChat: {
            select: {
              contact: {
                select: {
                  contact: {
                    select: {
                      uuid: true,
                      name: true,
                      img: true,
                    },
                  },
                },
              },
            },
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
export const deleteChat = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const chat = await prisma.chat.findFirst({
        where: {
          AND: [
            {
              uuid: req.params.id,
            },
            {
              user_id: decodedAccess.id,
            },
          ],
        },
      });
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
      await prisma.chat.delete({
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
