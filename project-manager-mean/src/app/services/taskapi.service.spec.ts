import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TaskapiService } from './taskapi.service';


describe('TaskapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskapiService]
    });
  });

  it(
    'Get Task List',
    inject(
      [HttpTestingController, TaskapiService],
      (
        httpMock: HttpTestingController,
        taskapiService: TaskapiService
      ) => {
        // ...our test logic here

    const mockUsers = [
  {
        "Project" : "Way connect",
        "Task" : "Testing Testing",
        "Priority" : 74,
        "ParentTask" : "Fleet Actitvity",
        "StartDate" : "2019-08-31T18:30:00Z",
        "EndDate" : "2019-09-20T18:30:00Z",
        "User" : "Gavrav Yadhav",
}
];

taskapiService.GetTaskList().subscribe((event: HttpEvent<any>) => {
  switch (event.type) {
    case HttpEventType.Response:
      expect(event.body).toEqual(mockUsers);
  }
});

      }
    )
  );

   it(
    'Update Task',
    inject(
      [HttpTestingController, TaskapiService],
      (
        httpMock: HttpTestingController,
        taskapiService: TaskapiService
      ) => {
        // ...our test logic here

const mockUsers = [
  {
        "Project" : "Way connect",
        "Task" : "Testing Testing",
        "Priority" : 74,
        "ParentTask" : "Fleet Actitvity",
        "StartDate" : "2019-08-31T18:30:00Z",
        "EndDate" : "2019-09-20T18:30:00Z",
        "User" : "Gavrav Yadhav",
}
];

let myData = {
  '_id': "5d84a7a9bac2db32cc71626c",
}
taskapiService.UpdateTask(myData).subscribe((event: HttpEvent<any>) => {
  switch (event.type) {
    case HttpEventType.Response:
      expect(event.body).toEqual(mockUsers);
  }
});

      }
    )
  );



  it(
    'Delete project',
    inject(
      [HttpTestingController, TaskapiService],
      (
        httpMock: HttpTestingController,
        taskapiService: TaskapiService
      ) => {
        // ...our test logic here

        const mockUsers = [
  { project: 'Bob', manager: 'www.yessss.com' },
  { project: 'Juliette', manager: 'nope.com' }
];

let myData = {
  '_id': "5d84a7a9bac2db32cc71626c",
}
taskapiService.DeleteTask(myData).subscribe((event: HttpEvent<any>) => {
  switch (event.type) {
    case HttpEventType.Response:
      expect(event.body).toEqual(mockUsers);
  }
});

      }
    )
  );


    it(
    'Create Task',
    inject(
      [HttpTestingController, TaskapiService],
      (
        httpMock: HttpTestingController,
        taskapiService: TaskapiService
      ) => {
        // ...our test logic here

        const mockUsers = [
  { project: 'Bob', manager: 'www.yessss.com' }
];


taskapiService.saveForm(mockUsers).subscribe((event: HttpEvent<any>) => {
  switch (event.type) {
    case HttpEventType.Response:
      expect(event.body).toEqual(mockUsers);
  }
});

      }
    )
  );




});