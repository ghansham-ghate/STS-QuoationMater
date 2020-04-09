import { Injectable } from "@angular/core";


@Injectable()
export class AuthService{
   
    public isAuthenticated(): boolean {
    
    if(window.localStorage.getItem("isLogin")=="true")
    {
        return true;
    }
    else{
        return false;
    }
      }
  public logout(){
    window.localStorage.setItem("isLogin","false");
  }
}