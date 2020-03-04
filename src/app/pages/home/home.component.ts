import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../services/server.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private TABLE_DATA = [];
  private USERS = [];
  private POSTS = [];
  constructor(private serverService: ServerService) { }
  page = 1;
  pageSize = 10;
  max = this.TABLE_DATA.length / this.pageSize;

  get tableData() {
    return this.TABLE_DATA
      .map((post, i) => ({id: i + 1, ...post}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  increasePage() {
    this.page++;
    console.log(this.max);
  }
  decreasePage() {
    this.page--;
    console.log(this.max);
  }
  onGetPosts() {
    this.serverService.getServerPosts().subscribe(
      (response: any []) => {
        this.POSTS = response;
        this.onGetUsers();
      },
      (error) => console.log(error)
    );
  }
  onGetUsers() {
    this.serverService.getServerUsers().subscribe(
      (response: any []) => {
          this.USERS = response;
          console.log(this.USERS);
          console.log(this.POSTS);
          this.buildTable(this.USERS, this.POSTS);
      },
      (error) => console.log(error)
    );
  }
  buildTable(users, post) {
    let tableData = [];
    for (let i = 0; i < post.length; i++) {
      tableData.push({user: post[i].userId, body: post[i].body , title: post[i].title });
    }
    for (let i = 0; i < tableData.length; i++) {
      const id = tableData[i].user;
      tableData[i].user = users[id - 1];
    }
    console.log('-----------------');
    console.log(tableData);
    this.TABLE_DATA = tableData;
    this.max = this.TABLE_DATA.length / this.pageSize;
  }
  ngOnInit() {
    this.onGetPosts();
  }


  // for (let i = 0; i < this.TABLE_DATA.length; i++) {
  //   for (let j = 0; j < this.USERS.length; j++) {
  //     if (this.TABLE_DATA[i].userId === this.USERS[j].id ){
  //       this.TABLE_DATA[i].user = this.USERS[j].name;
  //     }
  //   }
  // }
  //this.max = this.TABLE_DATA.length / this.pageSize;
}
