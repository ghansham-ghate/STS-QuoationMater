import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'; 
import {Region} from '../Models/Region.model';
import {  Observable } from 'rxjs';
import { Quotation } from '../Models/Quoatation.model';
import {SERVER_DIRECTORY} from '../shared/config/config';

@Injectable()
export class RegionClass{
   region:Region[];
   quotation:Quotation;
    baseUrl:  string =SERVER_DIRECTORY+'/api/mstRegion/GetAllRegion';
     baseUrl1 : string=SERVER_DIRECTORY+'/api/mstRegion/InsertRegion';
    constructor(private http:HttpClient){ }
    

     getAllRegion():Observable<Region[]>{
         return this.http.get<Region[]>(this.baseUrl);
     }

    AddRecord(outlet :Region):Observable<Region[]>{
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<Region[]>(this.baseUrl1,JSON.stringify(outlet),httpOptions)
    }

    DeleteRegionData(outlet:Region):Observable<boolean>    
    {    
      console.log(outlet)
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<boolean>(SERVER_DIRECTORY+'/api/mstRegion/DeleteRegion',JSON.stringify(outlet),httpOptions);    
    } 

    UpdateRegionData(Region:Region):Observable<Region>
    {
      console.log(JSON.stringify(Region))
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<Region>(SERVER_DIRECTORY+'/api/mstRegion/UpdateRegion',JSON.stringify(Region),httpOptions);
    }

    reportFromDateToDate(requestBody):Observable<Quotation[]>{
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<Quotation[]>(SERVER_DIRECTORY+'/api/mstQuotation/GetWithRelationsByDateTime',JSON.stringify(requestBody),httpOptions);
    }

    // public  getRegion()
    // {
    //    let region=[{name:'Asia',code:101,domestic:'Tourism'},{name:'Europe',code:102,domestic:'Tourism'}];
    //    return region;
    // }

}