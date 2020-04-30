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
import { NgxPayPalModule } from 'ngx-paypal';
import { AddProductComponent } from './home/admin/add-product/add-product.component';
import { ReadMessagesComponent } from './home/admin/read-messages/read-messages.component';
import { UserControlComponent } from './home/admin/user-control/user-control.component';
import { PcComponent } from './home/category/pc/pc.component';
import { LaptopComponent } from './home/category/laptop/laptop.component';
import { MobileComponent } from './home/category/mobile/mobile.component';




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
    AddProductComponent,
    ReadMessagesComponent,
    UserControlComponent,
    PcComponent,
    LaptopComponent,
    MobileComponent,

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
    NgxPayPalModule



  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
