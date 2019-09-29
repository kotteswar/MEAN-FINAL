import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProjectapiService } from './projectapi.service';


describe('ProjectapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectapiService]
    });
  });

  it(
    'Get project List',
    inject(
      [HttpTestingController, ProjectapiService],
      (
        httpMock: HttpTestingController,
        projectapiService: ProjectapiService
      ) => {
        // ...our test logic here

        const mockUsers = [
  { project: 'Bob', manager: 'www.yessss.com' },
  { project: 'Juliette', manager: 'nope.com' }
];

projectapiService.GetProjectList().subscribe((event: HttpEvent<any>) => {
  switch (event.type) {
    case HttpEventType.Response:
      expect(event.body).toEqual(mockUsers);
  }
});

      }
    )
  );

   it(
    'Update Projects',
    inject(
      [HttpTestingController, ProjectapiService],
      (
        httpMock: HttpTestingController,
        projectapiService: ProjectapiService
      ) => {
        // ...our test logic here

        const mockUsers = [
  { project: 'Bob', manager: 'www.yessss.com' },
  { project: 'Juliette', manager: 'nope.com' }
];

let myData = {
  '_id': "5d8cfd3212170e1b84395e78",
}
projectapiService.UpdateProject(myData).subscribe((event: HttpEvent<any>) => {
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
      [HttpTestingController, ProjectapiService],
      (
        httpMock: HttpTestingController,
        projectapiService: ProjectapiService
      ) => {
        // ...our test logic here

        const mockUsers = [
  { project: 'Bob', manager: 'www.yessss.com' },
  { project: 'Juliette', manager: 'nope.com' }
];

let myData = {
  '_id': "5d8cfd3212170e1b84395e78",
}
projectapiService.UpdateProject(myData).subscribe((event: HttpEvent<any>) => {
  switch (event.type) {
    case HttpEventType.Response:
      expect(event.body).toEqual(mockUsers);
  }
});

      }
    )
  );


    it(
    'Create project',
    inject(
      [HttpTestingController, ProjectapiService],
      (
        httpMock: HttpTestingController,
        projectapiService: ProjectapiService
      ) => {
        // ...our test logic here

        const mockUsers = [
  { project: 'Bob', manager: 'www.yessss.com' }
];


projectapiService.createProject(mockUsers).subscribe((event: HttpEvent<any>) => {
  switch (event.type) {
    case HttpEventType.Response:
      expect(event.body).toEqual(mockUsers);
  }
});

      }
    )
  );




});