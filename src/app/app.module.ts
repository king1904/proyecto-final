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
import { ChatComponent } from './home/chat/chat.component';


import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule  } from '@covalent/core/steps';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';


import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CovalentNotificationsModule } from '@covalent/core/notifications';
import { OverlayModule} from '@angular/cdk/overlay';
import { MatTreeModule } from '@angular/material/tree';

import { CovalentSearchModule } from '@covalent/core/search';
import { DatePipe } from '@angular/common';


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
    ChatComponent,
    MainNavComponent,

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
    NgxPayPalModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    BrowserAnimationsModule,
    MatCarouselModule.forRoot(),
    MatIconModule,
    MatListModule,
    MatMenuModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    CovalentSearchModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    CovalentNotificationsModule,
    OverlayModule,
    MatTreeModule



  ],
  providers: [AuthService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
