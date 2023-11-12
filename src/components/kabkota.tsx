import React, { useEffect, useState } from 'react';
import axios from 'axios'

interface KabKota {
    id: number;
    province_id: number;
    name: string;
}

interface KabKotaDropProps {
    selectedProv: Provinsi;
    onSelectKabKota: (kabKota: KabKota) => void;
}

const KabKotaDrop: React.FC<KabKotaDropProps> = ({ selectedProv, onSelectKabKota }) => {
    const [kabKotas, setKabKotas] = useState<KabKota[]>([]);

    useEffect(() => {
        // Fetch data kab/kota dari API Statis
        axios.get<KabKota[]>(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProv.id}.json`)
        .then((response) => setKabKotas(response.data))
        .catch((error) => console.error('Error fetching data:', error));
    }, [selectedProv]);

    return (
        <div>
            <h1> Pilih Kab/Kota </h1>
        <select onChange={(e) => onSelectKabKota(kabKotas.find((kabKota) => kabKota.name === e.target.value) || kabKotas[0])}>
            <option value="">Pilih Kab/Kota</option>
            {kabKotas.map((kabKota) => (
                <option key={kabKota.id} value={kabKota.name}>{kabKota.name}</option>
            ))}
        </select>
        </div>
    );
};

export default KabKotaDrop;