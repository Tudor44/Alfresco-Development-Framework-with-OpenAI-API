import { Component, OnInit } from '@angular/core';
import { OpenAIService } from 'app/services/openai.service';

@Component({
  selector: 'openai-view',
  templateUrl: './openai-view.component.html',
  styleUrls: ['./openai-view.component.css']
})
export class OpenaiViewComponent {

  constructor(private openAIService: OpenAIService) { }

  // Boolean flag to indicate if the API call is in progress
  isLoading = false;

  // Event handler for the button click
  onButtonClick(): void {
    // Set isLoading to true to show loading state
    this.isLoading = true;

    // Define the prompt for the OpenAI API call
    let prompt: string = "Hello, write me a brief description of ADF for demonstrate that you, ChatGPT, reply correctly using the OpenAI API using Alfresco";

    // Call the getDataFromOpenAI method of OpenAIService and subscribe to the result
    this.openAIService.getDataFromOpenAI(prompt).subscribe(
      result => {
        // Display the result in an alert
        alert("Hello from OpenAI, this is Alfresco Development Framework. " + result);
        
        // Set isLoading to false to hide loading state
        this.isLoading = false;
      },
      error => {
        // Display an error message in an alert if the API call fails
        alert("Test Failed, there is something wrong with the OpenAI connection or the API key is invalid. Please check your environment configuration.");
        
        // Set isLoading to false to hide loading state
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    console.log("OpenAiViewComponent loaded.");
  }
}
