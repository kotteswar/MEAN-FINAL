import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { VERSION } from '@angular/material';
import { Router } from '@angular/router';
import { TaskapiService } from '../services/taskapi.service';
import { UserapiService } from '../services/userapi.service';
import { ProjectapiService } from '../services/projectapi.service';


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
    priorityTo: ['', Validators.required],
    taskSearch: ['', Validators.required]
  });

  taskList: any;
  originalTaskList: any;
  taskSearch: any;
  order: string = '';
  reverse: boolean = false;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  get aliases() {
    return this.showTaskForm.get('aliases') as FormArray;
  }

constructor(public router: Router, private fb: FormBuilder, public service: TaskapiService, public userService: UserapiService, public projectService: ProjectapiService) { }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }


  editTask(index: any) {

    var id = index;
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

    var id = index;
    var obj = {
      id: id
    };
    this.service.DeleteTask(obj).subscribe(data => {
      if (data) {
        this.getTaskList();
      } else {
        //error log
      }
    }, error => {
      //error log
    });
  }

  ngOnInit() {
    //this.service.login({ username: 'kotte@outlook.com', password: 'India$123' }).subscribe(user => {
      //if (user) {
        this.getTaskList();
      //}
    //})

  }
  getTaskList() {

    this.service.GetTaskList().subscribe(data => {

      if (data) {
        this.taskList = data;
        this.originalTaskList = data;
      } else {
        //error log
      }
    },
      error => {
        //error log
      });
  }
  applyFilter(data, propName) {
    if (data && propName)
      this.taskList = this.originalTaskList.filter(x => x[propName] == data);
  }
  resetFilter() {
    this.taskList = this.originalTaskList;
  }

}
