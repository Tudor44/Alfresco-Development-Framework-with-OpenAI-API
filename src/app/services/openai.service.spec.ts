import { TestBed, inject } from '@angular/core/testing';
import { OpenAIService } from './openai.service';
import { AxiosResponse } from 'axios';

interface CreateCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: { text: string }[];
}

describe('OpenAIService', () => {
  let openAIService: OpenAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenAIService]
    });
  });

  beforeEach(inject([OpenAIService], (service: OpenAIService) => {
    openAIService = service;
  }));

  it('should be created', () => {
    expect(openAIService).toBeTruthy();
  });

  it('should retrieve data from OpenAI', (done: DoneFn) => {
    const mockText = 'Hello, world!';
    const expectedResponse = 'This is a mock response from OpenAI';

    // Mock the createCompletion method
    spyOn(openAIService.openai, 'createCompletion').and.returnValue(Promise.resolve({
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      data: {
        id: 'mockId',
        object: 'mockObject',
        created: Date.now(),
        model: 'mockModel',
        choices: [{ text: expectedResponse }]
      }
    } as AxiosResponse<CreateCompletionResponse>));

    // Call the service method
    openAIService.getDataFromOpenAI(mockText).subscribe((response: string) => {
      expect(response).toEqual(expectedResponse);
      done();
    });

    // Ensure the createCompletion method was called with the correct arguments
    expect(openAIService.openai.createCompletion).toHaveBeenCalledWith({
      model: 'text-davinci-003',
      prompt: mockText,
      max_tokens: 256
    });
  });
});
