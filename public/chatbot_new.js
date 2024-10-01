import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { NlpManager } from 'node-nlp';

const app = express();
const port = 3002;

// Configure body parser middleware to handle POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const manager = new NlpManager({ languages: ['en'] });

// Add general intents
manager.addDocument('en', 'Hello', 'greetings.hello');
manager.addDocument('en', 'Hi', 'greetings.hello');
manager.addDocument('en', 'How are you?', 'greetings.how_are_you');

// Add health-related intents
manager.addDocument('en', 'I have a headache', 'health.headache');
manager.addDocument('en', 'What should I do for a fever?', 'health.fever');
manager.addDocument('en', 'My stomach hurts', 'health.stomach_pain');
manager.addDocument('en', 'I feel sick', 'health.general_sick');
manager.addDocument('en', 'I have a cold', 'health.cold');
manager.addDocument('en', 'I have a cough', 'health.cough');

// Train the model
manager.train();

// Route for processing input in your backend:
app.post('/processInput', (req, res) => {
  const userInput = req.body.userInput;  // Match this with frontend parameter

  // Process user input using node-nlp
  manager
    .process('en', userInput)
    .then((response) => {
      let output;
      
      // Basic response handling based on the intent detected
      switch (response.intent) {
        case 'health.headache':
          output = 'For a headache, try resting in a quiet, dark room and drinking water. If it persists, consult a doctor.';
          break;
        case 'health.fever':
          output = 'If you have a fever, drink plenty of fluids and rest. You can also take fever-reducing medications. Contact a doctor if it lasts too long.';
          break;
        case 'health.stomach_pain':
          output = 'Stomach pain can have various causes. Drink water, avoid heavy meals, and rest. See a doctor if it persists.';
          break;
        case 'health.general_sick':
          output = 'If you feel sick, rest, stay hydrated, and monitor your symptoms. If they get worse, contact a healthcare professional.';
          break;
        case 'health.cold':
          output = 'For a cold, drink fluids, rest, and use over-the-counter medications if needed. See a doctor if symptoms worsen.';
          break;
        case 'health.cough':
          output = 'For a cough, drink warm liquids and consider cough syrups or lozenges. If it lasts more than a few weeks, consult a doctor.';
          break;
        default:
          output = 'Sorry, I am not sure how to help with that. Could you provide more details?';
      }

      res.json({ output });
    })
    .catch((error) => {
      console.error('Processing Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Set up a simple HTML form to take user input
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/index.html'); // Use process.cwd() for ES modules
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
