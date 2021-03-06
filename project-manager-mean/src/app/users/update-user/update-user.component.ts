import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import  {  FormBuilder  }  from  '@angular/forms';
import  {  Validators  }  from  '@angular/forms';
import  {  FormArray  }  from  '@angular/forms';
import { UserapiService } from '../../services/userapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  updateUserForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    employeeId: ['', Validators.required]
  });
  get aliases() {
    return this.updateUserForm.get('aliases') as FormArray;
  }
  id: any;
  userList: any;
  constructor(private fb: FormBuilder, public userService: UserapiService, private activatedRoute: ActivatedRoute, public router: Router) {
    this.activatedRoute.queryParams.subscribe(params  =>  {
      this.id  =  params['id'];

    });
  }

  getTask() {
    this.userService.GetUserList().subscribe(data =>  {
      if  (data) {
        var curId = this.id;
        this.userList = data.filter(x => x.id == curId)[0];
      }  else  {
        //error log
      }
    },
      error  =>  {
        //error log
      });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  ngOnInit() {
      this.getTask();
  }
  resetForm() {
    this.updateUserForm.reset();
  }
  get f() { return this.updateUserForm.controls; }
  submitted = false;
  submitForm() {
    this.submitted = true;
    if (this.updateUserForm.invalid) {
      return;
    }
    else {
      this.updateUser();
    }
  }
  public  updateUser() {
    ;
    let obj = {
      "FirstName": this.updateUserForm.value.firstName,
      "LastName": this.updateUserForm.value.lastName,
      "EmployeeId": this.updateUserForm.value.employeeId,
      "id": this.id
    }


        this.userService.UpdateUser(obj).subscribe(data =>  {
          ;
          if  (data) {
            this.router.navigate(["/adduser"]);
          }  else  {
            //error log
          }
        },
          error  =>  {
            //error log
          });



  }

}
