/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionItem } from '../models/ActionItem';
import type { ActionItemCreate } from '../models/ActionItemCreate';
import type { ActionItemUpdate } from '../models/ActionItemUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ActionItemsService {
    /**
     * List action items for a meeting
     * @param meetingId
     * @returns ActionItem Action Items
     * @throws ApiError
     */
    public static listMeetingActionItems(
        meetingId: number,
    ): CancelablePromise<Array<ActionItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/meetings/{meeting_id}/action-items',
            path: {
                'meeting_id': meetingId,
            },
        });
    }
    /**
     * Add an action item to a meeting
     * @param meetingId
     * @param requestBody
     * @returns ActionItem Created action item
     * @throws ApiError
     */
    public static createActionItem(
        meetingId: number,
        requestBody: ActionItemCreate,
    ): CancelablePromise<ActionItem> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/meetings/{meeting_id}/action-items',
            path: {
                'meeting_id': meetingId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update action item status
     * @param actionItemId
     * @param requestBody
     * @returns ActionItem Updated action item
     * @throws ApiError
     */
    public static updateActionItem(
        actionItemId: number,
        requestBody: ActionItemUpdate,
    ): CancelablePromise<ActionItem> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/action-items/{action_item_id}',
            path: {
                'action_item_id': actionItemId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
