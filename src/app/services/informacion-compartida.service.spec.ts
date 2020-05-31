import { TestBed } from '@angular/core/testing';

import { InformacionCompartidaService } from './informacion-compartida.service';

describe('InformacionCompartidaService', () => {
  let service: InformacionCompartidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionCompartidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
