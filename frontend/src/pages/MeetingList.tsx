import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MeetingsService } from '../client';
import type { MeetingCreate } from '../client';

export default function MeetingList() {
    const queryClient = useQueryClient();
    const [showCreate, setShowCreate] = useState(false);
    const [newMeeting, setNewMeeting] = useState<MeetingCreate>({
        title: '',
        date: new Date().toISOString(),
        attendees: []
    });

    const { data: meetings, isLoading } = useQuery({
        queryKey: ['meetings'],
        queryFn: () => MeetingsService.listMeetings()
    });

    const createMutation = useMutation({
        mutationFn: (data: MeetingCreate) => MeetingsService.createMeeting(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meetings'] });
            setShowCreate(false);
            setNewMeeting({ title: '', date: new Date().toISOString(), attendees: [] });
        },
        onError: (error) => {
            console.error('Failed to create meeting:', error);
            alert('Failed to create meeting. Check console for details.');
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate(newMeeting);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className="header">
                <h1>All Meetings</h1>
                <button className="btn" onClick={() => setShowCreate(!showCreate)}>
                    + New Meeting
                </button>
            </div>

            {showCreate && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3>Schedule Meeting</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            placeholder="Meeting Title"
                            value={newMeeting.title}
                            onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                            required
                        />
                        <input
                            type="datetime-local"
                            value={newMeeting.date.slice(0, 16)}
                            onChange={(e) => setNewMeeting({ ...newMeeting, date: new Date(e.target.value).toISOString() })}
                            required
                        />
                        <input
                            placeholder="Attendees (comma separated)"
                            onChange={(e) => setNewMeeting({ ...newMeeting, attendees: e.target.value.split(',').map(s => s.trim()) })}
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" className="btn">Create</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gap: '1rem' }}>
                {meetings?.map((meeting) => (
                    <Link key={meeting.id} to={`/meetings/${meeting.id}`}>
                        <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3 style={{ margin: 0 }}>{meeting.title}</h3>
                                <span style={{ color: 'var(--text-secondary)' }}>
                                    {new Date(meeting.date).toLocaleDateString()}
                                </span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0' }}>
                                {meeting.attendees?.length || 0} {(meeting.attendees?.length || 0) === 1 ? 'attendee' : 'attendees'}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
