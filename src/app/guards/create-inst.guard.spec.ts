import { TestBed, async, inject } from '@angular/core/testing';

import { CreateInstGuard } from './create-inst.guard';

describe('CreateInstGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateInstGuard]
    });
  });

  it('should ...', inject([CreateInstGuard], (guard: CreateInstGuard) => {
    expect(guard).toBeTruthy();
  }));
});
