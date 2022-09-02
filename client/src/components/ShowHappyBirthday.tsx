import React, { useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import { happyBirthdayTextStyle } from "../styles/ShowHappyBirthdayStyles";

export const ShowHappyBirthday: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireworksPreset(engine);
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{ preset: ["fireworks"] }}
      />
      <div className={happyBirthdayTextStyle}>Happy Birthday!</div>
    </>
  );
};
