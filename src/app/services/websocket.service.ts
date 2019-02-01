import { Injectable } from '@angular/core';
import { Observable, NextObserver, Subject } from 'rxjs';

@Injectable()
export class WebSocketService {

    private subject: Subject<MessageEvent>;

    public connect(url): Subject<MessageEvent> {
      if (!this.subject) {
        this.subject = this.create(url);
        console.log("Successfully connected: " + url);
      } 
      return this.subject;
    }

    public send(message: any) {
        this.subject.next(message);
    }

    private create(url: string): Subject<any> {
        const ws = new WebSocket(url);

        const observable = new Observable<any>(observer => {
            ws.onmessage = observer.next.bind(observer);
            ws.onclose = observer.complete.bind(observer);
            ws.onerror = observer.error.bind(observer);
            return ws.close.bind(ws);
        });

        const observer: NextObserver<any> = {
        next: message => {
            if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
            }
        }
    };

    return Subject.create(observer, observable);
  }
}