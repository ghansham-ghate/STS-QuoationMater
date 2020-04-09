import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../Models/User.model';
import {SERVER_DIRECTORY} from '../shared/config/config';
@Injectable()
export class RegistrationClass{
header:any;
user:User[];
Url:string=SERVER_DIRECTORY+"/api/mstlUser/GetAllUser";
constructor(private http:HttpClient){

}
getAllUser():Observable<User[]>{
    return this.http.get<User[]>(this.Url);
} 

UserRegister(outlet:User):Observable<User[]>{
    console.log(JSON.stringify(outlet));
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   return this.http.post<User[]>(SERVER_DIRECTORY+'/api/mstlUser/InsertUser',JSON.stringify(outlet),httpOptions);  
   
}
// Login(user : User){  
//     debugger;  
     
//    return this.http.post<user>('/User/',model,{ headers: this.header});  
//   } 
}