import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

// Generate JWT token
const generateToken = (userId: string, email: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-key';
  const expiresIn: string = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(
    { id: userId, email, role },
    secret,
    { expiresIn } as jwt.SignOptions
  );
};

export const register = async (req: Request, res: Response) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
      });
    }

    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User with this email already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    logger.info(`New user registered: ${user.email}`);

    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user,
        token,
      },
    });
  } catch (error: any) {
    logger.error('Registration error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error registering user',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    // Check if user is active
    if (user.status !== 'ACTIVE') {
      return res.status(403).json({
        status: 'error',
        message: 'Your account has been suspended or deactivated',
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    logger.info(`User logged in: ${user.email}`);

    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
        },
        token,
      },
    });
  } catch (error: any) {
    logger.error('Login error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error logging in',
    });
  }
};

export const getMe = async (req: any, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        location: true,
        role: true,
        verified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error: any) {
    logger.error('Get me error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching user data',
    });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie('token');
  return res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};
