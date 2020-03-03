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
  private baseURLPosts = 'https://jsonplaceholder.typicode.com/posts';
  private baseURLUsers = 'https://jsonplaceholder.typicode.com/users';
  getServerPosts() {
    return this.http.get(this.baseURLPosts,
      {headers: new HttpHeaders(this.headerDict), responseType: 'text'}).pipe(map(
      (response) => {
        const data: any = JSON.parse(response);
        return (data);
      }
    ));
  }
  getServerUsers() {
    return this.http.get(this.baseURLUsers,
      {headers: new HttpHeaders(this.headerDict), responseType: 'text'}).pipe(map(
      (response) => {
        const data: any = JSON.parse(response);
        return (data);
      }
    ));
  }
}
