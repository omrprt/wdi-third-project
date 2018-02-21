const mongoose = require('mongoose');
const { db, env } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(db[env]);

const Event = require('../models/event');
const User = require('../models/user');

Event.collection.drop();
User.collection.drop();

User
  .create([{
    firstName: 'Suzie',
    lastName: 'Smith',
    username: 'Party_Guru',
    email: 'suzie@smith.com',
    password: 'password',
    passwordConfirmation: 'password',
    bio: 'Wife, mama, blogger, organizer. Always up to do something.',
    profilePic: 'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-0.3.5&s=e1bddd72952e837dc31b0689396ee021&auto=format&fit=crop&w=1050&q=80'
  },{
    firstName: 'Angie',
    lastName: 'Miller',
    username: 'smilingangel',
    email: 'angie@miller.com',
    password: 'password',
    passwordConfirmation: 'password',
    bio: 'Full-time artist, part-time office-dweller. Always ready for doing nothing',
    profilePic: 'https://images.unsplash.com/photo-1501625277806-e25bd4596da3?ixlib=rb-0.3.5&s=66a232d84f7b97fe0cf6c7138e59eee0&auto=format&fit=crop&w=800&q=80'
  },{
    firstName: 'Matt',
    lastName: 'Harlow',
    username: 'MattHarlow',
    email: 'matt@harlow.com',
    password: 'password',
    passwordConfirmation: 'password',
    bio: 'I love pizza',
    profilePic: 'https://images.unsplash.com/photo-1455274111113-575d080ce8cd?ixlib=rb-0.3.5&s=24a213cc90398e685e0dcfe27fb9fa26&auto=format&fit=crop&w=668&q=80'
  }, {
    firstName: 'Mark',
    lastName: 'Syverson',
    username: 'Gweic',
    email: 'mark@syverson.com',
    password: 'password',
    passwordConfirmation: 'password',
    bio: 'It\'s me',
    profilePic: 'https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-0.3.5&s=e3dc9dc0bb00e7a6bff62bf0aabfbc28&auto=format&fit=crop&w=1024&q=80'
  }])
  .then((users) => {
    // console.log(users);
    console.log(`${users.length} users created`);
    return Event
      .create([{
        eventName: 'Pizza Night',
        description: 'Let\'s ignore this Valentine-guy and eat pizza!',
        date: 'Feb 14, 2018',
        location: {
          firstLine: '119 Drayton Rd',
          secondLine: '',
          city: 'London',
          postal_code: 'NW10 4DH',
          lat: 51.54035,
          lng: -0.24488
        },
        image: 'https://images.unsplash.com/photo-1509403491765-9fb9d773ca6d?ixlib=rb-0.3.5&s=7384d4b273bc43324d89f08f92d818ae&auto=format&fit=crop&w=1036&q=80',
        eventKey: 809362,
        guests: [users[1]._id, users[3]._id],
        items: [ {
          itemName: 'pizza',
          amount: 'many',
          bringer: null,
          createdBy: users[2]._id
        }, {
          itemName: 'extra ketchup',
          amount: '',
          bringer: null,
          createdBy: users[2]._id
        } ],
        comments: [{
          content: 'I\'m waiting for it',
          createdBy: users[1]._id
        }],
        createdBy: users[2]._id,
        photos: []
      }, {
        eventName: 'LOTR (director\'s cut) Marathon',
        description: 'The very best way to spend a weekend',
        date: 'March 10, 2018',
        location: {
          firstLine: '119 Drayton Rd',
          secondLine: '',
          city: 'London',
          postal_code: 'NW10 4DH',
          lat: 51.54035,
          lng: -0.24488
        },
        image: 'https://cdn.vox-cdn.com/thumbor/nRu2ccLSeYke8-EGrIi1ohMDLdI=/0x0:825x464/1200x800/filters:focal(347x166:479x298)/cdn.vox-cdn.com/uploads/chorus_image/image/57584235/DOiAi2WUEAE3A1Y.0.jpg',
        eventKey: 876562,
        guests: [users[1]._id, users[3]._id],
        items: [ {
          itemName: 'pop-corn',
          amount: 'plenty',
          bringer: null,
          createdBy: users[2]._id
        }, {
          itemName: 'crisps',
          amount: '',
          bringer: [users[1]._id],
          createdBy: users[2]._id
        }, {
          itemName: 'cokes',
          amount: '2 packs',
          bringer: [users[2]._id],
          createdBy: users[2]._id
        }, {
          itemName: 'ice-cream',
          amount: '1 bucket',
          bringer: [users[3]._id],
          createdBy: users[1]._id
        }, {
          itemName: 'coffee',
          amount: '2 big cups',
          bringer: [users[1]._id],
          createdBy: users[1]._id
        } ],
        comments: [{
          content: 'Hobbit marathon next week?',
          createdBy: users[3]._id
        }, {
          content: 'Uh, that would be tough :P',
          createdBy: users[1]._id
        }],
        createdBy: users[2]._id,
        photos: []
      }, {
        eventName: 'Pair Programming',
        description: 'Do some coding',
        date: 'Feb 25, 2018',
        location: {
          firstLine: 'British Library',
          secondLine: '',
          city: 'London',
          postal_code: 'NW1 2DB',
          lat: 51.52998,
          lng: -0.12701
        },
        image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-0.3.5&s=4f097d97eeacf635a30c2f61f783aa92&auto=format&fit=crop&w=1066&q=80',
        eventKey: 802262,
        guests: [users[2]._id],
        items: [ {
          itemName: 'chargers',
          amount: 'many',
          bringer: null,
          createdBy: users[3]._id
        }, {
          itemName: 'coffee',
          amount: 'for 2',
          bringer: users[2]._id,
          createdBy: users[2]._id
        } ],
        comments: [{
          content: 'Just don\'t git push without me!',
          createdBy: users[2]._id
        }],
        createdBy: users[3]._id,
        photos: []
      }, {
        eventName: 'Picnic',
        description: 'A lovely gathering to open this season. I\'m looking forward to it soooo much!',
        date: 'May 5, 2018',
        location: {
          firstLine: 'Victoria Park',
          secondLine: 'at the Pavilion',
          city: 'London',
          postal_code: 'E9 7DE',
          lat: 51.53345,
          lng: -0.04193
        },
        image: 'https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?ixlib=rb-0.3.5&s=969e43bff2d6e807b261faff8b9ddd51&auto=format&fit=crop&w=1050&q=80',
        eventKey: 802162,
        guests: [users[1]._id, users[2]._id],
        items: [ {
          itemName: 'fruits',
          amount: '',
          bringer: null,
          createdBy: users[0]._id
        }, {
          itemName: 'napkins',
          amount: '2 packs',
          bringer: users[2]._id,
          createdBy: users[0]._id
        }, {
          itemName: 'sun-cream',
          amount: '',
          bringer: users[2]._id,
          createdBy: users[0]._id
        }, {
          itemName: 'scones',
          amount: 'many',
          bringer: null,
          createdBy: users[0]._id
        }, {
          itemName: 'cream',
          amount: '',
          bringer: null,
          createdBy: users[0]._id
        }, {
          itemName: 'jam',
          amount: '',
          bringer: null,
          createdBy: users[0]._id
        }, {
          itemName: 'bread',
          amount: '',
          bringer: null,
          createdBy: users[0]._id
        }, {
          itemName: 'spreads',
          amount: '',
          bringer: null,
          createdBy: users[0]._id
        }, {
          itemName: 'cucumbers',
          amount: '',
          bringer: null,
          createdBy: users[0]._id
        }, {
          itemName: 'tomatos',
          amount: '',
          bringer: null,
          createdBy: users[0]._id
        }, {
          itemName: 'cheese',
          amount: '',
          bringer: null,
          createdBy: users[0]._id
        }, {
          itemName: 'utensils',
          amount: '',
          bringer: users[0]._id,
          createdBy: users[0]._id
        }, {
          itemName: 'blankets',
          amount: '',
          bringer: users[0]._id,
          createdBy: users[0]._id
        } ],
        comments: [{
          content: 'I\'m counting the days until it!',
          createdBy: users[1]._id
        }, {
          content: '<3',
          createdBy: users[0]._id
        }],
        createdBy: users[0]._id,
        photos: []
      } ]);
  })
  .then((events) => {
    // console.log(events);
    console.log(`${events.length} events created`);
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
