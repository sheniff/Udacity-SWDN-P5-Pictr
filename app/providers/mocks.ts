import { IPost, IUser } from './pictr/pictr';

export let mockPosts: Array<IPost> = [
  {
    createdAt: new Date(),
    link: 'http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg',
    message: 'Awww cutie puppieeeeeee!! :DDD <3 <3 <3',
    creator: {
      name: 'sheniff',
      avatar: 'https://avatars2.githubusercontent.com/u/1939291?v=3&s=466'
    },
    numComments: 121
  }
]

export let mockUser: IUser = {
  name: 'JohnDoe',
  avatar: 'http://orig10.deviantart.net/3c61/f/2013/168/a/d/comm__chaser_john_doe_by_leniproduction-d69gct0.jpg',
  numPictrs: 53,
  numComments: 1532
}
