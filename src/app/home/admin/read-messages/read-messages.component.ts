import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-read-messages',
  templateUrl: './read-messages.component.html',
  styleUrls: ['./read-messages.component.css']
})
export class ReadMessagesComponent implements OnInit {

  messages$:Observable<any>;
  constructor(private postService:PostsService) { }

  ngOnInit(): void {
    this.messages$=this.getMessages();
  }

  getMessages(){
    return this.postService.getMessages();
  }
}
