import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { type } from 'node:os';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/chat')
.then(() => console.log("Connected to yourDB-name database"))
.catch((err) => console.log(err));

const RoomScheme = mongoose.Schema({
  type: {type: String, required: true},
  nameRoom: {type: String},
  users: [{type: String}],
  messages: [
    {
      name: {
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
    authorName: {type: String},
    text: {type: String, default: ''},
    date: {type: Date, default: Date.now},
  }
})

const UserScheme = mongoose.Schema({
  login: {type: String, required: true, unique: true},
  password:{type: String, required: true},
  rooms: [{type: String}],
  active: {type: Boolean, default: false}
}) 

export const Room = mongoose.model('room', RoomScheme)

export const Users = mongoose.model('user', UserScheme);


app.get("/api/getUser", ({ query: { login, password } }, res) => {
  Users.findOne({ login, password }).then((user) => {
    if (user !== null) {
      res.json(user);
      // console.log(user)
      // res.json(true);
    } else {
      res.json(false);
    }
  });
  console.log(login, password);
});

app.post("/api/registration", async (req, res) => {
  try {
    console.log('post')
    const users = new Users(req.body);
    console.log("users", req.body);
    let result = await users.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      res.send(req.body);
      console.log(result);
    } else {
      console.log("Posts already register");
    }
  } catch (e) {
    res.send("Something Went Wrong");
  }
});

app.post('/api/rooms', async (req, res) => { //вступление в комнату
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

app.get('/api/getAllrooms/:user', async (req, res) => {
  const user = req.params.user; // Получаем user из параметров
  console.log('req', user);
  const rooms = await Room.find({ users: user });
  res.json(rooms);
  console.log('rooms', rooms);
});

app.post('/api/addMessage', async(req, res) => {
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
            name: authorName,
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

io.on('connection', (client) => {
    console.log('Клиент подключился!')

    client.on('mes', (msg) => {
      // const {message, room} = msg;
      console.log(msg)
      io.to(msg.room).emit('mess', msg)
    })

    client.on('create', (room) => {
      console.log(room)
      client.join(room)
      // const roomId = data.id;
      // roomConnections[roomid].push(client);
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