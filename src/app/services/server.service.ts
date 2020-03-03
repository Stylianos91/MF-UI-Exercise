import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }
  private headerDict = {
    'Accept': '*/*',
    'Content-Type': '*/*'
  };
  private baseURL = 'https://jsonplaceholder.typicode.com/posts';
  getServerPosts() {
    return this.http.get(this.baseURL,
      {headers: new HttpHeaders(this.headerDict), responseType: 'text'}).pipe(map(
      (response) => {
        const data: any = JSON.parse(response);
        console.log(data);
        return (data);
      }
    ));
  }
}
