import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PostsComponent } from './product-details/posts/posts.component';
import { MisComprasComponent } from './mis-compras/mis-compras.component';
import { PcComponent } from './category/pc/pc.component';
import { LaptopComponent } from './category/laptop/laptop.component';
import { MobileComponent } from './category/mobile/mobile.component';
import { ChatComponent } from './chat/chat.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../shared/core.module';
import { AdminModule } from './admin/admin.module';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { SearchComponent } from './search/search.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { ProductHolderComponent } from './category/product-holder/product-holder.component';
 import { AuthModule } from '../auth/auth.module';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    CartComponent,
    ProductDetailsComponent,
    ContactUsComponent,
    SearchComponent,
    PostsComponent,
    MisComprasComponent,
    PcComponent,
    LaptopComponent,
    MobileComponent,
    ChatComponent,
    LoadingSpinnerComponent,
    ProductHolderComponent,
    DialogoConfirmacionComponent,
   ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    AdminModule,
    NgxPayPalModule,
    RouterModule,
    AuthModule
  ],
  exports: [
    ProfileComponent,
    CartComponent,
    ProductDetailsComponent,
    ContactUsComponent,
    SearchComponent,
    PostsComponent,
    MisComprasComponent,
    PcComponent,
    LaptopComponent,
    MobileComponent,
    ChatComponent,
    NgxPayPalModule,
    DialogoConfirmacionComponent
   ],
  providers: [],
  bootstrap: [],
})
export class HomeModule {}
