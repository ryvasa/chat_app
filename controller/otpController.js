import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { sendVerifyOtp } from './mailController.js';

const prisma = new PrismaClient();
export const sendOtp = async (req, res) => {
  const { email, from } = req.body;

  try {
    const getOtp = await prisma.otp.findUnique({
      where: { email },
    });
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), salt);
    const timestamp = Date.now() + 60 * 60 * 1000;
    const date = new Date(timestamp);
    const expiredAt = date.toISOString();
    const data = { email, otp: hashedOtp, expiredAt };
    if (getOtp) {
      await prisma.otp.update({
        where: { email },
        data,
      });
    } else {
      await prisma.otp.create({
        data,
      });
    }
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const formattedDate = date.toLocaleString('en-US', options);
    const send = {
      from,
      email,
      otp,
      formattedDate,
    };
    sendVerifyOtp(send)
      .then(() => {
        res.status(200).json({ message: 'Email sended' });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const getOtp = await prisma.otp.findUnique({
      where: { email },
    });
    const validateOtp = await bcrypt.compare(otp, getOtp.otp);
    if (!validateOtp) {
      return res.status(400).json({ message: 'OTP not valid!' });
    }
    await prisma.otp.delete({
      where: { email },
    });
    res.status(200).json({ message: 'Verify success', validateOtp });
  } catch (error) {
    res.status(500).json(error);
  }
  return false;
};
