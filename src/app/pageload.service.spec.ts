import { TestBed } from '@angular/core/testing';

import { PageloadService } from './pageload.service';

describe('PageloadService', () => {
  let service: PageloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
