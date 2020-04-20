import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './home/profile/profile.component';
import { CartComponent } from './home/cart/cart.component';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { AuthGuard } from './auth.guard';
import { MisComprasComponent } from './home/mis-compras/mis-compras.component';

const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:'full'},

  {path:"",loadChildren:"./auth/auth.module#AuthModule"},
  {path:"home",component:HomeComponent },
  {path:"profile",component:ProfileComponent,canActivate:[AuthGuard]},
  {path:"cart",component:CartComponent,canActivate:[AuthGuard]},
  {path:"compras",component:MisComprasComponent,canActivate:[AuthGuard]},
  {path:"details/:id",component:ProductDetailsComponent},
  {path:"contact",component:ContactUsComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
