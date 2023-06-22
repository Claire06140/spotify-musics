import React, { useEffect, useState } from "react"
import axios from 'axios'

import { backEndUrl } from "../config.js"
import { sendToBackend } from '../helpers/sendToBackend'
import Loading from './Loading.jsx'

export default function Musics (){
  const [tracks, setTracks] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [sortByTrack, setSortByTrack] = useState(false);

  async function getTokens() {
    try {
      const response = await axios.get(`${backEndUrl}/tokens`)
      setAccessToken(response.data.access_token)
    } catch (err) {
      console.log("erreur pour getmusics: ", err)
    }
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  async function getMusics() {
    setIsLoading(true);
    try {
      const trackAmount = await axios.get(
        "https://api.spotify.com/v1/me/tracks",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const result = trackAmount.data.total;
      const iterations = Math.ceil(result / 50);
      let trackArray = [];
      let i = 0;
      let j = 0;
      for (i, j; i < iterations; i++, j += 50) {
        const tracksResponse = await axios.get(
          "https://api.spotify.com/v1/me/tracks",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              limit: 50,
              offset: j,
            },
          }
        );
        const tracks = tracksResponse.data.items.map((item) => ({
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists[0].name,
        }));
        trackArray = [...trackArray, tracks]
      }
      const organizedTracks = {}
      trackArray.flat().forEach((track) => {
        const firstLetter = sortByTrack
          ? track.name[0].toUpperCase()
          : track.artist[0].toUpperCase()
        if (!organizedTracks[firstLetter]) {
          organizedTracks[firstLetter] = []
        }
        organizedTracks[firstLetter].push(track)
      })
      setTracks(organizedTracks)
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setIsTokenExpired(true)
        setAccessToken("")
      } else {
        console.log("error other than 401 while fetching tracks: ", err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (accessToken !== "") {
      getMusics()
    }
  }, [accessToken, sortByTrack])

  return (
    <div>
      {!accessToken && (
      <p>Click on Start Authentification • Then click on Show musics</p>
      )}
      <div className="buttons-container">
        <button onClick={sendToBackend}>Start Authentification</button>
        <button onClick={getTokens}>Show musics</button>
      </div>
      <div className="app-content">
        {isLoading ? (
          <Loading />
        ) : (
          tracks && (
            <>
              <div className="search-space">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search"
                />
                <label>
                  <input
                    type="checkbox"
                    checked={sortByTrack}
                    onChange={(e) => setSortByTrack(e.target.checked)}
                  />
                  Sort by trackname
                </label>
              </div>
              {isTokenExpired ? (
                <p>
                  Need a brand new token • Click on Start Authentication and try
                  again
                </p>
              ) : (
                <div className="grid-container">
                  {Object.keys(tracks)
                    .sort()
                    .map((letter) => {
                      const tracksToDisplay =
                        searchTerm === ""
                          ? tracks[letter]
                          : tracks[letter].filter((track) => {
                              const title = track.name.toLowerCase();
                              const artist = track.artist.toLowerCase();
                              return (
                                title.includes(searchTerm.toLowerCase()) ||
                                artist.includes(searchTerm.toLowerCase())
                              );
                            });
                      if (tracksToDisplay.length === 0) {
                        return null; // Ignorer le rendu de cette lettre
                      }
                      return (
                        <div className="grid-item" key={letter}>
                          <h2>- {letter} -</h2>
                          {tracksToDisplay.map((track) => (
                            <div key={track.id}>
                              {sortByTrack ? (
                                <>
                                  <h3>{track.name}</h3>
                                  <p>{track.artist}</p>
                                </>
                              ) : (
                                <>
                                  <h3>{track.artist}</h3>
                                  <p>{track.name}</p>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  )
}
