export interface IFetch {
  result: {
    limit: number,
    offset: number,
    total: number,
    webcams: IWebcam[]
  }
  status: string
}

export interface IWebcam {
  id: string,
  // image: IImage,
  location: ILocation,
  player: IPlayer,
  status: string,
  title: string
}

export interface IPlayer {
  day: {
    available: boolean,
    embed: string,
    link: string
  },
  lifetime: {
    available: boolean,
    embed: string,
    link: string
  },
  live: {
    available: boolean,
    embed: string,
  },
  month: {
    available: boolean,
    embed: string,
    link: string
  },
  year: {
    available: boolean,
    embed: string,
    link: string
  },
}

export interface ICoordinates {
  longitude: number
  latitude: number,
}