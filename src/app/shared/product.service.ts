import {Injectable} from '@angular/core';
import {Item} from '../Models/Item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuotationDetail } from '../Models/QuotationDetail.model';
import {SERVER_DIRECTORY} from '../shared/config/config';
@Injectable()
export class ProductClass{

    item:Item[];
    quotationDetail:QuotationDetail[];
    Url:string=SERVER_DIRECTORY+"/api/mstItem/GetAllItem";
    QuotaionUrl="/Quotation_details/GetQuotation_details";
constructor(private http:HttpClient){}

GetAllItem():Observable<Item[]>{
    return this.http.get<Item[]>(this.Url);
}

InsertItemDetail(outlet:Item):Observable<Item[]>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Item[]>(SERVER_DIRECTORY+'/api/mstItem/InsertItem',JSON.stringify(outlet),httpOptions);
}


GetAllQuotationDetail():Observable<QuotationDetail[]>{
    return this.http.get<QuotationDetail[]>(this.QuotaionUrl)
}
InsertQuotation_details(deatail:QuotationDetail[]):Observable<QuotationDetail[]>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<QuotationDetail[]>(SERVER_DIRECTORY+'/api/tblQuotationDetails/InsertQuotation_details_list',JSON.stringify(deatail),httpOptions);
}
updateQuotation_detais(deatail:QuotationDetail[]):Observable<boolean>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<boolean>(SERVER_DIRECTORY+'/api/tblQuotationDetails/UpdateQuotation_details_list',JSON.stringify(deatail),httpOptions);
}
deleteQuotation_details(deatail:QuotationDetail):Observable<boolean>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<boolean>(SERVER_DIRECTORY+'/api/tblQuotationDetails/DeleteQuotation_details',JSON.stringify(deatail),httpOptions);
}
DeleteItemMasterData(Item:Item):Observable<boolean>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<boolean>(SERVER_DIRECTORY+'/api/mstItem/DeleteItem',JSON.stringify(Item),httpOptions)
}
UpdateItemMasterData(updateItem:Item):Observable<Item[]>{
    console.log(JSON.stringify(updateItem))
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Item[]>(SERVER_DIRECTORY+'/api/mstItem/UpdateItem',JSON.stringify(updateItem),httpOptions);
}
    product=[{
        itemCode: "34",
        itemName: "plugs",
        itemDescription: "9763911250",
        itemDetail: "fghf",
        itemcategory: "One",
        productPricing:{
            details: [["Name","rere"],["80","50"]]}
         },
      {
        itemCode: "35",
        itemName: "bearing",
        itemDescription: "9763911250",
        itemDetail: "fghf",
        itemcategory: "One",
        productPricing:{
            details: [["Name","reg"],["60","70"]]
        }
    }]
    public  saveProduct(object)
    {
       this.item.push(object);
       return true;
    }
    
    public getProduct(){
    return this.item;
    }
}
