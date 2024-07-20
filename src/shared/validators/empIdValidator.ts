import { AbstractControl, ValidationErrors } from "@angular/forms";




export class empValidator{
    static isEmpValid(control : AbstractControl) : ValidationErrors | null{
        let val= control.value as string;

        if(val){
            let regex = /^[A-Z]\d{3}$/;
            let isvalid = regex.test(val);

            if(isvalid){
                return null;
            }
            else{
                return{
                    invalidEmpId : ` Employee id should start with 1 Alphabate and should end with 3 numbers !` 
                }
            }

        }
        else{
            return null;
        }
        
    }}