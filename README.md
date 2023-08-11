# Dinopedia Q&A
This is an example application to show how to implement a question and answering application based on AI21 Contextual Answering API. 

The project uses Angular and Tailwind CSS. It uses a data set retrieved from 

## How to start

### Prerequisites
To run locally:
* NodeJS > v18 [Download latest version](https://nodejs.dev/en/download/)
* Account & API Key with AI21 [Sign Up](https://studio.ai21.com/sign-up)

For deploying in Google Cloud
* Google developer account

### Run it locally
* pull this git repository
* run `npm install`

To get the dataset from wikipedia
* run `npm run getdata`
* to get correct labels and url attached to the documents, you might need to run `npm run updatemetadata` but the issue might also be fixed already

To upload the dataset to AI21
* make sure to copy `.env.template` to `.env` and add your API key in the right place
* run `npm run uploaddatatoai21`

To start the application
* run `npm run start`


### Unit testing
Sorry, this is a demo...

