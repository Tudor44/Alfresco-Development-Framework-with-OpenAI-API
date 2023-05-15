# Alfresco Development Framework Application with OpenAI Integration

This project is a minimal Angular CLI project template that comes pre-configured with OpenAI integration and a test component.

## Quick start

```sh
npm install
npm start
```

## Supported ADF component libraries

This project already has all the existing ADF component libraries pre-configured. The main focus of the project is to:

- Integrate and set up ADF
- Provide a basic demonstration of working components
- Demonstrate the integration with OpenAI

## Development server

To run the development server, use the command ng serve. Navigate to http://localhost:4200/ in your browser. The app will automatically reload if you make any changes to the source files.

### Proxy settings

The project includes proxy settings to allow running the web application locally without CORS setup. You can find the details in the proxy.conf.js file. Here is the list of URLs being proxied:

List of URLs being proxied:

- `/alfresco` -> `http://0.0.0.0:8080`
- `/activiti-app` -> `http://0.0.0.0:9999`

## Configure OpenAI key
To configure your OpenAI API key, open the app/environment/environment.ts file and add the following configuration:


```js
export const environment = {
  production: false,
  openAiToken : <your-api-key>
};

```

## Code scaffolding

You can generate new components using the command ng generate component component-name -m app.module. Additionally, you can use ng generate directive|pipe|service|class|module to generate other Angular artifacts.

The Angular service responsible for handling OpenAI API calls is openai.service.ts. Here's an example implementation:

```js
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Configuration, OpenAIApi } from 'openai';
import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  constructor() { }

  // Load API key from environments
  readonly configuration = new Configuration({
    apiKey: environment.openAiToken
  });
  
  // Instantiate OpenAIApi with the configuration
  readonly openai = new OpenAIApi(this.configuration);

  // Method to invoke OpenAI's createCompletion, with a fixed model and tokens.
  getDataFromOpenAI(text: string) {
    return from(this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 256
    })).pipe(
      // Filter out responses that are undefined or have no data
      filter(resp => !!resp && !!resp.data),
      // Extract the data from the response
      map(resp => resp.data),
      // Filter out responses that don't have choices or have an empty choices array
      filter((data: any) => data.choices && data.choices.length > 0 && data.choices[0].text),
      // Extract the text from the first choice
      map(data => data.choices[0].text)
    );
  }
}

```

## Build

To build the project, use the command ng build. The build artifacts will be stored in the dist/ directory. You can use the -prod flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
