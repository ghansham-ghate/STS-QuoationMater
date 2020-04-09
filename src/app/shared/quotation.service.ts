import {Injectable} from '@angular/core';
import {Quotation} from '../Models/Quoatation.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ItemCategory} from '.././Models/ItemCategory.modal';
import { Observable } from 'rxjs';
import { QuotationDetail } from '../Models/QuotationDetail.model';
import {SERVER_DIRECTORY} from '../shared/config/config';

@Injectable()
export class QuotationClass{
   constructor( private http:HttpClient){}
    quotation:Quotation;
    quotationDetail:QuotationDetail;
  
    Url:string=SERVER_DIRECTORY+"/api/mstQuotation/GetAllQuotation";
    Urlbase:string=SERVER_DIRECTORY+'/api/tblQuotationDetails/GetQuotation_detailsReport';
    getQuotation():Observable<Quotation[]>{
       return this.http.get<Quotation[]>(this.Url)
    }
    getQuotationDetail():Observable<QuotationDetail[]>{
      console.log(this.Urlbase)
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
       return this.http.post<QuotationDetail[]>(this.Urlbase,httpOptions)
       
    }
   
   AddQuotation(outlet:Quotation):Observable<number>{
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<number>(SERVER_DIRECTORY+'/api/mstQuotation/InsertQuotationr',JSON.stringify(outlet),httpOptions)
   }

   DeleteQuotationData(quoatation:Quotation):Observable<boolean>{
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
     return this.http.post<boolean>(SERVER_DIRECTORY+'/api/mstQuotation/DeleteQuotation',JSON.stringify(quoatation),httpOptions);
    }
   UpdateQuotationData(updateData:Quotation):Observable<Quotation>{
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<Quotation>(SERVER_DIRECTORY+'/api/mstQuotation/UpdateQuotation',JSON.stringify(updateData),httpOptions);
   }
   getAlItemCategory():Observable<ItemCategory[]>{
      return this.http.get<ItemCategory[]>(SERVER_DIRECTORY+'/api/mstItemCategory/GetAllItem_Category');
   }

   getQuotationNumber(number):Observable<string>{
      return this.http.get<string>(SERVER_DIRECTORY+'/api/mstQuotation/GetQuotNo?itemCatgaery='+number);
   }
  
     public getTempQoutation()
     {
     return this.quotation;
    }
    public setTempQuotation(quotation,cust_id,region_id,quoatationNumber)
    {
    console.log(quotation);
      this.quotation=quotation;
      this.quotation.nvcharQuotation_no=quoatationNumber;
    
      this.quotation.intRegion_id=region_id; 
      this.quotation.intCust_id=cust_id;
      
     }
     public setQuotation(quotation)
     {
      this.quotation=quotation;
     }
    
}