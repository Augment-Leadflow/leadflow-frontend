import React, { useState, useEffect } from 'react';
import { noteService } from '../services/noteService';

interface Note {
    id: string;
    content: string;
    createdAt: string;
}

export const NotesWidget: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [newContent, setNewContent] = useState('');
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [editingContent, setEditingContent] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const data = await noteService.getUserNotes();
            setNotes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newContent.trim()) return;

        try {
            setLoading(true);
            const createdNote = await noteService.createNote(newContent);
            setNotes([createdNote, ...notes]); 
            setNewContent('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id: string) => {
        if (!editingContent.trim()) return;

        try {
            const updatedNote = await noteService.updateNote(id, editingContent);
            setNotes(notes.map(n => n.id === id ? updatedNote : n));
            setEditingNoteId(null);
            setEditingContent('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await noteService.deleteNote(id);
            setNotes(notes.filter(n => n.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📝 Personal Scratchpad
            </h2>

            <form onSubmit={handleCreate} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Write a quick note..."
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition duration-150"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Add'}
                    </button>
                </div>
            </form>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {notes.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">No notes saved yet. Capture your thoughts above!</p>
                ) : (
                    notes.map((note) => (
                        <div key={note.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-between gap-2">
                            {editingNoteId === note.id ? (
                                <div className="flex gap-2 w-full">
                                    <input
                                        type="text"
                                        className="flex-1 px-3 py-1 text-sm bg-white border border-indigo-300 rounded-lg focus:outline-none"
                                        value={editingContent}
                                        onChange={(e) => setEditingContent(e.target.value)}
                                    />
                                    <button 
                                        onClick={() => handleUpdate(note.id)}
                                        className="text-xs bg-emerald-500 text-white px-2 py-1 rounded-md font-medium"
                                    >
                                        Save
                                    </button>
                                    <button 
                                        onClick={() => setEditingNoteId(null)}
                                        className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-start gap-4">
                                    <p className="text-sm text-gray-700 break-words flex-1">{note.content}</p>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={() => {
                                                setEditingNoteId(note.id);
                                                setEditingContent(note.content);
                                            }}
                                            className="text-xs text-gray-400 hover:text-indigo-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(note.id)}
                                            className="text-xs text-gray-400 hover:text-red-500 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                            <span className="text-[10px] text-gray-400 self-start">
                                {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};