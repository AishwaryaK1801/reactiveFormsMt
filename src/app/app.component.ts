import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES_META_DATA } from 'src/shared/const/countriesData';
import { CustomRegex } from 'src/shared/const/validationPatterns';
import { Icountry } from 'src/shared/models/countriesModel';
import { AsyncEmailValidator } from 'src/shared/validators/asyncEmailValidator';
import { empValidator } from 'src/shared/validators/empIdValidator';
import { NoSpaceValidator } from 'src/shared/validators/noSpaceValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'reactiveFormsMt';
  genderArr : Array<string> = [
    'female', 'male', 'others' 
  ];

  countryArr : Array<Icountry> =COUNTRIES_META_DATA;

  showPass: boolean = false;
  showConfPass : boolean = false;
  signUpForm!: FormGroup;

  ngOnInit(): void {
    this.createSignUpForm();
    this.currAddPerAddSameChkBoxEnableDisable()
    this.patchPerAdd()
    this.confirmPassHandler();
    this.validateConfirmPass();
  }


  currAddPerAddSameChkBoxEnableDisable(){
    this.signUpForm.get('currentAddress')?.valueChanges.subscribe((res)=>{
      if(this.signUpForm.get('currentAddress')?.valid){
        this.f['isAddSame'].enable();
      }
      else{
        this.f['isAddSame'].disable();
        // //////////
        this.f['permanentAddress'].patchValue(false)
      }
    })
  }

  confirmPassHandler(){
    this.signUpForm.get('password')?.valueChanges.subscribe(res=>{
      if(this.signUpForm.get('password')?.valid){
        this.signUpForm.get('confirmPass')?.enable()
      }
      else{
        this.signUpForm.get('confirmPass')?.disable()
      }
    })
  }

  validateConfirmPass(){
    this.signUpForm.get('confirmPass')?.valueChanges.subscribe(res=>{
      if(this.f['password'].value !== res){
        this.signUpForm.get('confirmPass')?.setErrors({
          invalid : true
        })
      }
      else{
        this.signUpForm.get('confirmPass')?.setErrors(null)
      }
    })
  }

  patchPerAdd(){
    this.f['isAddSame'].valueChanges.subscribe((res)=>{
      if(res){
        this.f['permanentAddress'].patchValue(this.f['currentAddress'].value);
        this.f['permanentAddress'].disable()
      }
      else{
        this.f['permanentAddress'].reset();
        this.f['permanentAddress'].enable();
      }
    })
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(5),
        NoSpaceValidator.noSpace,
        Validators.pattern(CustomRegex.username),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email,
        Validators.pattern(CustomRegex.email)
      ], AsyncEmailValidator.isEmailAvailable),
      empId : new FormControl(null, [Validators.required, empValidator.isEmpValid]),
      gender : new FormControl('female', [Validators.required]),
      skills : new FormArray([new FormControl(null, Validators.required)]),
      currentAddress : new FormGroup({
        country : new FormControl('India', [Validators.required]),
        state : new FormControl(null, [Validators.required]),
        city : new FormControl(null, [Validators.required]),
        zipcode : new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
      }),
      permanentAddress : new FormGroup({
        country : new FormControl('India', [Validators.required]),
        state : new FormControl(null, [Validators.required]),
        city : new FormControl(null, [Validators.required]),
        zipcode : new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
      }),
      isAddSame : new FormControl({value:null, disabled: true}),
      password : new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
      confirmPass : new FormControl({value: null, disabled: true}, Validators.required)
    });
  }

  get f() {
    return this.signUpForm.controls;
  }

  get skillsFormArr(){
    return this.signUpForm.get('skills') as FormArray
  }

  onRemove(i:number){
    this.skillsFormArr.removeAt(i)
  }

  onSkillAdd(){
    if(this.skillsFormArr.length<5){
      let skillControl = new FormControl(null, Validators.required);
      this.skillsFormArr.push(skillControl);
    }
  }

  get currAddInnerFormGroup(){
    let formGrp= this.signUpForm.get('currentAddress') as FormGroup;
    return formGrp.controls;
  }

  get perAddInnerFormGroup(){
    let formGrp= this.signUpForm.get('permanentAddress') as FormGroup;
    return formGrp.controls;
  }


  onSignUp(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.getRawValue());
      
    }
  }
  
}
