import React, { useEffect, useState } from 'react'
import ParticleImage, { 
  ParticleOptions,
  Vector,
  forces,
  ParticleForce
 } from "react-particle-image";
import useWindowSize from "@rooks/use-window-size";
import Confetti from 'react-dom-confetti';
import {useCell} from "../../context/BingoContext"
import "./styles.css";

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    // Get pixel
    const pixel = image.get(x, y);
    // Make a particle for this pixel if blue > 50 (range 0-255)
    return pixel.b > 50;
  },
  color: ({ x, y, image }) => "#fdff6a",
  radius: () => Math.random() * 1.5 + 0.5,
  mass: () => 20,
  friction: () => 0.15,
  initialPosition: ({ canvasDimensions }) => {
      return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
  }
};

const motionForce = (x: number, y: number): ParticleForce => {
  return forces.disturbance(x, y, 5);
};

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 4000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

  
// interface BingoWinnerProps {
//   isActive: boolean;
//   // toggleActive: Function;
// }
  
function BingoWinner() {
  const {celebrate} = useCell() 
  const { innerWidth, innerHeight } = useWindowSize();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsActive(celebrate)
    }, 1000)
  }, [])

  return (
    <div className='cheer'>
      <div className='confetti'>
        <Confetti active={ isActive } config={ confettiConfig }/>
      </div>
      
      <ParticleImage
        src={require("../../assets/images/winner.png")}
        width={Number(innerWidth)}
        height={Number(innerHeight)}
        scale={0.75}
        entropy={20}
        maxParticles={4000}
        deathDuration={4000}
        particleOptions={particleOptions}
        mouseMoveForce={motionForce}
        touchMoveForce={motionForce}
        backgroundColor="rgba(0,0,0,0.4)"
      />
    </div>
    
  );
}

export default BingoWinner