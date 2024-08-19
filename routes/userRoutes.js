const express = require('express');
const router = express.Router();
const User = require('../model/user');


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('users/index', { users });
  } catch (err) {
    res.status(500).send('Error retrieving users');
  }
});

// GET form to create new user
router.get('/create', (req, res) => {
  res.render('users/create');
});

// POST create new user
router.post('/', async (req, res) => {
    const user = new User(req.body);
  try {
    await user.save();
    res.redirect('users');
  } catch (err) {
    res.status(400).send('Error creating user');
  }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).send('User not found')
        }
        res.render('users/show', {user});
    } catch (error) {
        
    }
})

router.get('/:id/edit', async (req,res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('users/edit', {user});
  } catch (error) {
    res.status(404).send('Error retrieving user for editing');
  }

})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true, // Mengembalikan user yang sudah diperbarui
    });
    res.redirect(`/users/${user._id}`);
  } catch (error) {
    console.error('Error updating data', error);
    res.status(500).send('Error updating user');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.redirect('/users');
  } catch (error) {
    console.error('Error deleting user: ', error);
    res.status(500).send('Error deleting user');
  }
});


module.exports = router;
