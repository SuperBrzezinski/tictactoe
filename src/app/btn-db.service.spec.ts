import { TestBed } from '@angular/core/testing';

import { BtnDbService } from './btn-db.service';

describe('BtnDbService', () => {
  let service: BtnDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtnDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
