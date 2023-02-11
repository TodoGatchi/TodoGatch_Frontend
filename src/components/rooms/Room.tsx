import { useEffect, useRef, useState } from "react";
import shadow from '/public/shadow_dog.png';
// import Image from "next/image";

type Props = {}

const animationTypes = [
  {
    name: 'idle',
    frames: 7
  },
  {
    name: 'jump',
    frames: 7
  },
  {
    name: 'fall',
    frames: 7
  },
  {
    name: 'run',
    frames: 9
  },
  {
    name: 'dizzy',
    frames: 11
  },
  {
    name: 'sit',
    frames: 5
  },
  {
    name: 'roll',
    frames: 7
  },
  {
    name: 'bite',
    frames: 7
  },
  {
    name: 'ko',
    frames: 12
  },
  {
    name: 'getHit',
    frames: 4
  },

]
const spriteAnimations = {};

class Pet {
  x: number;
  y: number;
  height: number;
  width: number;
  type: string;
  status: string;

  constructor(type: string) {
    this.x = 0;
    this.y = 0;
    this.height = 300;
    this.width = 300;
    this.type = type;
    this.status = 'idle';
  }
  walk(isGoingLeft: boolean) {
    if(isGoingLeft) {
      this.x--;
    } else {
      this.x++;
    }
  }
  changeStatus(status: string) {
    this.status = status;
  }
  display() {

  }
}

export default function Room({}: Props) {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) {

      const canvas = ref.current.getContext('2d');

      setCtx(canvas);
      // do something here with the canvas
      const CANVAS_WIDTH = ref.current.width = 600;
      const CANVAS_HEIGHT = ref.current.height = 600;


      const spriteWidth = 575;
      const spriteHeight = 523;

      let staggerFrames = 5;
      let gameFrame = 0;

      animationTypes.forEach((type, index) => {
        let frames = {
          loc: []
        }

        for(let i = 0; i < type.frames; i++) {
          let x = i * spriteWidth;
          let y = index * spriteHeight;
          frames.loc.push({x, y});
        }
        spriteAnimations[type.name] = frames;
      })

      const petImage = new Image();
      petImage.src = shadow.src;

      let currState = 'idle';

      function animate() {
        canvas?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[currState].loc.length;

        let frameX = spriteAnimations[currState].loc[position].x;
        let frameY = spriteAnimations[currState].loc[position].y;

        canvas?.drawImage(petImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

        gameFrame++;
        requestAnimationFrame(animate);
      }
      animate();
    }
  }, [])



  return (
    <>
      <canvas style={{backgroundColor: 'white'}} ref={ref}></canvas>
    </>
  )
}