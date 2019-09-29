import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskapiService } from '../services/taskapi.service';
import { UserapiService } from '../services/userapi.service';
import { ProjectapiService } from '../services/projectapi.service';


@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  startDateCtrl: any;
  endDateCtrl: any;
  priorityCtrl: any;
  parentTaskCtrl: any;
  userCtrl: any;
  onlyParentTask: any;

  toggleCtrState() {
    if (this.startDateCtrl.disabled) {
      this.onlyParentTask = false;
      this.startDateCtrl.enable();
      this.endDateCtrl.enable();
      this.priorityCtrl.enable();
      this.parentTaskCtrl.enable();
      this.userCtrl.enable();
    } else {
      this.onlyParentTask = true;
      this.startDateCtrl.disable();
      this.endDateCtrl.disable();
      this.priorityCtrl.disable();
      this.parentTaskCtrl.disable();
      this.userCtrl.disable();
    }
  }

  updateTaskForm = this.fb.group({
    project: ['', Validators.required],
    updateTask: ['', Validators.required],
    priority: ['', Validators.required],
    parentTask: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    user: ['', Validators.required]
  });

  taskList: any;
  id: any;
  userList: any;
  get aliases() {
    return this.updateTaskForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, public router: Router,public service: TaskapiService, public userService: UserapiService, public projectService: ProjectapiService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];

    });
    this.getTask();
  }

  parentList: any;
  getTask() {
    this.service.GetTaskList().subscribe(data => {
      if (data) {
        var curId = this.id;
        this.parentList = data;
        this.taskList = data.filter(x => x._id == curId)[0];
        if (this.taskList.onlyParentTask) {
          this.taskList["Task"] = this.taskList.ParentTask;
          this.taskList["ParentTask"] = "";
          this.taskList["User"] = "";

          this.onlyParentTask = this.taskList.onlyParentTask;
          this.startDateCtrl.disable();
          this.endDateCtrl.disable();
          this.priorityCtrl.disable();
          this.parentTaskCtrl.disable();
          this.userCtrl.disable();
        }
        //taskList =
      } else {
        //error log
      }
    },
      error => {
        //error log
      });
  }


  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  getProjectList() {
    debugger;
    this.projectService.GetProjectList().subscribe(data => {
      debugger;
      if (data) {
        this.projectList = data;
      } else {
        //error log
      }
    },
      error => {
        //error log
      });
  }

  getUserList() {
    debugger;
    this.userService.GetUserList().subscribe(data => {
      debugger;
      if (data) {
        this.userList = data;
      } else {
        //error log
      }
    },
      error => {
        //error log
      });
  }


  projectList: any;
  updateTaskVal: any;
  ngOnInit() {
    this.startDateCtrl = this.updateTaskForm.get('startDate');
    this.endDateCtrl = this.updateTaskForm.get('endDate');
    this.priorityCtrl = this.updateTaskForm.get('priority');
    this.parentTaskCtrl = this.updateTaskForm.get('parentTask');
    this.userCtrl = this.updateTaskForm.get('user');
    this.getProjectList();
    this.getUserList();
  }
  resetForm() {
    this.updateTaskForm.reset();
  }
  get f() { return this.updateTaskForm.controls; }
  submitted = false;
  submitForm() {
    this.submitted = true;
    if (this.updateTaskForm.invalid) {
      return;
    }
    else {
      this.updateTask();
    }
  }
  public updateTask() {
    debugger;
    if (this.onlyParentTask == true) {
      this.updateTaskVal = {
        "Project": this.updateTaskForm.value.project,
        "ParentTask": this.updateTaskForm.value.updateTask,
        "onlyParentTask": this.onlyParentTask,
        "id": this.id
      }
    }
    else {
      this.updateTaskVal = {
        "Project": this.updateTaskForm.value.project,
        "Task": this.updateTaskForm.value.updateTask,
        "Priority": this.updateTaskForm.value.priority,
        "ParentTask": this.updateTaskForm.value.parentTask,
        "StartDate": this.updateTaskForm.value.startDate,
        "EndDate": this.updateTaskForm.value.endDate,
        "User": this.updateTaskForm.value.user,
        "onlyParentTask": this.onlyParentTask,
        "id": this.id
      }
    }


    this.service.UpdateTask(this.updateTaskVal).subscribe(data => {
      debugger;
      if (data) {
        this.router.navigate(["/showtask"]);
        //error log

      } else {
        //error log
      }
    },
      error => {
        //error log
      });



  }

}
