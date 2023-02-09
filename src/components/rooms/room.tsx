import { useEffect, useRef, useState } from "react";
import Image from "next/image";
type Props = {}

export default function Room({}: Props) {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) {
      console.log('yes');
      const canvas = ref.current.getContext('2d')
      // do something here with the canvas
      const CANVAS_WIDTH = ref.current.width = 600;
      const CANVAS_HEIGHT = ref.current.height = 600;
      canvas?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // const petImage = new Image();
      // petImage.src = '/shadow_dog.png';

      // canvas?.drawImage(petImage, 0, 0, 575, 523);
    }
  }, [])

  function animate() {

  }

  return (
    <>
      <Image src="/shadow_dog.png"></Image>
      <canvas ref={ref}></canvas>
    </>
  )
}