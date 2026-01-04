import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MeetingsService } from '../../client/services/MeetingsService';
import { OpenAPI } from '../../client/core/OpenAPI';

// Mock the request module
vi.mock('../../client/core/request', () => ({
  request: vi.fn(),
}));

describe('MeetingsService', () => {
  beforeEach(() => {
    // Setup OpenAPI config
    OpenAPI.BASE = 'http://localhost:8000';
  });

  it('should have listMeetings method', () => {
    expect(typeof MeetingsService.listMeetings).toBe('function');
  });

  it('should have createMeeting method', () => {
    expect(typeof MeetingsService.createMeeting).toBe('function');
  });

  it('should have getMeeting method', () => {
    expect(typeof MeetingsService.getMeeting).toBe('function');
  });
});
