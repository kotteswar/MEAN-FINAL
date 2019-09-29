import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { UserapiService } from './userapi.service';


describe('UserapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserapiService]
    });
  });

  it(
    'Get User List',
    inject(
      [HttpTestingController, UserapiService],
      (
        httpMock: HttpTestingController,
        userapiService: UserapiService
      ) => {
        // ...our test logic here

    const mockUsers = [
  {
        "FirstName" : "Prabhakar",
        "LastName" : "Sekar",
        "EmployeeId" : "316372"
}];

userapiService.GetUserList().subscribe((event: HttpEvent<any>) => {
  switch (event.type) {
    case HttpEventType.Response:
      expect(event.body).toEqual(mockUsers);
  }
});

      }
    )
  );

   it(
    'Update User',
    inject(
      [HttpTestingController, UserapiService],
      (
        httpMock: HttpTestingController,
        userapiService: UserapiService
      ) => {
        // ...our test logic here

const mockUsers = [
  {
        "FirstName" : "Prabhakar",
        "LastName" : "Sekar",
        "EmployeeId" : "316372"
}
];

let myData = {
  '_id': "5d7f9fc3bc600e3a38a1d486",
}
userapiService.UpdateUser(myData).subscribe((event: HttpEvent<any>) => {
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
      [HttpTestingController, UserapiService],
      (
        httpMock: HttpTestingController,
        userapiService: UserapiService
      ) => {
        // ...our test logic here

    const mockUsers = [
  {
        "FirstName" : "Prabhakar",
        "LastName" : "Sekar",
        "EmployeeId" : "316372"
}];

let myData = {
  '_id': "5d7f9fc3bc600e3a38a1d486",
}
userapiService.DeleteUser(myData).subscribe((event: HttpEvent<any>) => {
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
      [HttpTestingController, UserapiService],
      (
        httpMock: HttpTestingController,
        userapiService: UserapiService
      ) => {
        // ...our test logic here

        const mockUsers = [
  {
        "FirstName" : "Prabhakar",
        "LastName" : "Sekar",
        "EmployeeId" : "316372"
}];


userapiService.createAppUser(mockUsers).subscribe((event: HttpEvent<any>) => {
  switch (event.type) {
    case HttpEventType.Response:
      expect(event.body).toEqual(mockUsers);
  }
});

      }
    )
  );




});