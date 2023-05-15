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

  //load apikey from environments
  readonly configuration = new Configuration({
    apiKey: environment.openAiToken
  });
  
  //openapi instance 
  readonly openai = new OpenAIApi(this.configuration);

  //method invoke openapi using createCompletion, with fixed model and tokens.
  getDataFromOpenAI(text: string) {
    return from(this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 256
    })).pipe(
      filter(resp => !!resp && !!resp.data),
      map(resp => resp.data),
      filter((data: any) => data.choices && data.choices.length > 0 && data.choices[0].text),
      map(data => data.choices[0].text)
    );
  }
}
