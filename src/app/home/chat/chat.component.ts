import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  ViewEncapsulation,

} from '@angular/core';
import { WebSocketService } from 'src/app/shared/services/web-socket.service';
import { FormGroup, FormControl } from '@angular/forms';
 import { DatePipe } from '@angular/common';
 import { TimeagoIntl, TimeagoPipe } from 'ngx-timeago';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ChatComponent implements OnInit, OnDestroy {
  title = 'angular8-springboot-websocket';

  @ViewChild('ul') ul: ElementRef;


  postedIn:any[];
  contador = 0;
  live=true;
  messageNumber=0;
  name: string;
  content: string = '';
  leftRight: boolean = false;

  postForm = new FormGroup({
    content: new FormControl(''),
    date: new FormControl(""),
  });
  constructor(
    private webSocketAPI: WebSocketService,
    private renderer: Renderer2,
    private datePipe: DatePipe,
    private intl: TimeagoIntl,
    private timeAgoPipe:TimeagoPipe

  ) {
    intl.changes.next();

  }

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
    let time= new Date().getTime();
    let fecha  = new Date(time);

    let sentMessage = {
      username: user.username,
      name: user.userDetails.name,
      img: user.userDetails.img.name,
      content: this.postForm.value.content,
      date: fecha
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
         <p class="text-secondary text-center"><b> ${ this.timeAgoPipe.transform( message.date,this.live)} </b> </p>
    </div>
         </div>
        <div class="text_wrapper">
          <div class="text">${message.content}</div>
        </div>
        `;



    this.renderer.appendChild(this.ul.nativeElement, li);
    this.ul.nativeElement.scrollTop = this.ul.nativeElement.scrollHeight;  }



  connect() {

    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  keyDownFunction(event,message) {
    if (event.keyCode === 13 && message!=null) {

      this.sendMessage();
    }
  }

}
