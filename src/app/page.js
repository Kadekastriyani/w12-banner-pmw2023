'use client'
import { useState } from "react";
import Image from "next/image";
import "@styles/home.css";

export default function Home() {
  const [isSimpan, setSimpan] = useState(""); // State untuk nilai input
  const [nama, setNama] = useState("Kadek Astri Yani");

  function handlerInputNama(event) {
    setSimpan(event.target.value);
  }

  function handlerSubmit() {
    if (isSimpan.trim() !== "") {
      setNama(isSimpan);
    } else {
      alert("Nama tidak boleh kosong!");
    }
  }

  function handlerKeyEnter(e) {
    if (e.key === "Enter") {
      if (isSimpan.trim() !== "") {
        setNama(isSimpan);
      } else {
        alert("Nama tidak boleh kosong!");
      }
    }
  }

  return (
    <>
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
              objectFit="contain"
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
          {/* Tombol CTA */}
          <input
            name="input-nama"
            type="text"
            placeholder="Tuliskan namamu.."
            onChange={handlerInputNama}
            onKeyDown={handlerKeyEnter}
          />
          {isSimpan.trim() !== "" ? (
            <div className="cta-button" onClick={handlerSubmit}>
              <p>Ganti nama</p>
            </div>
          ) : (
            <div className="cta-button disabled" onClick={() => alert("Nama tidak boleh kosong!")}>
              <p>Disabled</p>
            </div>
          )}
        </div>
      </div>
      
    </>
  );
}
