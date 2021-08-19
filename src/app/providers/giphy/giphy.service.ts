import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private apiKey = environment.giphy.apiKey;

  constructor(private http: HttpClient) {}

  getGifsByKeyword(keyword: string) {
    return this.http.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${keyword}&limit=5&offset=0&rating=G&lang=en`,
    );
  }
}
