import { describe, it, expect } from 'vitest';
import { DecisionsService } from '../../client/services/DecisionsService';

describe('DecisionsService', () => {
  it('should have createDecision method', () => {
    expect(typeof DecisionsService.createDecision).toBe('function');
  });

  it('should have listMeetingDecisions method', () => {
    expect(typeof DecisionsService.listMeetingDecisions).toBe('function');
  });
});
