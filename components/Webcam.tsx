import { IPlayer } from "../typings";

const Webcam = ({ webcam }: { webcam: IPlayer }) => {
  // console.log(webcam.month);

  return (
    <div className=" bg-yellow-100">
      {webcam.day.embed &&
        <embed className="w-full aspect-video" src={`${webcam.year.embed}?autoplay=1`} />
      }
    </div>
  )
}

export default Webcam