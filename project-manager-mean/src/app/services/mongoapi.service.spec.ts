import { TestBed } from '@angular/core/testing';

import { MongoapiService } from './mongoapi.service';

describe('MongoapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MongoapiService = TestBed.get(MongoapiService);
    expect(service).toBeTruthy();
  });
});
