"use client";
import "@styles/diary.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Diary() {
  //GET
  const [getJudul, setGetJudul] = useState([]);
  const [getIsiDiary, setGetIsiDiary] = useState([]);
  const [getKoleksiData, setGetKoleksiData] = useState([]);
  const endpointAPI = "https://6555c0f184b36e3a431e3f34.mockapi.io/diaryku";
  async function getDiary() {
    try {
      const res = await axios.get(endpointAPI);

      //ambil data
      const dataJSON = res.data;
      console.log("DATA DALAM", dataJSON);
      setGetKoleksiData(dataJSON);

      //ambil judul
      const judul = dataJSON.map((item) => item.judul);
      console.log("JUDUL DALAM", judul);
      setGetJudul(judul);

      //ambil isi_diary
      const isi_diary = dataJSON.map((item) => item.isi_diary);
      console.log("ISI DALAM", isi_diary);
      setGetIsiDiary(isi_diary);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //POST
  const [postTulisJudul, setPostTulisJudul] = useState("");
  const [postTulisDiary, setPostTulisDiary] = useState("");

  async function postDiary() {
    const updatedDiary = [
      ...getKoleksiData,
      { judul: postTulisJudul, isi_diary: postTulisDiary },
    ];

    setGetKoleksiData(updatedDiary);
    setPostTulisJudul("");
    setPostTulisDiary("");

    try {
      const res = await axios.post(endpointAPI, {
        judul: postTulisJudul,
        isi_diary: postTulisDiary,
      });

      if (res.status >= 200 && res.status < 300) {
        getDiary();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      alert("Failed to POST API: " + error);
    }
  }

  function handlerInputJudul(event) {
    setPostTulisJudul(event.target.value);
  }

  function handlerInputIsiDiary(event) {
    setPostTulisDiary(event.target.value);
  }

  function handlerSubmitDiary(event) {
    event.preventDefault();
    if (postTulisJudul && postTulisDiary) {
      postDiary();
    } else {
      alert("Isi judul dan diary terlebih dahulu!");
    }
  }

  function handlerKeyEnter(e) {
    if (e.key === "Enter") {
      handlerSubmitDiary(e);
    }
  }

  useEffect(() => {
    getDiary();
  }, []);

  return (
    <div>
      {/* POST DIARY */}
      <div className="banner-container">
        <div className="cta-banner-wrapper">
          {/* Tombol CTA */}
          <input
            name="input-judul"
            type="text"
            placeholder="Tuliskan judulmu.."
            onChange={handlerInputJudul}
            onKeyDown={handlerKeyEnter}
            value={postTulisJudul}
          />
          <input
            name="input-diary"
            type="text"
            placeholder="Tuliskan diarymu.."
            onChange={handlerInputIsiDiary}
            onKeyDown={handlerKeyEnter}
            value={postTulisDiary}
          />
          {postTulisJudul && postTulisDiary ? (
            <div className="cta-button" onClick={handlerSubmitDiary}>
              <p>Submit Diary</p>
            </div>
          ) : (
            <div
              className="cta-button disabled"
              onClick={() => alert("Isi terlebih dahulu!")}
            >
              <p>Disabled</p>
            </div>
          )}
        </div>
      </div>

      {/* MAP LIST DIARY */}
      {getKoleksiData ? (
        getJudul.length > 0 ? (
          <ul>
            {getJudul.map((item, idx) => (
              <Link href={`/diary/${item}/${getIsiDiary[idx]}`} key={idx}>
                <li>
                  <div
                    className={`diary-container ${
                      idx === getJudul.length - 1 ? "last-item" : ""
                    }`}
                  >
                    <h1>{getJudul[idx]}</h1>
                    <p className="p-diary">{getIsiDiary[idx]}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          "API is loading"
        )
      ) : (
        "API-nya empty"
      )}
    </div>
  );
}
