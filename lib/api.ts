const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
}

export async function fetchLeads() {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/api/leads`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return [];
    }
    if (!response.ok) throw new Error('Failed to fetch leads');
    return response.json();
}

// Add delete and update functions here following the same pattern