// // import axios from 'axios';

// // export interface Note {
// //     id?: number;
// //     title: string;
// //     content: string;
// // }

// // const getBaseUrl = () => {
// //     const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
// //     const BACKEND_PORT = '8080'; 
// //     return `http://${currentHost}:${BACKEND_PORT}/api/notes`;
// // };

// // const API_URL = getBaseUrl();

// // const getAuthHeaders = () => {
// //     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; 
// //     return {
// //         headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //         }
// //     };
// // };

// // export const noteService = {
// //     getUserNotes: async (): Promise<Note[]> => {
// //         const response = await axios.get(API_URL, getAuthHeaders());
// //         return response.data;
// //     },

// //     createNote: async (note: Note): Promise<Note> => {
// //         const response = await axios.post(API_URL, note, getAuthHeaders());
// //         return response.data;
// //     },

// //     updateNote: async (id: number, note: Note): Promise<Note> => {
// //         const response = await axios.put(`${API_URL}/${id}`, note, getAuthHeaders());
// //         return response.data;
// //     },

// //     deleteNote: async (id: number): Promise<void> => {
// //         const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
// //         return response.data;
// //     }
// // };
// import axios from 'axios';

// export interface Note {
//     id?: number;
//     title: string;
//     content: string;
// }

// const getBaseUrl = () => {
//     const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
//     const BACKEND_PORT = '8080'; 
//     return `http://${currentHost}:${BACKEND_PORT}/api/notes`;
// };

// const API_URL = getBaseUrl();

// const getAuthHeaders = () => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; 
//     return {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//     };
// };

// export const noteService = {
//     getUserNotes: async (): Promise<Note[]> => {
//         const response = await axios.get(API_URL, getAuthHeaders());
//         return response.data;
//     },

//     createNote: async (note: Note): Promise<Note> => {
//         const response = await axios.post(API_URL, note, getAuthHeaders());
//         return response.data;
//     },

//     updateNote: async (id: number, note: Note): Promise<Note> => {
//         const response = await axios.put(`${API_URL}/${id}`, note, getAuthHeaders());
//         return response.data;
//     },

//     deleteNote: async (id: number): Promise<void> => {
//         const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
//     }
// };
import axios from 'axios';

export interface Note {
    id?: number;
    content: string;
}

const getBaseUrl = () => {
    const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const BACKEND_PORT = '8080'; 
    return `http://${currentHost}:${BACKEND_PORT}/api/notes`;
};

const API_URL = getBaseUrl();

const getAuthHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; 
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

export const noteService = {
    getUserNotes: async (): Promise<Note[]> => {
        const response = await axios.get(API_URL, getAuthHeaders());
        return response.data;
    },

    createNote: async (note: Note): Promise<Note> => {
        const response = await axios.post(API_URL, note, getAuthHeaders());
        return response.data;
    },

    updateNote: async (id: number, note: Note): Promise<Note> => {
        const response = await axios.put(`${API_URL}/${id}`, note, getAuthHeaders());
        return response.data;
    },

    deleteNote: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    }
};