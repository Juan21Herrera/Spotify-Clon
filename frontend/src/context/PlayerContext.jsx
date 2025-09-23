import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [current, setCurrent] = useState(null);
  const [queue, setQueue] = useState([]); // lista de tracks
  const [index, setIndex] = useState(-1); // posición en la cola
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Estado de volumen y mute
  const [volume, setVolume] = useState(1); // volumen entre 0 y 1
  const [muted, setMuted] = useState(false);

  // listeners de audio
  useEffect(() => {
    const audio = audioRef.current;

    const onTime = () => {
      if (!audio.duration || isNaN(audio.duration)) return;
      setDuration(audio.duration);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const onEnded = () => {
      // cuando termina, ir a la siguiente
      next();
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadedmetadata", onTime);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadedmetadata", onTime);
    };
  }, []);

  // cuando cambia current -> cargar y reproducir
  useEffect(() => {
    const audio = audioRef.current;
    if (!current || !current.preview) {
      audio.pause();
      audio.src = "";
      setPlaying(false);
      setProgress(0);
      return;
    }

    if (audio.src !== current.preview) {
      audio.src = current.preview;
    }
    audio.currentTime = 0;
    audio.volume = muted ? 0 : volume;
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [current]);

  // aplicar cambios de volumen y mute
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  function playTrack(trackOrList, startIndex = 0) {
    // si es array => set cola entera
    if (Array.isArray(trackOrList)) {
      setQueue(trackOrList);
      setIndex(startIndex);
      setCurrent(trackOrList[startIndex]);
      return;
    }

    // si es track individual
    const track = trackOrList;
    if (!track) return;

    // si es el mismo track => toggle
    if (current && current.id === track.id) {
      toggle();
    } else {
      setQueue([track]);
      setIndex(0);
      setCurrent(track);
    }
  }

  function toggle() {
    if (!current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  function play() {
    if (!current) return;
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }

  function pause() {
    audioRef.current.pause();
    setPlaying(false);
  }

  function seek(seconds) {
    const audio = audioRef.current;
    if (!audio.duration) return;
    audio.currentTime = Math.min(Math.max(0, seconds), audio.duration);
  }

  function next() {
    if (index + 1 < queue.length) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setCurrent(queue[newIndex]);
    } else {
      // cola terminada
      setPlaying(false);
    }
  }

  function prev() {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      setCurrent(queue[newIndex]);
    } else {
      audioRef.current.currentTime = 0;
    }
  }

  function toggleMute() {
    setMuted((m) => !m);
  }

  return (
    <PlayerContext.Provider value={{
      audioRef,
      current,
      setCurrent,
      playing,
      playTrack,
      play,
      pause,
      toggle,
      progress,
      duration,
      seek,
      queue,
      index,
      next,
      prev,
      volume,
      setVolume,
      muted,
      toggleMute,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer debe usarse dentro de PlayerProvider");
  return ctx;
}
