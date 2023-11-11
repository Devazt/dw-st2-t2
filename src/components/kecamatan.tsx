import React, { useEffect, useState } from 'react';
import axios from 'axios'

interface Kecamatan {
    id: number;
    regency_id: number;
    name: string;
}

interface KecamatanDropProps {
    selectedKabKot: KabKot;
    onSelectKecamatan: (kecamatan: Kecamatan) => void;
}

const KecamatanDrop: React.FC<KecamatanDropProps> = ({ selectedKabKot, onSelectKecamatan }) => {
    const [kecamatans, setKecamatans] = useState<Kecamatan[]>([]);

    useEffect(() => {
        // Fetch data kecamatan dari API Statis
        axios.get<Kecamatan[]>(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedKabKot.id}.json`)
        .then((response) => setKecamatans(response.data))
        .catch((error) => console.error('Error fetching data:', error));
    },[selectedKabKot]);

    return (
        <div>
            <h1> Pilih Kecamatan </h1>
        <select onChange={(e) => onSelectKecamatan(kecamatans.find((kecamatan) => kecamatan.name === e.target.value) || kecamatans[0])}>
            <option value="">Pilih Kecamatan</option>
            {kecamatans.map((kecamatan) => (
                <option key={kecamatan.id} value={kecamatan.name}>{kecamatan.name}</option>
            ))}
        </select>
        </div>
    );
};

export default KecamatanDrop