import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {QuotationDetail} from '../Models/QuotationDetail.model';
import { Quotation } from '../Models/Quoatation.model';
import {SERVER_DIRECTORY} from '../shared/config/config';
@Injectable()
export class POFeedClass{

    quotationDetail:QuotationDetail[];
    quotation:Quotation[];
    QuotaionUrl="/Quotation_details/GetQuotation_details";
    constructor(private http:HttpClient){}


    GetAllQuotationDetail(quotationalDetailsPO:QuotationDetail):Observable<QuotationDetail[]>{
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<QuotationDetail[]>(SERVER_DIRECTORY+"/api/tblQuotationDetails/SelectQuotation_details",JSON.stringify(quotationalDetailsPO),httpOptions)
    }
  

    submitPoData(quotationalDetailsPO:QuotationDetail[]):Observable<QuotationDetail[]>{
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<QuotationDetail[]>(SERVER_DIRECTORY+"/api/tblQuotationDetails/UpdateQuotation_details_list",JSON.stringify(quotationalDetailsPO),httpOptions)
    }
    GetAllQuotation(quotationPO:Quotation):Observable<Quotation[]>{
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Quotation[]>(SERVER_DIRECTORY+"/api/mstQuotation/SelectUserInfo",JSON.stringify(quotationPO),httpOptions)
    }
    updatePODataInQuotation(quotationPO:Quotation):Observable<Quotation>{
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Quotation>(SERVER_DIRECTORY+"/api/mstQuotation/UpdateQuotation",JSON.stringify(quotationPO),httpOptions)
    }
    public  getPOFeed()
    {
       let POData=[ {name:"North",quotationNo:"SC/PN/964",quotationDate:"2019-12-12",poDate:"2019-05-25",poNumber:"CS 18-19-03087",partyName:"CONTINETAL ENGINES LTD",amount:25212.00},
       {name:"Pune",quotationNo:"SC/PN/981",quotationDate:"2019-09-22",poDate:"2019-09-18",poNumber:"CS 18000207",partyName:"SARA SAE PVT. LTD.",amount:96422.00}
      ];
       return POData;
    }
}