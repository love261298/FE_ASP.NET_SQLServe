import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/demo/api/user';
import { ChatService } from './service/chat.service';

@Component({
    templateUrl: './chat.app.component.html'
})
export class ChatAppComponent{

    activeUser!: any;
}
