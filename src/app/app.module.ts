import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './home/profile/profile.component';

import { CartComponent } from './home/cart/cart.component';
import { OrdenadoresListComponent } from './home/ordenadores-list/ordenadores-list.component';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { SearchComponent } from './home/search/search.component';
import { HttpClientModule} from "@angular/common/http";
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { AuthRoutingModule } from './auth/auth-routing.module';

import { AuthModule } from './auth/auth.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './home/product-details/posts/posts.component';
import { MisComprasComponent } from './home/mis-compras/mis-compras.component';
import { AuthService } from './auth.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,

    CartComponent,
    OrdenadoresListComponent,
    ProductDetailsComponent,
    ContactUsComponent,
    SearchComponent,
    LoadingSpinnerComponent,
    PostsComponent,
    MisComprasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    AuthRoutingModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,



  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
