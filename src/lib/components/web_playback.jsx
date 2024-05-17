// 'use client'
// import { VFC, useState, useEffect } from "react";


// export const WebPlayback = ({ getPlayback ,token }) => {
//     const [is_paused, setPaused] = useState  (false);
//     const [is_active, setActive] = useState (false);
//     const [player, setPlayer] = useState  (null);
//     const [current_track, setTrack] = useState  (null);

//     useEffect(() => {
//         console.log(token)
//         const script = document.createElement("script");
//         script.src = "https://sdk.scdn.co/spotify-player.js";
//         script.async = true;
//         document.body.appendChild(script);
//         window.onSpotifyWebPlaybackSDKReady = () => {
//             const player = new window.Spotify.Player({
//                 name: "shrillecho-app",
//                 getOAuthToken: (cb) => {
//                     cb(token);
//                 },
//                 volume: 1.0,
//             });

//             setPlayer(player);

//             player.addListener("ready", ({ device_id }) => {
//                 console.log("Ready with Device ID", device_id);
//             });

//             player.addListener("not_ready", ({ device_id }) => {
//                 console.log("Device ID has gone offline", device_id);
//             });

//             player.addListener("player_state_changed", (state) => {
           
//                 getPlayback() 
//             });
//             player.connect();
//         };
//     }, [token]);

  

//     return (
//        <h1></h1>
//     )
// };
