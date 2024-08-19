const mongoose = require('mongoose');
const User  = require('./model/user');

mongoose.connect('mongodb://localhost:27017/shop_db')
.then((result) => {
    console.log('Terhubung ke Database MongoDB');   
}).catch((err) => {
    console.error(err);
});

const user = [
    {
        nama: 'Surya Dwi Pramana',
        jenis_kelamin : 'Pria',
        no_hp: '085325501656',
        email: 'suryadwipramana18@gmail.com',
        password: 'admin123'
    },
    {
        nama: 'Surya Dwi Pramana',
        jenis_kelamin : 'Pria',
        no_hp: '085325501777',
        email: 'suryadwipramana19@gmail.com',
        password: 'admin123'
    },
    {
        nama: 'Surya Dwi Pramana',
        jenis_kelamin : 'Pria',
        no_hp: '085325501999',
        email: 'suryadwipramana20@gmail.com',
        password: 'admin123'
    }
]

User.insertMany(user)
.then((result) => {
    console.log('Berhasil menambah data')
}).catch((err) => {
    console.error(err);
})