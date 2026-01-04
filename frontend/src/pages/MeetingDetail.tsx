import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MeetingsService, DecisionsService, ActionItemsService, ActionItemStatus } from '../client';

export default function MeetingDetail() {
    const { id } = useParams<{ id: string }>();
    const meetingId = parseInt(id || '0');
    const queryClient = useQueryClient();

    // Queries
    const { data: meeting } = useQuery({
        queryKey: ['meeting', meetingId],
        queryFn: () => MeetingsService.getMeeting(meetingId)
    });

    const { data: decisions } = useQuery({
        queryKey: ['decisions', meetingId],
        queryFn: () => DecisionsService.listMeetingDecisions(meetingId)
    });

    const { data: actions } = useQuery({
        queryKey: ['actions', meetingId],
        queryFn: () => ActionItemsService.listMeetingActionItems(meetingId)
    });

    // Mutations
    const [newDecision, setNewDecision] = useState('');
    const addDecision = useMutation({
        mutationFn: (content: string) => DecisionsService.createDecision(meetingId, { content }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['decisions', meetingId] });
            setNewDecision('');
        }
    });

    const [newAction, setNewAction] = useState({ content: '', assignee: '' });
    const addAction = useMutation({
        mutationFn: () => ActionItemsService.createActionItem(meetingId, newAction),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['actions', meetingId] });
            setNewAction({ content: '', assignee: '' });
        }
    });

    const updateActionStatus = useMutation({
        mutationFn: ({ id, status }: { id: number, status: ActionItemStatus }) =>
            ActionItemsService.updateActionItem(id, { status }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['actions', meetingId] })
    });

    if (!meeting) return <div>Loading...</div>;

    return (
        <div>
            <div className="header">
                <div>
                    <h1>{meeting.title}</h1>
                    <span style={{ color: 'var(--text-secondary)' }}>
                        {new Date(meeting.date).toLocaleString()} • {meeting.attendees?.join(', ')}
                    </span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Decisions Section */}
                <div className="card">
                    <h2>Decisions</h2>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        <input
                            value={newDecision}
                            onChange={(e) => setNewDecision(e.target.value)}
                            placeholder="Record a decision..."
                        />
                        <button className="btn" onClick={() => addDecision.mutate(newDecision)}>Add</button>
                    </div>
                    <ul style={{ paddingLeft: '1.2rem' }}>
                        {decisions?.map((d) => (
                            <li key={d.id} style={{ marginBottom: '0.5rem' }}>{d.content}</li>
                        ))}
                    </ul>
                </div>

                {/* Action Items Section */}
                <div className="card">
                    <h2>Action Items</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                        <input
                            value={newAction.content}
                            onChange={(e) => setNewAction({ ...newAction, content: e.target.value })}
                            placeholder="Action item..."
                        />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                value={newAction.assignee || ''}
                                onChange={(e) => setNewAction({ ...newAction, assignee: e.target.value })}
                                placeholder="Assignee (optional)"
                            />
                            <button className="btn" onClick={() => addAction.mutate()}>Add</button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {actions?.map((a) => (
                            <div key={a.id} style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 500 }}>{a.content}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {a.assignee || 'Unassigned'}
                                    </div>
                                </div>
                                <select
                                    value={a.status}
                                    onChange={(e) => updateActionStatus.mutate({ id: a.id, status: e.target.value as ActionItemStatus })}
                                    className={`badge badge-${a.status.toLowerCase().replace(' ', '')}`}
                                    style={{ width: 'auto', padding: '0.25rem' }}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
