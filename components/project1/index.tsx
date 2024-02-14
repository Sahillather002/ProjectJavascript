import React, { useEffect, useState } from "react";
import styles from "./project1.module.css";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState<boolean[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const audio = document.querySelector<HTMLAudioElement>(
        `audio[data-key="${e.keyCode}"]`
      );
      const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
      if (!audio) return;

      const index = parseInt(key?.getAttribute("data-index") || "0");

      setIsPlaying((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });

      // Toggle the class after updating the state
      if (!isPlaying[index]) {
        audio.currentTime = 0;
        audio.play();
      } else {
        audio.pause();
      }

      // Add or remove the "playing" class based on the state
      if (key) {
        if (!isPlaying[index]) {
          key.classList.add(styles.playing);
        } else {
          key.classList.remove(styles.playing);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying]); // Add isPlaying as a dependency to useEffect

  // Define an array of key codes corresponding to keys "A" through "L"
  const keyCodes = [65, 83, 68, 70, 71, 72, 73, 74, 75, 76];

  // Map over the keyCodes array to generate the keys dynamically
  const keys = keyCodes.map((keyCode, index) => (
    <div
      key={keyCode}
      data-key={keyCode}
      data-index={index}
      className={`key ${styles.key} ${isPlaying[index] ? styles.playing : ""}`}
    >
      <kbd>{String.fromCharCode(keyCode)}</kbd>
      <audio
        data-key={keyCode}
        src={`/sounds/${String.fromCharCode(keyCode).toLowerCase()}.mp3`}
      />
    </div>
  ));

  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`${styles.keys}`}>{keys}</div>
    </div>
  );
};

export default Index;
