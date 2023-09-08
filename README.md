# jurassic.ai Q&A
This is an example application to show how to implement a question and answering application based on AI21 Contextual Answering API. 

The project uses Angular and Tailwind CSS. It uses a data set retrieved from Wikipedia, which you can find in `/dataset`.

## How to start

### Prerequisites
To run locally:
* NodeJS > v18 [Download latest version](https://nodejs.dev/en/download/)
* Account & API Key with AI21 [Sign Up](https://studio.ai21.com/sign-up)

### Run it locally
* pull this git repository
* make sure to copy `.env.template` to `.env` and add your API key in the right place
* run `npm install`

To get the dataset from wikipedia
* run `npm run getdata`
* to get correct labels and url attached to the documents, you might need to run `npm run updatemetadata` but the issue might also be fixed already

To upload the dataset to AI21
* run `npm run uploaddatatoai21`

To start the application
* run `npm run start`

### Deploy 
* run `npm run build`. This will generate the code needed in /dist/server. If you point a webserver to host the contents of this folder, and make sure the , it should work.

## deploy to a cloud service
There are multiple places where you can cheaply host a NodeJS site. I used render.com, but you can use Google cloud, Vercel, AWS etc.

Settings for render.com deployment
* repository: your github repo (you will need to give access to your github repo for this)
* branch: `main` - you can of course create a `release` branch and use that instead
* build command: `npm install; npm run build`
* start command: `npm run serveronly`
* autodeploy: `yes` - this is very cool. As soon as you push your code to github, the new code will be deployed immediately
* in the section 'environment' you will need to add the AI21 key `AI21_API_KEY` and save that

### Unit testing
Sorry, this is a demo...
