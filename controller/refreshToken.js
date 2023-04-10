import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const refreshToken = async (req, res) => {
  try {
    let decoded;
    if (req.cookies.access_token) {
      jwt.verify(req.cookies.access_token, process.env.ACCESS, async (err, decodedAccess) => {
        decoded = decodedAccess;
        if (err) {
          return false;
        }
        return false;
      });
    }
    if (decoded && decoded.exp * 1000 >= Date.now()) {
      return res.status(200).json({ message: 'Token Not refreshed' });
    }
    const user = await prisma.user.findFirst({
      where: {
        AND: [{ uuid: req.params.id }, { refresh_token: { not: null } }],
      },
    });
    if (!user) {
      return res.status(200).json({ message: 'Plese login to your account' });
    }
    const accessToken = jwt.sign({ id: user.uuid }, process.env.ACCESS, {
      // expiresIn: '30m',
      expiresIn: '30m',
    });
    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
        // secure:true
      })
      .status(200)
      .json({ message: 'Token refreshed' });
  } catch (error) {
    res.status(500).json(error);
  }
  return false;
};
export default refreshToken;
