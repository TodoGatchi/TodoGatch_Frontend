import { useEffect, useLayoutEffect, useRef, useState } from "react";
import shadow from '/public/shadow_dog.png';

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
  }
]

class Pet {
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  type: string;
  status: string;
  image: HTMLImageElement;

  constructor(name: string, type: string) {
    this.name = name;
    this.x = Math.random() * (screen.width - 500);
    this.y = 0;
    this.width = 575;
    this.height = 523;
    this.type = type;
    this.status = 'run';
    if(typeof window !== 'undefined') {
      this.image = new Image();
      this.image.src = shadow.src;
    }
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
  getPosition() {
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[this.status].loc.length;

    let frameX = spriteAnimations[this.status].loc[position].x;
    let frameY = spriteAnimations[this.status].loc[position].y;

    return {frameX, frameY};
  }
  display(canvas: CanvasRenderingContext2D | null) {
    let coords = this.getPosition();

    canvas?.drawImage(this.image, coords.frameX, coords.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
  }
  randomStatusOverInterval() {
    const setRandomInterval = (intervalFunction:Function, minDelay:number, maxDelay:number) => {
      let timeout:NodeJS.Timeout;

      const runInterval = () => {
        const timeoutFunction = () => {
          intervalFunction();
          runInterval();
        };

        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

        timeout = setTimeout(timeoutFunction, delay);
      };

      runInterval();

      return {
        clear() { clearTimeout(timeout) },
      };
    };

    return setRandomInterval(() => {
      let randomIdx = Math.floor(Math.random() * animationTypes.length);

      this.changeStatus(animationTypes[randomIdx].name);
    }, 1000, 10000);

  }
}

const spriteWidth = 575;
const spriteHeight = 523;

let staggerFrames = 5;
let gameFrame = 0;

interface Location {
  x: number,
  y: number
}

interface Frames {
  loc: Location[]
}
interface spriteObject {
  [key: string]: Frames
}

const spriteAnimations: spriteObject = {};
animationTypes.forEach((type, index) => {
  let frames: Frames = {
    loc: []
  }

  for(let i = 0; i < type.frames; i++) {
    let x = i * spriteWidth;
    let y = index * spriteHeight;
    frames.loc.push({x, y});
  }
  spriteAnimations[type.name] = frames;
})
let cancelId = null;
// let test = new Pet('jeorge', 'dogo');

export default function useGame() {
  const [pets, setPets] = useState<Pet[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth]= useState<number>(600);
  const [canvasHeight, setCanvasHeight]= useState<number>(600);

  function addNewPet(name: string, type: string) {
    let temp = new Pet(name, type);

    setPets([...pets, temp]);
  }
  // console.log('hi')
  function animate(canvas: CanvasRenderingContext2D | null): number {
    canvas?.clearRect(0, 0, canvasWidth, canvasHeight);
    // console.log(pets);

    pets.forEach((pet) => {
      pet.display(canvas);
      // pet.walk()
      if(pet.status === 'run') {
        // pet.walk(false);
      }

    });

    gameFrame++;

    cancelId = requestAnimationFrame(() => animate(canvas));
  }

  useEffect(() => {
    console.log(pets);
    setCanvasWidth(screen.width);
    setCanvasHeight(screen.height);

    if(canvasRef.current) {
      const canvas: CanvasRenderingContext2D | null = canvasRef.current.getContext('2d');
      canvasRef.current.width = canvasWidth;
      canvasRef.current.height = canvasHeight;

      animate(canvas);

      // let cancelRandoms = [];
      let cancelRandom;

      pets.forEach((pet) => {
        // cancelRandoms.push(pet.randomStatusOverInterval());
        cancelRandom = pet.randomStatusOverInterval();
        // cancelRandom.clear();
      })
      // console.log(cancelRandoms);
      return () => {
        cancelAnimationFrame(cancelId);
        cancelRandom?.clear();
        cancelRandom = undefined;
        // cancelRandoms.forEach((random) => {
        //   random.clear();
        // })
      }
    }
  }, [pets]);
  //a
  return [addNewPet, canvasRef]
}