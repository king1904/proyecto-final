import { Component, OnInit, Inject } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageContentComponent } from './message-content/message-content.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-read-messages',
  templateUrl: './read-messages.component.html',
  styleUrls: ['./read-messages.component.css'],
})
export class ReadMessagesComponent implements OnInit {
  live = true;
  messages$: Observable<any>;
  messagesNumber: number;
  p: number = 0;
  constructor(
    private postService: PostsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.messages$ = this.getMessages();

    this.getMessages().subscribe((data: any) => {
      this.messagesNumber = data.length;
    });
  }

  getMessages() {
    return this.postService.getMessages();
  }
  deleteMessage(id: number) {
    this.postService.deleteMessage(id).subscribe(
      (data) => {
        this.messages$ = this.getMessages();

        this.snackBar.open('Mensage borrado con éxito!!!', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open('Ha ocurrido un error!!', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  openDialog(message) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    const dialogRef = this.dialog.open(MessageContentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
