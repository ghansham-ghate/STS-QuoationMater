import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './componets/customer/customer.component';
import { ItemCategoryComponent } from './componets/item-category/item-category.component';
import { LoginComponent } from './componets/login/login.component';
import { RegionComponent } from './componets/region/region.component';
import { RegistrationComponent } from './componets/registration/registration.component';
import { QuotationsComponent } from './componets/quotations/quotations.component';
import { PoComponent } from './componets/po/po.component';
import { ProductComponent } from './componets/product/product.component';
import { PagenotfoundcomponentComponent } from './componets/pagenotfoundcomponent/pagenotfoundcomponent.component';
import { AuthGuard } from './shared/authGuard.service';
import { ReportComponent } from './componets/report/report.component';



 const routes: Routes = [
  {path:"cust",component:CustomerComponent,canActivate:[AuthGuard]},
  {path:"item",component:ItemCategoryComponent,canActivate:[AuthGuard]},
  {path:"registration",component:RegistrationComponent},
  {path:"login",component:LoginComponent},
  {path:"region",component:RegionComponent,canActivate:[AuthGuard]},
  {path:"quotation",component:QuotationsComponent,canActivate: [AuthGuard]},
  {path:"report",component:ReportComponent,canActivate:[AuthGuard]},
  {path:"po",component:PoComponent,canActivate:[AuthGuard]},
  {path:"product",component:ProductComponent,canActivate:[AuthGuard]},
  {path:"product/:id",component:ProductComponent,canActivate:[AuthGuard]},
  {path:"",redirectTo:'/login',pathMatch:'full'},
  { path: '**', component:PagenotfoundcomponentComponent }
  
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
