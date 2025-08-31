const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        
        user = new User({ name, email, password });
        await user.save();

        const payload = { 
            user: { 
                id: user.id,
                name: user.name // Add name to payload
            } 
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = { 
            user: { 
                id: user.id,
                name: user.name // Add name to payload
            } 
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get user data
exports.getUser = async (req, res) => {
    try {
        console.log('Fetching user data for ID:', req.user.id);
        console.log('User object from token:', req.user);
        
        // req.user.id is set by the auth middleware
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            console.log('User not found in database');
            return res.status(404).json({ msg: 'User not found' });
        }
        
        console.log('User data from database:', user);
        console.log('User name:', user.name);
        
        res.json(user);
    } catch (err) {
        console.error('Error in getUser:', err.message);
        res.status(500).send('Server Error');
    }
};
