import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  messagesSubject$ = new BehaviorSubject<any>({});
  mensajesNoVistos:any[]=[];

  private baseUrl = environment.baseUrlRestServices;

  topic: string = '/topic/public';
  stompClient: any;
  message;

  constructor() {}

  _connect() {
    console.log('Initialize WebSocket Connection');
    let ws = new SockJS(this.baseUrl + '/webchat');
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect(
      {},
      function (frame) {
        _this.stompClient.subscribe(_this.topic, (sdkEvent) => {
          _this.onMessageReceived(sdkEvent);
        });
        //_this.stompClient.reconnect_delay = 2000;
      },
      this.errorCallBack
    );
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message) {
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/chat.send', {}, JSON.stringify(message));
    // console.log(message)
  }

  onMessageReceived(message) {
    console.log('Message Recieved from Server :: ' + message.body);

    this.messagesSubject$.next(JSON.parse(message.body));
    this.message = message.body;

    console.log('HOLAAAAAAAAAAAAAAAA');
  }
}
