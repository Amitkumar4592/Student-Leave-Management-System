const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToMongoDB = require('./mongo');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const { email, password, type } = req.body;

    try {
        const { usersCollection } = await connectToMongoDB();
        const user = await usersCollection.findOne({ email });
        if (user && password === user.password && type === user.type) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/studentData', async (req, res) => {
    try {
        const { usersCollection } = await connectToMongoDB();
        const student = await usersCollection.findOne({ email: req.query.email });
        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/applyLeave', async (req, res) => {
    const { name, rollNumber, class: studentClass, leaveDescription, leaveDays } = req.body;

    try {
        const { leaveCollection } = await connectToMongoDB();
        const leaveApplication = {
            name,
            rollNumber,
            class: studentClass,
            leaveDescription,
            leaveDays,
            status: 'Pending',
            appliedDate: new Date(),
        };
        await leaveCollection.insertOne(leaveApplication);
        res.status(200).json({ message: 'Leave applied successfully' });
    } catch (error) {
        console.error('Error applying leave:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
