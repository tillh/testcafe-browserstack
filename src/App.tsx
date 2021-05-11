import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

export function getActivities(): Promise<AxiosResponse> {
    return axios.request({
        method: 'GET',
        url: '/activities',
        baseURL: 'http://localhost:8080',
        headers: {
            'accept': 'application/json; charset=utf-8',
            'content-type': 'application/json'
        }
    });
}

export function deleteActivities(): Promise<AxiosResponse> {
    return axios.request({
        method: 'DELETE',
        url: '/activities/:bulkDelete',
        baseURL: 'http://localhost:8080',
        headers: {
            'accept': 'application/json; charset=utf-8',
            'content-type': 'application/json'
        },
        data: []
    });
}

function App() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        getActivities().then(result => setData(result.data));
    }, []);


    const deleteEntries = async () => {
        try {
            await deleteActivities();
            const result = await getActivities();
            setData(result.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <ul data-testid={'list'}>
                {data && data.map(entry => <li key={entry.id} data-testid="list-entry">{entry.name}</li>)}
            </ul>

            <button onClick={deleteEntries} data-testid={'delete-btn'}>delete</button>
        </div>
    );
}

export default App;
