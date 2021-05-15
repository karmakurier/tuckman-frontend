import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class QuestionsService {

  constructor(private http: HttpClient) {

  }
  
  getQuestion() {
    return this.http.get<{Frage: string, type:string, id:string}[]>
    ('./assets/questions.json');
  }
}
