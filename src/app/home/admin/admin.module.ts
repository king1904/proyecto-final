import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AddProductComponent } from './add-product/add-product.component';
import { ReadMessagesComponent } from './read-messages/read-messages.component';
import { UserControlComponent } from './user-control/user-control.component';
import { MessageContentComponent } from './read-messages/message-content/message-content.component';
import { CoreModule } from 'src/app/shared/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AddProductComponent,
    ReadMessagesComponent,
    UserControlComponent,
    MessageContentComponent,
   ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule
  ],
  exports: [
    AddProductComponent,
    ReadMessagesComponent,
    UserControlComponent,
    MessageContentComponent,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [],
})
export class AdminModule {}
