/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Meeting } from '../models/Meeting';
import type { MeetingCreate } from '../models/MeetingCreate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MeetingsService {
    /**
     * List meetings
     * @param limit
     * @param offset
     * @returns Meeting A list of meetings
     * @throws ApiError
     */
    public static listMeetings(
        limit: number = 100,
        offset?: number,
    ): CancelablePromise<Array<Meeting>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/meetings',
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }
    /**
     * Create a meeting
     * @param requestBody
     * @returns Meeting The created meeting
     * @throws ApiError
     */
    public static createMeeting(
        requestBody: MeetingCreate,
    ): CancelablePromise<Meeting> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/meetings',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a specific meeting
     * @param meetingId
     * @returns Meeting The meeting details
     * @throws ApiError
     */
    public static getMeeting(
        meetingId: any,
    ): CancelablePromise<Meeting> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/meetings/{meeting_id}',
            path: {
                'meeting_id': meetingId,
            },
            errors: {
                404: `Meeting not found`,
            },
        });
    }
}
