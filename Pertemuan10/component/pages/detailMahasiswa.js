import React, { useState, useEffect } from 'react';

const DetailMahasiswa = () => {
    // Contoh data mahasiswa, ganti dengan fetch API jika perlu
    const [mahasiswa, setMahasiswa] = useState({
        nama: 'Budi Santoso',
        nim: '123456789',
        jurusan: 'Teknik Informatika',
        angkatan: 2021,
        email: 'budi.santoso@email.com'
    });

    // Jika ingin mengambil data dari API, gunakan useEffect di sini

    const handleEdit = () => {
        // Navigasi ke halaman edit, misal menggunakan router
        // window.location.href = `/editMahasiswa/${mahasiswa.nim}`;
        alert('Fitur edit belum diimplementasikan.');
    };

    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
            <h2>Detail Mahasiswa</h2>
            <div>
                <strong>Nama:</strong> {mahasiswa.nama}
            </div>
            <div>
                <strong>NIM:</strong> {mahasiswa.nim}
            </div>
            <div>
                <strong>Jurusan:</strong> {mahasiswa.jurusan}
            </div>
            <div>
                <strong>Angkatan:</strong> {mahasiswa.angkatan}
            </div>
            <div>
                <strong>Email:</strong> {mahasiswa.email}
            </div>
            <button
                style={{
                    marginTop: 32,
                    width: '100%',
                    padding: '12px 0',
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    fontSize: 16,
                    cursor: 'pointer'
                }}
                onClick={handleEdit}
            >
                Edit
            </button>
        </div>
    );
};

export default DetailMahasiswa;