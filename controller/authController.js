import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
export const register = async (req, res) => {
  const { password, name, email } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ name: { equals: name } }, { email: { equals: email } }],
    },
  });
  if (user) {
    return res.status(400).json({ message: 'Email or name alredy in use' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must more than 6 character' });
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const result = await prisma.user.create({
      data: { ...req.body, password: hashPassword },
      select: {
        uuid: true,
        name: true,
        email: true,
      },
    });
    res.status(200).json({ user: result });
  } catch (error) {
    res.status(500).json(error);
  }
  return false;
};
export const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ message: `User with email ${email} not found` });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({ message: 'Wrong password' });
    }
    const accessToken = jwt.sign({ id: user.uuid }, process.env.ACCESS, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign({ id: user.uuid }, process.env.REFRESH, {
      expiresIn: '2d',
    });

    const updateUser = await prisma.user.update({
      data: { refresh_token: refreshToken },
      where: { uuid: user.uuid },
      select: {
        uuid: true,
        name: true,
        email: true,
        img: true,
        phone: true,
      },
    });

    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
        // secure:true
      })
      .status(200)
      .json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
  return false;
};
export const logout = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const user = await prisma.user.findUnique({
        where: { uuid: decodedAccess.id },
      });
      await prisma.user.update({
        data: {
          refresh_token: null,
        },
        where: { uuid: user.uuid },
      });
      res
        .cookie('access_token', '', { expires: new Date(0) })
        .status(200)
        .json({ message: 'User Sign Out' });
      return false;
    });
  } catch (error) {
    return res.status(500).json(error);
  }
  return false;
};
export const getMe = async (req, res) => {
  try {
    jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const user = await prisma.user.findUnique({
        where: { uuid: decodedAccess.id },
        select: {
          uuid: true,
          name: true,
          img: true,
          email: true,
          phone: true,
        },
      });
      res.status(200).json(user);
      return false;
    });
  } catch (error) {
    return res.status(500).json(error);
  }
  return false;
};
export const getFirstToken = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { uuid: req.params.id },
    });
    const accessToken = jwt.sign({ id: user.uuid }, process.env.ACCESS, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign({ id: user.uuid }, process.env.REFRESH, {
      expiresIn: '2d',
    });
    const updateUser = await prisma.user.update({
      data: { refresh_token: refreshToken },
      where: { uuid: user.uuid },
      select: {
        uuid: true,
        name: true,
        email: true,
        img: true,
        phone: true,
      },
    });
    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
        // secure:true
      })
      .status(200)
      .json(updateUser);
  } catch (error) {
    return res.status(500).json(error);
  }
  return false;
};
