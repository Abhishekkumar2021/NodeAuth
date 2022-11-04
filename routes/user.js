const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const isLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
};

router.get('/',  (req, res) => {
    res.render('home');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.redirect('/');
}); 

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username });
    if(!user){
        return res.redirect('/login');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        req.session.user_id = user._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }
});


router.get('/secret', isLogin ,(req, res) => {
    res.render('secret');
});

router.get('/logout',isLogin, (req, res) => {
    req.session.user_id = null;
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;