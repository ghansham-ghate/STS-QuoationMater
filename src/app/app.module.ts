import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './componets/customer/customer.component';
import { ItemCategoryComponent } from './componets/item-category/item-category.component';


import { RegionComponent } from './componets/region/region.component';
import { LoginComponent } from './componets/login/login.component';
import { RegistrationComponent } from './componets/registration/registration.component';
import { QuotationsComponent } from './componets/quotations/quotations.component';
import { PoComponent } from './componets/po/po.component';


import {RegionClass} from './shared/region.service';
import { POFeedClass } from './shared/pofeed.service';
import { ProductComponent } from './componets/product/product.component';
import { ProductClass } from './shared/product.service';
import { CustomerClass } from './shared/customer.service';
import { QuotationClass } from './shared/quotation.service';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { from } from 'rxjs';
import { PagenotfoundcomponentComponent } from './componets/pagenotfoundcomponent/pagenotfoundcomponent.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './shared/authGuard.service';
import { AuthService } from './shared/AuthService.service';
import { RegistrationClass } from './shared/Registration.service';
import {Login} from './shared/productHelper/login.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReportComponent } from './componets/report/report.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    ItemCategoryComponent,
    RegionComponent,
    LoginComponent,
    RegistrationComponent,
    QuotationsComponent,
    PoComponent,
    ProductComponent,
    PagenotfoundcomponentComponent,
    ReportComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,   
    RouterModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
   
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [HttpClientModule,RegionClass,POFeedClass,ProductClass,CustomerClass,QuotationClass,AuthGuard,AuthService,RegistrationClass,Login],
  bootstrap: [AppComponent]
})
export class AppModule { }
