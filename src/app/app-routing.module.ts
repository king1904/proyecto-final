import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './home/profile/profile.component';
import { CartComponent } from './home/cart/cart.component';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { MisComprasComponent } from './home/mis-compras/mis-compras.component';
import { AddProductComponent } from './home/admin/add-product/add-product.component';
import { ReadMessagesComponent } from './home/admin/read-messages/read-messages.component';
import { UserControlComponent } from './home/admin/user-control/user-control.component';
import { PcComponent } from './home/category/pc/pc.component';
import { MobileComponent } from './home/category/mobile/mobile.component';
import { LaptopComponent } from './home/category/laptop/laptop.component';
import { ChatComponent } from './home/chat/chat.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'home', component: HomeComponent },
  { path: 'category/pc', component: PcComponent },
  { path: 'category/mobile', component: MobileComponent },
  { path: 'category/laptop', component: LaptopComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'compras', component: MisComprasComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: ProductDetailsComponent },
  {
    path: 'admin/addProduct',
    component: AddProductComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/messages',
    component: ReadMessagesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/users',
    component: UserControlComponent,
    canActivate: [AdminGuard],
  },

  { path: 'contact', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
