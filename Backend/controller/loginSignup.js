import bcrypt from 'bcrypt';
import { Register } from '../MongoesSchema/registerSchema.js';
import { createToken } from '../Midlewere/authentication.js';
const salt = 10

const signup = async (req, res) => {
    const { name, email, password, mobile_number, role, adminToken } = req.body;
    try {
        // Check if user already exists
        let user = await Register.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists. Please Login!' });
        }

        // Validate admin token for admin role
        if (role === 'admin' && adminToken !== 'AmitYadav222137') {
            return res.status(401).json({ message: 'Invalid admin token' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const hashedadminToken = await bcrypt.hash(adminToken, salt);

        const newUser = new Register({
            name,
            email,
            password: hashedPassword,
            mobile_number,
            role,
            adminToken: hashedadminToken,
        });

        const result = await newUser.save();
        res.status(201).json({ message: "Signup successful", result });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Login user 
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        let user = await Register.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email or Password. Please check..' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(email)
            res.cookie('token', token)
            res.status(200).json({ message: "user login successfully..", user, token })
        } else {
            return res.status(401).json({ message: 'invalid password..' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const checkEmailExists = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Register.findOne({ email });
        if (user) {
            return res.status(200).json({ exists: true });
        }
        return res.status(200).json({ exists: false });
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all signup data
const getAllUsers = async (req, res) => {
    try {
        const users = await Register.find({});
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get login data
const GetLoginData = async (req, res) => {
    try {
        // Assuming req.user is set by authentication middleware
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const loginData = await Register.findOne({ email: req.user.email });
        if (!loginData) {
            return res.status(404).json({ message: 'User not logedIn found' });
        }
        res.json(loginData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

// Update an item
const UpdateLoginData = async (req, res) => {
    const { email, password } = req.body;
    try {
        const updatedItem = await Register.findOne({ email });
        if (!updatedItem) {
            return res.status(404).json({ message: 'user not found..' })
        }

        const hashedPassword = await bcrypt.hash(password, salt)
        const submit = ({ ...req.body, password: hashedPassword })
        const updateData = await Register.findOneAndUpdate({ email }, { $set: submit }, { new: true })
        res.status(200).json({ message: "user update successfully...", updateData })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an item
const DeleteUserData = async (req, res) => {
    const { id } = req.body; // Ensure this matches the data structure sent from React
    try {
        // Assuming 'Register' is your model or schema
        const deletedItem = await Register.findOneAndDelete({ _id: id }); // Use _id for MongoDB

        if (!deletedItem) {
            return res.status(404).json({ message: 'User data not found.' });
        }

        res.json({ message: 'User data deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Logout function
const logout = (req, res) => {
    try {
        // Clear the token cookie on the client side
        res.clearCookie('token');

        // Send a response indicating successful logout
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error during logout' });
    }
};

export { signup, login, checkEmailExists, getAllUsers, GetLoginData, DeleteUserData, UpdateLoginData, logout };