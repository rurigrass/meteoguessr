import Head from 'next/head'
import { ICoordinates, IFetch } from '../typings';
import Webcam from '../components/Webcam'
import MapContainer from '../components/Map';

export const getServerSideProps = async () => {
  const number = Math.floor(Math.random() * 63419)
  const key = process.env.windy_key
  const initialRes = await fetch(`https://api.windy.com/api/webcams/v2/list/limit=1,${number}?key=${key}`)
  const initialData = await initialRes.json()
  const webcam = initialData.result.webcams[0].id
  const res = await fetch(`https://api.windy.com/api/webcams/v2/list/webcam=${webcam}?show=webcams:player,location&key=${key}`)
  const data = await res.json();

  return {
    props: { webcams: data }
  }
}

export default function Home({ webcams }: { webcams: IFetch }) {
  const location = webcams?.result.webcams[0].location
  const actualCoordinates = {
    longitude: location.longitude,
    latitude: location.latitude
  }
  // console.log(webcams);
  const submitGuess = (guessCoordinates: ICoordinates) => {
    // console.log("hello father");
    // console.log(guessCoordinates);
    // console.log("actual");
    // console.log(actualCoordinates);

  }

  return (
    <div className='max-w-7xl mx-auto bg-gray-200' >
      <Head>
        <title>MeteoGuessr</title>
      </Head>
      <div className='bg-sky-600 text-green-500 text-4xl text-center'>MeteoGuessr</div>
      <div className='
         grid grid-cols-1 md:grid-cols-2 
      '>
        {webcams &&
          <div className='my-auto'>
            <Webcam webcam={webcams.result.webcams[0].player} />
            <div>lat: {location.latitude} & long: {location.longitude}</div>
          </div>
        }
        <MapContainer submitGuess={submitGuess} actualCoordinates={actualCoordinates} />
      </div>
    </div>
  )
}

//Use effect version
  // const [data, setData] = useState<IFetch | undefined>(undefined);
  // const location = data?.result.webcams[0].location
  // const key = "y1ZmqhBgwsG2HihJQc09UCF3UORWqbBn";
  // const number = Math.floor(Math.random() * 63419)
  // useEffect(() => {
  //   const fetchWebcams = async () => {
  //     fetch(`https://api.windy.com/api/webcams/v2/list/limit=1,${number}?key=${key}`)
  //       .then(res => res.json())
  //       .then(data => {
  //         const webcam = data.result.webcams[0].id
  //         // const webcam = "1666659351"
  //         return fetch(`https://api.windy.com/api/webcams/v2/list/webcam=${webcam}?show=webcams:player,location&key=${key}`)
  //       })
  //       .then(res => res.json())
  //       .then((apiData) => {
  //         // console.log(apiData.result.webcams[0].player);
  //         setData(apiData)
  //       })
  //       .catch(err => {
  //         console.error('Request failed', err)
  //       })
  //   }
  //   fetchWebcams()
  // }, []);