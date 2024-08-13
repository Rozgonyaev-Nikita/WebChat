import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { type } from 'node:os';
import cors from 'cors';
import morgan from 'morgan';
import bcrypt from 'bcrypt'

const saltRounds = 10;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/chat')
  .then(() => console.log("Connected to yourDB-name database"))
  .catch((err) => console.log(err));

const RoomScheme = mongoose.Schema({
  type: { type: String, required: true },
  nameRoom: { type: String },
  users: [{ type: String }],
  messages: [
    {
      authorName: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  lastMessage: {
    authorName: { type: String },
    text: { type: String, default: '' },
    date: { type: Date, default: Date.now },
  }
})

const UserScheme = mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rooms: [{ type: String }],
  active: { type: Boolean, default: false },
  friends: {
    myFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    wait: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    offer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  }
});

export const Room = mongoose.model('room', RoomScheme)

export const Users = mongoose.model('user', UserScheme);


app.get("/api/getUser", async(req, res) => {
  const { login, password } = req.query;

  try {
    // Находим пользователя по логину
    const user = await Users.findOne({ login });

    if (user) {
      // Сравниваем введённый пароль с хешем, хранящимся в базе данных
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // отправляем все кроме пароля
        const { password, ...userWithoutPassword } = user.toObject(); 
        res.json(userWithoutPassword);
      } else {
        // Пароли не совпадают
        res.json(false);
      }
    } else {
      // Пользователь не найден
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

  console.log(login, password);
});

app.post("/api/registration", async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const users = new Users({...otherData, password: hashedPassword});
    console.log("users", req.body);
    let result = await users.save();
    result = result.toObject();
    if (result) {
      // delete result.password;
      res.send({...otherData, password: hashedPassword});
      console.log(result);
    } else {
      console.log("Posts already register");
    }
  } catch (e) {
    res.send("Something Went Wrong");
  }
});

app.get('/api/friends/myFriends', async (req, res) => {
  const { search, userId } = req.query;
  if (!userId) { 
    return res.status(401).json({ message: 'Не авторизирован' }); 
  }
  console.log('userId', userId)
  try {
    
    const user = await Users.findOne({ _id: userId }).populate('friends.myFriends');
    console.log('us', user)
    let myFriends = user.friends.myFriends;

    if (search) {
      myFriends = myFriends.filter(friend =>
        friend.login.match(new RegExp(search, 'i'))
      );
    }

    res.json(myFriends);

  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.get('/api/friends/listAddFriend', async (req, res) => {
  const { search, id } = req.query;
  if (!id) { 
    return res.status(401).json({ message: 'Не авторизирован' }); 
  }
  try {
    let users;
    const user = await Users.findOne({_id: id})
    const otherPeople = [...user.friends.myFriends, ...user.friends.wait, user._id ]

    if (search) {

      users = await Users.find({
        $and: [
          { login: { $regex: search, $options: 'i' } },
          { _id: { $nin: otherPeople} }
        ]
      }).populate('friends.offer');

    } else {
      // Находим всех пользователей, если имя не предоставлено
      console.log('cazan')
      users = await Users.find({ _id: { $nin: otherPeople } });
    }

    if (users.length === 0) {
      // return res.json({ message: 'Пользователи не найдены' });
      return res.json([])
    }
    console.log('users', users)
    res.json(users); // Отправляем найденных пользователей
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.get('/api/friends/friendRequests', async (req, res) => {
  const {search, id} = req.query;
  if (!id) { 
    return res.status(401).json({ message: 'Не авторизирован' }); 
  }
  try {
    const user = await Users.findOne({_id: id}).populate('friends.wait');
    const waitFriends = user.friends.wait.filter(u => u.login.includes(search)) 
    console.log('waitFriends', waitFriends)
    res.json(waitFriends)
  } catch (error) {
    console.log(error)
  }
  
});

app.get('/api/getAllrooms/:user', async (req, res) => {// переделать что бы возвращались комнаты которые есть у пользователя, тоесть добавить связи
  const userId = req.params.user; // Получаем userId из параметров
  console.log('req', userId);

  try {
    
    const user = await Users.findById(userId);
    // console.log('user', user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Теперь найдем комнаты по массиву идентификаторов
    const rooms = await Room.find({ _id: { $in: user.rooms } }); // Находим комнаты, идентификаторы которых находятся в массиве rooms
    res.json(rooms);

    // console.log('rooms', rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/room/addGroupRoom', async (req, res) => { //вступление в комнату
  const { type, nameRoom, userId } = req.body;

  try {
    // Найти существующую комнату по типу и имени (если это группа)
    let room = await Room.findOne({ type, nameRoom });

    // Если комната не найдена, создайте новую
    if (!room) {
      room = new Room({
        type,
        nameRoom,
        users: [userId], // добавление пользователя
        messages: [],
        lastMessage: null,
      });
    } else {
      // Если комната существует, добавьте пользователя, если его там нет
      if (!room.users.includes(userId)) {
        room.users.push(userId);
      }
    }

    // Сохраните (или обновите) комнату
    await room.save();
    Users.findOne({ _id: userId })
      .then(user => {
        if (!user) {
          throw new Error('User not found');
        }

        user.rooms.push(room['_id']);

        return user.save(); // возвращаем промис сохранения
      })
      .then(updatedUser => {
        console.log('User updated successfully', updatedUser);
      })
      .catch(err => {
        console.error('Error occurred:', err);
      });

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.post('/api/room/addPrivateRoom', async(req, res) => {
  const {myId, hisId} = req.body;
  console.log(req.body)

  const myUser = await Users.findOne({_id: myId})
  const hisUser = await Users.findOne({_id: hisId})
  const concatLogin = `${myUser.login} ${hisUser.login}`

  const firstMyId = `${myId} ${hisId}`;
  const firstHisId = `${hisId} ${myId}`;

  try {
    const isHave = await Room.findOne({$or: [
      {nameRoom: firstMyId},
      {nameRoom: firstHisId}
    ]})
  
    if(isHave) {
      res.status(200).json(isHave._id)
    } 
    else {
      const room = await new Room({
        type: 'private',
        nameRoom: concatLogin,
        users: [myId, hisId], // добавление пользователя
        messages: [],
        lastMessage: null,
      })
      const {_id} = await room.save();

      myUser.rooms.push(_id);
      hisUser.rooms.push(_id);

      await myUser.save();
      await hisUser.save();

      res.status(200).json(_id)
    }
  } catch (error) {
    console.log('error', error)
  }
  
})

app.post('/api/addMessage', async (req, res) => {
  const { roomId, authorName, text } = req.body;

  if (!roomId || !authorName || !text) {
    return res.status(400).json({ message: 'roomId, authorName and text are required' });
  }

  try {
    // Находим комнату по ID
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Создаем новое сообщение
    const newMessage = {
      authorName,
      text,
      date: new Date()
    };

    // Добавляем новое сообщение в массив messages
    room.messages.push(newMessage);
    // Обновляем поле lastMessage
    room.lastMessage = newMessage;

    // Сохраняем изменения в комнате
    await room.save();

    // Отправляем ответ
    return res.status(200).json({ message: 'Message added successfully', room });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
})

app.patch('/api/friends/addNewFriend', async (req, res) => {
  try {
    const { myId, friendId, action } = req.body; 
    const myUser = await Users.findOne({ _id: myId }); 
    const friendUser = await Users.findOne({ _id: friendId }); 


    if (!myUser || !friendUser) {
      throw new Error('Пользователи не найдены');
    }

    if (myUser.friends.offer.find(p => p.toString() === friendId) || friendUser.friends.wait.find(p => p.toString() === myId)) {
      console.log('ошибка')
      throw new Error('Запрос уже был отправлен')
    }

    if (action === 'sendInvitation') {
      myUser.friends.offer.push(friendUser);
      friendUser.friends.wait.push(myUser);
    } else if (action === 'acceptOffer') {
      //удаляем заявку и предложение в друзья
      const myIndex = myUser.friends.wait.findIndex(u => u._id === friendUser._id)
      const friendIndex = friendUser.friends.offer.findIndex(u => u._id === myUser._id)

      myUser.friends.wait.splice(myIndex, 1)
      friendUser.friends.offer.splice(friendIndex, 1)

      //добавляем в друзья
      myUser.friends.myFriends.push(friendUser);
      friendUser.friends.myFriends.push(myUser);
    }

    await myUser.save();
    await friendUser.save();
    res.json(myUser);
  } catch (error) { res.status(400).send({ error: error.message }); }
});

io.on('connection', (client) => {
  console.log('Клиент подключился!')
  console.log('client', client)

  client.on('enterInRooms', (rooms) => {
    console.log('rooms', rooms)
    rooms.map(room => client.join(room))
  })

  client.on('create', async(id) => {
    const rom = await Room.findOne({_id: id})
    console.log('room', id)
    const _id = rom._id.toString()
    console.log(' _id', _id)
    client.join(_id)
  })

  client.on('refreshFriends', () => {
    client.broadcast.emit('refreshFriendsClient')
  })

  client.on('refreshRooms', (id) => {
    client.broadcast.emit('refreshRoomClient', id)
  })

  client.on('sendEveryoneMessage', (msg) => {
    const { text, roomId, authorName } = msg;
    console.log('msg', msg)
    io.to(roomId).emit('chatMessage', { authorName, text, date: Date.now() })
  })


  client.on('disconnect', () => {
    console.log('Отключился');
  });
})

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});