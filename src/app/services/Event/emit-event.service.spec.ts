import { TestBed } from '@angular/core/testing';

import { EmitEventService } from './emit-event.service';

describe('EmitEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmitEventService = TestBed.get(EmitEventService);
    expect(service).toBeTruthy();
  });
});
