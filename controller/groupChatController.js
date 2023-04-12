import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
export const addGroupChat = async (req, res) => {
  const { groupName, member } = req.body;
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      member.push(decodedAccess.id);
      const data = { group_name: groupName, member };
      const result = await prisma.groupChat.create({
        data,
      });
      res.status(200).json(result);
      return false;
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getGroupChats = async (req, res) => {
  const name = req.query.name || '';
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const results = await prisma.groupChat.findMany({
        where: {
          AND: [
            { member: { array_contains: decodedAccess.id } },
            { group_name: { contains: name } },
          ],
        },
        include: {
          message: { orderBy: { createdAt: 'desc' }, take: 1 },
        },
      });
      return res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getGroupChat = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const result = await prisma.groupChat.findFirst({
        where: {
          AND: [
            {
              uuid: req.params.id,
            },
            { member: { array_contains: decodedAccess.id } },
          ],
        },
        include: {
          message: { include: { user: { select: { online: true, name: true, img: true } } } },
        },
      });
      res.status(200).json(result);
      return false;
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const outGroupChat = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const result = await prisma.groupChat.findFirst({
        where: {
          AND: [
            {
              uuid: req.params.id,
            },
            { member: { array_contains: decodedAccess.id } },
          ],
        },
        include: {
          message: { include: { user: { select: { online: true, name: true, img: true } } } },
        },
      });
      if (result) {
        const { member } = result;
        const data = member.filter((m) => m !== decodedAccess.id);
        const updateMember = await prisma.groupChat.update({
          where: {
            uuid: req.params.id,
          },
          data: { member: data },
        });
        res.status(200).json(updateMember);
      }
      return false;
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteGroupChat = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const chat = await prisma.groupChat.findFirst({
        where: {
          AND: [
            {
              uuid: req.params.id,
            },
            { member: { array_contains: decodedAccess.id } },
          ],
        },
      });
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
      await prisma.groupChat.delete({
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
