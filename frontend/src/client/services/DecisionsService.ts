/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Decision } from '../models/Decision';
import type { DecisionCreate } from '../models/DecisionCreate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DecisionsService {
    /**
     * List decisions for a meeting
     * @param meetingId
     * @returns Decision Decisions
     * @throws ApiError
     */
    public static listMeetingDecisions(
        meetingId: number,
    ): CancelablePromise<Array<Decision>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/meetings/{meeting_id}/decisions',
            path: {
                'meeting_id': meetingId,
            },
        });
    }
    /**
     * Add a decision to a meeting
     * @param meetingId
     * @param requestBody
     * @returns Decision Created decision
     * @throws ApiError
     */
    public static createDecision(
        meetingId: number,
        requestBody: DecisionCreate,
    ): CancelablePromise<Decision> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/meetings/{meeting_id}/decisions',
            path: {
                'meeting_id': meetingId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
