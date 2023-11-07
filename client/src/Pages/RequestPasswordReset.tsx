import { useState } from "react";
import { useAppDispatch } from "../Store/hoocs"
import { requestPasswordReset } from "../Store/reducers/authSlice";
import '../Styles/reset.css';

const RequestPasswordReset = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>('');

    const handleRequestReset = () => {
        try {
            dispatch(requestPasswordReset(email))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="reset">
            <input
            type="email"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleRequestReset}>Запросить сброс пароля</button>
        </div>
    )
}

export default RequestPasswordReset