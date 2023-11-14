'use client'
import { useState, useRef } from 'react';
import Image from 'next/image';
import './globals.css';

export default function Home() {
  const [nama, setNama] = useState('Kadek Astri Yani');
  const [inputNama, setInputNama] = useState(''); // State untuk input teks
  const inputRef = useRef(null); // Referensi ke elemen input teks

  function handlerGantiNama() {
    if (inputNama) {
      setNama(inputNama);
    }
  }

  function handleInputChange(event) {
    setInputNama(event.target.value);
  }

  function handleInputKeyPress(event) {
    if (event.key === 'Enter') {
      handlerGantiNama();
    }
  }

  return (
    <div className='body'>
      <div className="banner-container">
        {/* Kartunya */}
        <div className="header-banner-wrapper">
          {/* Foto Profil dan Nama */}
          <div className="profile-header-banner">
            {/* Foto Profil*/}
            <Image
              src="/assets/profil.png"
              alt="Picture of the author"
              fill
              objectFit='contain'
            />
          </div>
          <div className="content-header-banner">
            {/* Nama dan Kawan2*/}
            <h1>{nama}</h1>
            <div className="bio-nim-header-banner">
              {/* NIM dan BIO*/}
              <p>D121211035</p>
              <p>30 Desember 2003</p>
            </div>
          </div>
        </div>
        <div className="cta-banner-wrapper">
          {/* Input teks */}
          <input
            type="text"
            value={inputNama}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            placeholder="Tuliskan Namamu"
            ref={inputRef}
          />
          {/* Tombol CTA */}
          <div className='cta-button' 
          style={{
            marginTop: '12px'
          }}
          onClick={handlerGantiNama}>
            <p>Ganti Nama</p>
          </div>
        </div>
      </div>
    </div>
  );
}
