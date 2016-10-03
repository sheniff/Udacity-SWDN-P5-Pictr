import { IPost, IUser, ITimelineEntry, IComment } from './pictr/pictr';

export let mockUsers: Array<IUser> = [
  {
    name: 'JohnDoe',
    avatar: 'http://orig10.deviantart.net/3c61/f/2013/168/a/d/comm__chaser_john_doe_by_leniproduction-d69gct0.jpg',
    numPictrs: 53,
    numComments: 1532
  },
  {
    name: 'sheniff',
    avatar: 'https://avatars2.githubusercontent.com/u/1939291?v=3&s=466',
    numPictrs: 45,
    numComments: 101
  },
  {
    name: 'chipmunk',
    avatar: 'http://woodstream.scene7.com/is/image/woodstream/hh-animals-chipmunk-3',
    numPictrs: 12,
    numComments: 90
  },
]

export let mockComments: Array<IComment> = [
  {
    creator: mockUsers[1],
    message: 'Nice! Can\'t wait to see more!',
    createdAt: new Date()
  },
  {
    creator: mockUsers[2],
    message: 'Well... I\'ve seen better ones...',
    createdAt: new Date()
  },
  {
    creator: mockUsers[1],
    message: 'Oh, shut up!!',
    createdAt: new Date()
  }
]

export let mockPosts: Array<IPost> = [
  {
    createdAt: new Date(),
    link: 'http://i.imgur.com/0F374vh.jpg',
    message: 'Awww cutieeeee!! :DDD <3 <3 <3',
    creator: mockUsers[0],
    numComments: 121,
    comments: mockComments.slice().reverse()
  }
]

export let mockTimeline: Array<ITimelineEntry> = [
  {
    createdAt: new Date(),
    action: 'Commented on a Pictr',
    creator: mockUsers[0],
    post: mockPosts[0]
  }, {
    createdAt: new Date(),
    action: 'Created a new Pictr',
    creator: mockUsers[0],
    post: mockPosts[0]
  }
]
