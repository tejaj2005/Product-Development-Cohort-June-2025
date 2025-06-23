import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType: userType || 'student', // Default to student if not provided
      auth_provider: 'local',
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
      },
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

router.post('/google/callback', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    if(payload){
        let user = await User.findOne({ email: payload.email });

        if (!user) {
          user = new User({
            name: payload.name,
            email: payload.email,
            profile_pic: payload.picture,
            auth_provider: 'google',
          });
          await user.save();
        }

        res.status(200).json({ 
            message: "Authentication successful", 
            user: {
                name: user.name,
                email: user.email,
                picture: user.profile_pic
            } 
        });
    } else {
        res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error verifying token', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
});

export default router; 