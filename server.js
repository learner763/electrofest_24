import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, 'users.json');
const signedInUsersFilePath = path.join(__dirname, 'signedInUsers.json');

// Helper function to read signed-in users from file
const readSignedInUsers = () => {
  if (fs.existsSync(signedInUsersFilePath)) {
    const data = fs.readFileSync(signedInUsersFilePath, 'utf8');
    return new Set(JSON.parse(data));
  }
  return new Set();
};

// Helper function to write signed-in users to file
const writeSignedInUsers = (signedInUsers) => {
  fs.writeFileSync(signedInUsersFilePath, JSON.stringify(Array.from(signedInUsers), null, 2));
};

const signedInUsers = readSignedInUsers();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname,  'login.html'));
});

// Handle login requests
app.post('/login', (req, res) => {
  const { data_ } = req.body;

  // Simulate a simple authentication process
  {
    
    signedInUsers.add(data_);

    writeSignedInUsers(signedInUsers); // Save the updated list to the file
    res.json({ success: true });
  }
});

// Get all signed-in users
app.get('/signedInUsers', (req, res) => {
  res.json(Array.from(signedInUsers));
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'index.html'));
});

// Handle user management
app.get('/users', (req, res) => {
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading users file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading users file');
      return;
    }
    const users = JSON.parse(data);
    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing to users file');
        return;
      }
      res.status(201).send(newUser);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
