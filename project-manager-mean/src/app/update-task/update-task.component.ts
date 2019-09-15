import { Component, OnInit } from '@angular/core';
import {Task} from '../task';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {MongoapiService} from '../services/mongoapi.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

updateTaskForm = this.fb.group({
    newTask: ['', Validators.required],
    priority: ['',Validators.required],
    parentTask: ['',Validators.required],
    startDate: ['',Validators.required],
    endDate: ['',Validators.required]
  });

taskList:any;
id:any;
  get aliases() {
    return this.updateTaskForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder, public  service: MongoapiService,private activatedRoute : ActivatedRoute , public router : Router) {


    console.log('Called Constructor');
    this.activatedRoute.queryParams.subscribe(params => {
        this.id = params['id'];

    });
 this.getTask();
   }


getTask(){
  this.service.GetTaskList().subscribe(data=> {
          if (data) { 
            debugger
          // this.nav.setRoot('HomePage');
          //this.presentAlert("You logic is success.","Alert");
          console.log(data)
          var curId = this.id;
          this.taskList =  data.filter(x=> x._id == curId)[0];
          console.log(this.taskList);
          } else {
            console.log(" Get Task List Error");
          }
          },
          error => {
            console.log(" Get Task List Error");
          //this.redirect();
          });
}

  createNewTask() {
    this.updateTaskForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.updateTaskForm.value);
  }
       

  ngOnInit() {
    
  }
  public updateTask() {
    debugger; 
   let    obj={
     "Task" : this.updateTaskForm.value.newTask,
      "Priority" : this.updateTaskForm.value.priority,
      "ParentTask": this.updateTaskForm.value.parentTask,
      "StartDate": this.updateTaskForm.value.startDate,
      "EndDate": this.updateTaskForm.value.endDate,
      "id": this.id
  } 
  this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
    debugger;
    if(user){
                  this.service.UpdateTask(obj).subscribe(data=> {
              debugger;
            if (data) { 
            this.router.navigate(["/showtask"]);
            // this.nav.setRoot('HomePage');
            //this.presentAlert("You logic is success.","Alert");
            console.log(data);
  
            } else {
              console.log("save error");
            }
            },
            error => {
              console.log("save error");
            //this.redirect();
            });
    }
  })
  
  } 

}
