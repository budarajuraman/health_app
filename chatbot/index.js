// Let's start with importing `NlpManager` from `node-nlp`. This will be responsible for training, saving, loading and processing.

import { NlpManager } from 'node-nlp';
console.log('Starting Chatbot ...');

const chatbot = async (inputValue) => {
  const manager = new NlpManager({ languages: ['en'] });
  // Loading our saved model
  manager.load();

  const response = await manager.process('en', inputValue);

  return response.answer;
};
export default chatbot;
