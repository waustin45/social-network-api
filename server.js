const express = require('express');
const db = require('./config/connection');
// Require model
const { user } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/all', (req, res) => {
    user.find({}, (err, result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message: 'something went wrong' });
        }
      })
})

app.get('/:user', (req, res) => {
    console.log(req.params.user)
    user.findById({ _id: req.params.user }, (err, result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message: 'something went wrong' });
        }
      })
})

app.post('/new', (req, res) => {
    const newUser = new user({
        user_name: req.body.user_name,
        email: req.body.email,
        thoughts: req.body.thoughts,
        friendCount: req.body.friendCount
    })
    newUser.save()
    if (newUser) {
        res.status(200).json(newUser);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
})

app.put('/update/:userName', (req, res) => {
    user.findOneAndUpdate(
        { user_name: req.params.userName },
        { email: req.body.email },
        (err, result) => {
            if (result) {
              res.status(200).json(result);
              console.log(`Updated: ${result}`);
            } else {
              console.log('Uh Oh, something went wrong');
              res.status(500).json({ message: 'something went wrong' });
            }
          }
    )
})
app.put('/addFriend/:userName', (req, res) => {
   
    user.findOne(
        { user_name: req.params.userName },
        
        (err, result) => {
            if (result) {
              res.status(200).json(result);
              console.log(`Updated: ${result}`);
              
            } else {
              console.log('Uh Oh, something went wrong');
              res.status(500).json({ message: 'something went wrong' });
            }
          }
    ).updateOne(
        {
            friendCount: req.body.friendCount + 1
        }
    )
    
    
})
app.put('/deleteFriend/:userName', (req, res) => {
   
    user.findOne(
        { user_name: req.params.userName },
        
        (err, result) => {
            if (result) {
              res.status(200).json(result);
              console.log(`Updated: ${result}`);
              
            } else {
              console.log('Uh Oh, something went wrong');
              res.status(500).json({ message: 'something went wrong' });
            }
          }
    ).updateOne(
        {
            friendCount: req.body.friendCount - 1
        }
    )
    
    
})
app.delete('/delete/:id', (req, res) => {
    user.findOneAndDelete(
        { _id: req.params.id },
        (err, result) => {
            if (result) {
              res.status(200).json(result);
              console.log(`deleted: ${result}`);
            } else {
              console.log('Uh Oh, something went wrong');
              res.status(500).json({ message: 'something went wrong' });
            }
          }
    )
})


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });