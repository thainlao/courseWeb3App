import User from "../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "Пользователь с таким email не найден" });
    }

    const resetToken = uuidv4();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Срок действия токена - 1 час

    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Сброс пароля",
      text: `Для сброса пароля перейдите по ссылке: http://localhost:3000/reset-password/${resetToken}`,
      html: `
        <div>
            <h1>Для сброса пароля перейдите по ссылке:</h1>
            <a href="http://localhost:3000/reset-password/${resetToken}">http://localhost:3000/reset-password/${resetToken}</a>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.json({ message: "Произошла ошибка при отправке письма" });
      } else {
        return res.json({
          message: "Письмо с инструкциями по сбросу пароля отправлено успешно",
        });
      }
    });
  } catch (e) {
    res.json({ message: "Произошла ошибка" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({ message: "Срок действия токена истек или токен неверен" });
    }

    const salt = bcrypt.genSaltSync(3);
    const hash = bcrypt.hashSync(newPassword, salt);

    user.password = hash;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.json({ message: "Пароль успешно изменен" });
  } catch (e) {
    res.json({ message: "Произошла ошибка" });
  }
};