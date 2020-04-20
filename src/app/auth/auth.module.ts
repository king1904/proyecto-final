import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';
import { TokenInterceptorService } from '../token-interceptor.service';
@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  exports:[LoginComponent,RegisterComponent],

  providers:[AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi: true
  }]
})
export class AuthModule { }
