import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer} from '../Models/Customer.model';
import {SERVER_DIRECTORY} from '../shared/config/config';
@Injectable()
export class CustomerClass{
  
     customer:Customer[];
    
    Url:string=SERVER_DIRECTORY+"/api/mstCustomer/GetAllCustomer_master";
    constructor(private http:HttpClient){}
  
    public getCustomer()
    {
      
    }
    getAllCustomer():Observable<Customer[]>{
        return this.http.get<Customer[]>(this.Url);
    } 

    AddCustomerData(outlet:Customer):Observable<Customer[]>{
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Customer[]>(SERVER_DIRECTORY+'/api/mstCustomer/InsertCustomer_master',JSON.stringify(outlet),httpOptions)
    }

    DeleteCustomerData(objmstCustomer:Customer):Observable<boolean>{
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
     return this.http.post<boolean>(SERVER_DIRECTORY+'/api/mstCustomer/DeleteCustomer_master',JSON.stringify(objmstCustomer),httpOptions);
    }

    UpdateCustomerData(updatedata:Customer):Observable<Customer[]>{
        console.log(JSON.stringify(updatedata))
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Customer[]>(SERVER_DIRECTORY+'/api/mstCustomer/UpdateCustomer_master',JSON.stringify(updatedata),httpOptions);
    }
    // public saveCustomer(customer)
    // {
    //   this.customer.push(customer);
    // }
    // public deletecustomer(name)
    // {
    //     for(let i = 0; i < this.customer.length; ++i){
    //         if (this.customer[i].name === name) {
    //             this.customer.splice(i,1);
    //         }
    //     }
    //    console.log(this.customer.length);
    // }




}