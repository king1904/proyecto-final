import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  ViewEncapsulation,
  OnChanges,
} from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ChatComponent implements OnInit, OnDestroy {
  title = 'angular8-springboot-websocket';

  @ViewChild('ul') ul: ElementRef;

  contador = 0;
  name: string;
  content: string = '';
  leftRight: boolean = false;

  postForm = new FormGroup({
    content: new FormControl(''),
    date: new FormControl(Date.now()),
  });
  constructor(
    private webSocketAPI: WebSocketService,
    private renderer: Renderer2,
    private datePipe: DatePipe
  ) {}

  ngOnDestroy(): void {
    this.disconnect();
  }

  ngOnInit(): void {
    this.connect();

    this.webSocketAPI.messagesSubject$.subscribe((data) => {

        if (this.contador!=0) this.drawComment(data);

      this.contador++;
      //this.drawComment(data);
    });
  }

  sendMessage() {
    let user = JSON.parse(localStorage.getItem('user_data'));

    let sentMessage = {
      username: user.username,
      name: user.userDetails.name,
      img: user.userDetails.img.name,
      content: this.postForm.value.content,
      date: this.postForm.value.date,
    };

    this.webSocketAPI._send(sentMessage);

    this.postForm.controls['content'].reset();
  }

  drawComment(message) {
    message.username == JSON.parse(localStorage.getItem('user_data')).username
      ? (this.leftRight = false)
      : (this.leftRight = true);

    const li = this.renderer.createElement('li');

    this.leftRight
      ? this.renderer.setAttribute(li, 'class', 'message left appeared')
      : this.renderer.setAttribute(li, 'class', 'message right appeared');

    li.innerHTML = `
        <div class="post-heading">
         <div   class="right"> <a  ><b> ${message.username}</b> </a></div>
         <div class="col-md-2">
         <img class="avatar" name="pic" src="${message.img}" class="img img-rounded img-fluid rounded-circle z-depth-2"  />
         <p class="text-secondary text-center"><b> ${this.datePipe.transform(message.date, 'yyyy-MM-dd')}</b> </p>
    </div>
         </div>
        <div class="text_wrapper">
          <div class="text">${message.content}</div>
        </div>
        `;



    this.renderer.appendChild(this.ul.nativeElement, li);
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }
}
