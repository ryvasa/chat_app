import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
export const getUsers = async (req, res) => {
  const name = req.query.name || '';
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const result = await prisma.user.findMany({
        select: {
          name: true,
          uuid: true,
          img: true,
          email: true,
          last_online: true,
        },
        where: {
          AND: [
            { uuid: { not: decodedAccess.id } },
            {
              name: {
                contains: name,
              },
            },
          ],
        },
      });
      res.status(200).json(result);
      return false;
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getUser = async (req, res) => {
  try {
    const result = await prisma.user.findUnique({
      select: {
        name: true,
        uuid: true,
        img: true,
        email: true,
        phone: true,
      },
      where: { uuid: req.params.id },
    });
    res.status(200).json({ user: result });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateUser = async (req, res) => {
  const { password } = req.body;
  let data = '';
  if (password) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    data = { ...req.body, password: hashPassword };
  } else {
    data = req.body;
  }
  try {
    const user = await prisma.user.update({
      where: { uuid: req.params.id },
      data: {
        ...data,
      },
      select: {
        uuid: true,
        name: true,
        email: true,
        img: true,
      },
    });
    res.status(200).json({ message: 'User has been updated', user });
  } catch (error) {
    return res.status(500).json(error);
  }
  return false;
};

export const deleteUser = async (req, res) => {
  try {
    const result = await prisma.user.delete({
      where: { uuid: req.params.id },
    });
    res.status(200).json({ message: 'User has been deleted', user: result });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getNotRegisteredUser = async (req, res) => {
  const name = req.query.name || '';
  const email = req.query.email || '';
  try {
    const result = await prisma.user.findFirst({
      select: {
        name: true,
        email: true,
      },
      where: { OR: [{ name }, { email }] },
    });
    if (result) {
      res.status(400).json({ message: 'Username or email already in use' });
    } else {
      res.status(200).json({ message: 'Ok' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
