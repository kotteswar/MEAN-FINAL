import { Component, OnInit } from '@angular/core';
import {Task} from '../task';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { VERSION } from '@angular/material';
import {MongoapiService} from '../services/mongoapi.service'
import {Router} from '@angular/router';

 
@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent implements OnInit {
  showTaskForm = this.fb.group({
    newTask: ['', Validators.required],
    priority: ['', Validators.required],
    parentTask: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    priorityFrom: ['', Validators.required],
    priorityTo: ['', Validators.required]
  });

  taskList: any;
  originalTaskList: any;
  filterModel = new Task(1, 'senthil', 2, "", "", "");
  get aliases() {
    return this.showTaskForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder, public service: MongoapiService, public router: Router, ) {}


  createNewTask() {
    this.showTaskForm.patchValue({
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
    console.warn(this.showTaskForm.value);
  }
  editTask(index: any) {
    debugger
    var id = this.taskList[index]["_id"];
    this.router.navigate(['/updatetask'], {
      queryParams: {
        id: id
      }
    });
  }

  goToCreatePage() {
    this.router.navigate(['/createtask']);
  }

  endTask(index: any) {
    debugger;
    var id = this.taskList[index]["_id"];
    var obj = {
      id: id
    };
    this.service.DeleteTask(obj).subscribe(data => {
      if (data) {
        console.log(data);
        location.reload();
        this.getTaskList();
      } else {
        console.log("Delete error");
      }
    }, error => {
      console.log(" Get Task List Error");
      //this.redirect();
    });
  }

  ngOnInit() {
    this.service.login({
      username: 'kotte@outlook.com',
      password: 'India$123'
    }).subscribe(user => {
      debugger;
      if (user) {
        this.getTaskList();
      }
    })

  }
  getTaskList() {
    debugger;
    this.service.GetTaskList().subscribe(data => {
        debugger;
        if (data) {
          // this.nav.setRoot('HomePage');
          //this.presentAlert("You logic is success.","Alert");
          console.log(data);
          this.taskList = data;
          this.originalTaskList = data;
        } else {
          console.log(" Get Task List Error");
        }
      },
      error => {
        console.log(" Get Task List Error");
        //this.redirect();
      });
  }
  applyFilter(data, propName) {
    debugger;
    //this.filterModel.
    if (data && propName)
      this.taskList = this.originalTaskList.filter(x => x[propName] == data);
  }
  resetFilter() {
    this.taskList = this.originalTaskList;
  }

}
