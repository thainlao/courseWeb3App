import User from "../models/User.js"
import bcrypt from 'bcryptjs';
import jwb from 'jsonwebtoken';

export const registration = async (req, res) => {
    try {
        const {username, password, email, name} = req.body

        const isUsernameUsed = await User.findOne({username})
        if (isUsernameUsed) {
            return res.json({message: 'Данный Username занят'})
        }

        const isEmailUsed = await User.findOne({email})
        if (isEmailUsed) {
            return res.json({message: 'Данный Email занят'})
        }

        const salt = bcrypt.genSaltSync(3);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
            email,
            name,
        })

        const token = jwb.sign({
            id: newUser._id, username: newUser.username
        }, process.env.JWB_SECRET, {expiresIn: '30d'})

        await newUser.save();
        res.json({newUser, token, message: 'Успешная регистрация'})

    } catch (e) {
        res.json({message: 'Произошла ошибка'})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.json({message: 'Данный пользователь не найден'})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.json({message: 'Неверный пароль'})
        }

        const token = jwb.sign({
            id: user._id, username: user.username
        }, process.env.JWB_SECRET, {expiresIn: '30d'})

        res.json({
            token, user, message: 'Успешно вошли'
        })
    } catch (e) {
        res.json({message: 'Произошла ошибка'})
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.json({message: 'Данный пользователь не найден'})
        }

        const token = jwb.sign({
            id: user._id, username: user.username
        }, process.env.JWB_SECRET, {expiresIn: '30d'})

        res.json({user, token})
    } catch (e) {
        res.json({message: 'Нет доступа'})
    }
}

export const updateUserUsername = async (req, res) => {
    try {
      const { newUsername } = req.body;

      const existingUserWithUsername = await User.findOne({ username: newUsername });
      if (existingUserWithUsername) {
        return res.json({ message: "Имя пользователя уже занято" });
      }

      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.json({ message: "Пользователь не найден" });
      }
  
      user.username = newUsername;
      await user.save();
  
      res.json({ message: "Имя пользователя успешно обновлено" });
    } catch (error) {
      res.json({ message: "Произошла ошибка" });
    }
};

export const updateUserEmail = async (req, res) => {
    try {
      const { newEmail } = req.body;
      const existingUserWithEmail = await User.findOne({ email: newEmail });

      if (existingUserWithEmail) {
        return res.json({ message: "Email уже занят" });
      }

      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.json({ message: "Пользователь не найден" });
      }
  
      user.email = newEmail;
      await user.save();
  
      res.json({ message: "Email успешно обновлен" });
    } catch (error) {
      res.json({ message: "Произошла ошибка" });
    }
};
  
  export const updateUserName = async (req, res) => {
    try {
      const { newName } = req.body;
      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.json({ message: "Пользователь не найден" });
      }
  
      user.name = newName;
      await user.save();
  
      res.json({ message: "Имя успешно обновлено" });
    } catch (error) {
      res.json({ message: "Произошла ошибка" });
    }
};