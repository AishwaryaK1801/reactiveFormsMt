import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";




export class AsyncEmailValidator{
    static isEmailAvailable(control : AbstractControl) : Promise<ValidationErrors | null> | Observable<ValidationErrors | null>{
        let val = control.value as string;

      return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(val=== 'jhon@gmail.com'){
                resolve({
                    emailExist : ` This email is already in use !`
                })
            }
            else{
                resolve(null)
            }
        }, 1000)
      })
    }
}