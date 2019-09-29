import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskapiService } from '../../services/taskapi.service';
import { UserapiService } from '../../services/userapi.service';
import { ProjectapiService } from '../../services/projectapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  userList: any;
  projectList: any;
  projectSearch: any;
  order: string = '';
  reverse: boolean = false;
  startDateCtrl: any;
  endDateCtrl: any;

  toggleCtrState() {


    if (this.startDateCtrl.disabled) {
      this.startDateCtrl.enable();
      this.endDateCtrl.enable();
    } else {
      this.startDateCtrl.disable();
      this.endDateCtrl.disable();
    }
  }

  updateProjectForm = this.fb.group({
    project: ['', Validators.required],
    priority: ['', Validators.required],
    manager: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });

  get aliases() {
    return this.updateProjectForm.get('aliases') as FormArray;
  }

  id: any;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, public router: Router,  public service: TaskapiService, public userService: UserapiService, public projectService: ProjectapiService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];

    });
    this.getProject()
  }

  getProject() {
    this.projectService.GetProjectList().subscribe(data => {
      if (data) {
        var curId = this.id;
        this.projectList = data.filter(x => x._id == curId)[0];
      } else {
        //error log
      }
    },
      error => {
        //error log
      });
  }





  resetProjectForm() {
    this.updateProjectForm.reset();
  }

  get f() { return this.updateProjectForm.controls; }
  submitted = false;
  submitForm() {
    this.submitted = true;
    if (this.updateProjectForm.invalid) {
      return;
    }
    else {
      this.updateProject();
    }
  }
  public updateProject() {

    let obj = {
      "Project": this.updateProjectForm.value.project,
      "Priority": this.updateProjectForm.value.priority,
      "Manager": this.updateProjectForm.value.manager,
      "StartDate": this.updateProjectForm.value.startDate,
      "EndDate": this.updateProjectForm.value.endDate,
      "id": this.id
    }

    this.projectService.UpdateProject(obj).subscribe(data => {

      if (data) {
        this.router.navigate(["/createproject"]);
      } else {
        //error log
      }
    },
      error => {
        //error log
      });


  }


  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  getUserList() {

    this.userService.GetUserList().subscribe(data => {

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



  ngOnInit() {

    this.startDateCtrl = this.updateProjectForm.get('startDate');
    this.endDateCtrl = this.updateProjectForm.get('endDate');
    this.startDateCtrl.disable();
    this.endDateCtrl.disable();
   // this.service.login({ username: 'kotte@outlook.com', password: 'India$123' }).subscribe(user => {
      this.getUserList();
    //});

  }
}
