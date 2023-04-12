import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
export const getContacts = async (req, res) => {
  const name = req.query.name || '';
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const result = await prisma.contact.findMany({
        where: {
          AND: [
            { OR: [{ owner_id: decodedAccess.id }, { user_id: decodedAccess.id }] },
            { user: { name: { contains: name } } },
          ],
        },
        select: {
          uuid: true,
          user_id: true,
          owner_id: true,
          user: {
            select: {
              name: true,
              img: true,
              uuid: true,
              last_online: true,
              online: true,
              email: true,
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
export const addContact = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const contact = await prisma.contact.findFirst({
        where: { AND: [{ user_id: req.body.userId }, { owner_id: decodedAccess.id }] },
      });
      if (contact) {
        return res.status(400).json({ message: 'The user already exists in contact' });
      }
      const user = await prisma.user.findUnique({
        where: { uuid: req.body.userId },
      });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const result = await prisma.contact.create({
        data: {
          user_id: req.body.userId,
          owner_id: decodedAccess.id,
        },
      });
      res.status(200).json(result);
      return false;
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getContact = async (req, res) => {
  try {
    const result = await prisma.contact.findMany({
      where: { uuid: req.params.id },
    });
    if (!result) {
      return res.status(200).json('Contacts not found');
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
  return false;
};
export const deleteContact = async (req, res) => {
  try {
    await prisma.contact.delete({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ message: 'Contact has been deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};
