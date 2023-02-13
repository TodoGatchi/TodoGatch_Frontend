import { useEffect } from 'react';
import useGame from '../../hooks/useGame';

type Props = {}

export default function Room({}: Props) {
  const [addNewPet, canvasRef] = useGame();

  useEffect(() => {
    console.log('roomEffect runs');
    addNewPet('george', 'shadowdog');
    // addNewPet('beef', 'shadowdog');
  }, []);

  return (
    <>
      <canvas style={{backgroundColor: 'white'}} ref={canvasRef}></canvas>
      <button onClick={()=>addNewPet('dog', 'x')}>CLICK HERE</button>
    </>
  )
}