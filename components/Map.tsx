import ReactMapGL, { Marker } from 'react-map-gl';
import { useState } from 'react';
import getCenter from 'geolib/es/getCenter'
import Image from "next/image";
import pin from "../images/pin.png";
// import { ICoordinates } from '../typings';

const MapContainer = (props: any) => {

    const [viewState, setViewState] = useState({
        longitude: 0,
        latitude: 30,
        zoom: 1
    })

    const [guessMarkerVisible, setGuessMarkerVisible] = useState(false);
    const [markerLocation, setMarkerLocation] = useState({
        longitude: 0, latitude: 0
    })

    const handleClick = ({ lngLat }: { lngLat: any }) => {
        setMarkerLocation({
            longitude: lngLat.lng,
            latitude: lngLat.lat
        })
        setGuessMarkerVisible(true)
    }

    const [actualMarkerVisible, setActualMarkerVisible] = useState(false)

    const centerMap = { ...getCenter([markerLocation, props.actualCoordinates]), zoom: 2 } as { longitude: number; latitude: number; zoom: number }
    // if (!centerMap) {
    //     throw new Error('points is an empty array')
    // }

    console.log("center");
    console.log(centerMap);
    console.log("viewState:");
    console.log(viewState);

    return (
        <>
            <ReactMapGL
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: '100%', height: '50vh' }}
                mapStyle="mapbox://styles/rurigrass/clbxzbwa7000g15n3a6dqctpv"
                mapboxAccessToken={process.env.mapbox_key}
                onClick={handleClick}
                cursor="crosshair"
            >
                {guessMarkerVisible &&
                    <Marker
                        {...markerLocation}
                        anchor="bottom" draggable>
                        <Image src={pin} alt="pin" priority={true} />
                    </Marker>
                }
                {actualMarkerVisible &&
                    <Marker
                        {...props.actualCoordinates}
                        anchor="bottom" draggable>
                        <Image src={pin} alt="pin" priority={true} />
                    </Marker>
                }
            </ReactMapGL>
            <button className='hover:bg-green-500 hover:text-white' onClick={(e) => {
                e.preventDefault, setActualMarkerVisible(true), props.submitGuess(markerLocation), setViewState(centerMap);

                // setViewport({
                //     longitude: centerMap.longitude,
                //     latitude: 100,
                //     zoom: 2
                // })
            }}>Guess</button>
        </>
    )
}

export default MapContainer