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

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ChatComponent implements OnInit, OnDestroy {
  title = 'angular8-springboot-websocket';

  @ViewChild('ul') ul: ElementRef;

  message;
  messagePrueba="Hola";
  name: string;
  content: string = '';
  leftRight: boolean = false;

  postForm = new FormGroup({
    user: new FormControl(JSON.parse(localStorage.getItem('user_data'))),
    content: new FormControl(''),
    date: new FormControl(Date.now())
  });
  constructor(
    private webSocketAPI: WebSocketService,
    private renderer: Renderer2
  ) {}


  ngOnDestroy(): void {
    this.disconnect();
  }

  ngOnInit(): void {
    this.connect();

    this.webSocketAPI.messagesSubject$.subscribe(data=>{
     this.message= data;
     setTimeout(()=>
    {if(data!=undefined) this.drawComment(data);},400)
  //this.drawComment(data);
     })

  }

  sendMessage() {

    this.webSocketAPI._send(this.postForm.value);

    this.postForm.controls['content'].reset();



  }

  drawComment(message){

        const li = this.renderer.createElement('li');

        this.leftRight
          ? this.renderer.setAttribute(li, 'class', 'message right appeared')
          : this.renderer.setAttribute(li, 'class', 'message left appeared');


        li.innerHTML = `
        <div class="post-heading">
         <div   class="right"> <a  ><b> ${message.user.username}</b> </a></div>

         <img class="avatar" name="pic" src="${message.user.img}" class="img img-rounded img-fluid rounded-circle z-depth-2"/>
         <div   class="right"> <a  ><b> ${message.date}</b> </a></div>

         </div>
        <div class="text_wrapper">
          <div class="text">${message.content}</div>
        </div>
        `;

        this.renderer.appendChild(this.ul.nativeElement, li);

        this.leftRight = !this.leftRight;
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }


}
