/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionItemStatus } from './ActionItemStatus';
export type ActionItem = {
    id: number;
    meeting_id: number;
    content: string;
    assignee?: string | null;
    due_date?: string | null;
    status: ActionItemStatus;
    created_at?: string;
};

