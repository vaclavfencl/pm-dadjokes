import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DadJokeService {
  private apiUrl = 'https://icanhazdadjoke.com/';

  constructor(private http: HttpClient) {}

  /**
   * Fetch a random dad joke.
   * @returns {Observable<any>} 
   */
  getRandomJoke(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: { Accept: 'application/json' },
    });
  }
}
