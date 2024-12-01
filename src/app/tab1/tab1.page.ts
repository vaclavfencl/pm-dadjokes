import { Component, OnInit } from '@angular/core';
import { DadJokeService } from '../services/dad-joke.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  joke: string = ''; 

  constructor(private dadJokeService: DadJokeService) {}

  ngOnInit() {
    this.getNewJoke(); 
  }

  getNewJoke() {

    this.dadJokeService.getRandomJoke().subscribe({
      next: (response) => {
        this.joke = response?.joke || 'No joke found.'; 
      },
      error: (error) => {
        console.error('Error fetching joke:', error);
        this.joke = 'Oops! Unable to fetch a joke right now.';
      },
    });
  }
}
