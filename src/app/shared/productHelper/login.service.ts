import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../../Models/User.model';
import {SERVER_DIRECTORY} from '../../shared/config/config';
@Injectable()
export class Login{
user:User[];
url:string=SERVER_DIRECTORY+"/api/mstlUser/SelectUserInfo"
   constructor(private http:HttpClient){}
   LoginAuth(us,pass):Observable<User[]>{
      let user={
         nvcharUserName:us,
         nvcharPassword:pass
      }
      console.log(user)
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json',responseType: 'text' }) };
      return this.http.post<User[]>(SERVER_DIRECTORY+'/api/mstlUser/SelectUserInfo',JSON.stringify(user),httpOptions)
   }
   ResetPassword(us):Observable<User[]>{
      let user={
         nvcharUserName:us,
      }
      console.log(user)
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json',responseType: 'text' }) };
      return this.http.post<User[]>(SERVER_DIRECTORY+'/api/mstlUser/SelectUserInfo',JSON.stringify(user),httpOptions)
   }

   updatePassword(user:User):Observable<User>{
      
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json',responseType: 'text' }) };
      return this.http.post<User>(SERVER_DIRECTORY+'/api/mstlUser/UpdateUser',JSON.stringify(user),httpOptions)
   }
}
