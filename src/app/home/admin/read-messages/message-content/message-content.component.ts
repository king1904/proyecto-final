import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.css'],
})
export class MessageContentComponent implements OnInit {
  message;
  constructor(@Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog) {
    this.message = data;
  }

  ngOnInit(): void {}
}
