import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppMessageService } from 'src/app/demo/service/app-message.service';
import { MessageService } from 'src/app/demo/service/message.service';

@Component({
    selector: 'app-new-comment',
    templateUrl: './new-comment.component.html'
})
export class NewCommentComponent implements OnInit {
    description: string = ''
    constructor(private messageService: MessageService, private msgService: AppMessageService) { }
    ngOnInit(): void {

    }
    @Input() blog: any
    @Output() blogChange = new EventEmitter<any>();
    submit() {
        if (this.description == null) {
            return;
        }
        const data = {
            blogId: this.blog.id,
            description: this.description
        }
        this.messageService.create(data).subscribe({
            next: res =>{
                this.blog.messages.push(res)
                this.blogChange.emit()
                this.description = '';
                this.msgService.success("Gửi tin nhắn thành công!")
            }
        })
    }
}
