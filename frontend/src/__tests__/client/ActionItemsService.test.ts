import { describe, it, expect } from 'vitest';
import { ActionItemsService } from '../../client/services/ActionItemsService';

describe('ActionItemsService', () => {
  it('should have createActionItem method', () => {
    expect(typeof ActionItemsService.createActionItem).toBe('function');
  });

  it('should have listMeetingActionItems method', () => {
    expect(typeof ActionItemsService.listMeetingActionItems).toBe('function');
  });

  it('should have updateActionItem method', () => {
    expect(typeof ActionItemsService.updateActionItem).toBe('function');
  });
});
