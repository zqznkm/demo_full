import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!e.currentTarget.checkValidity()) {
            setError("Заполните все поля верно")
            console.log("ошибка");
            return
        }

        const logUser = {
            login,
            password
        }
        console.log(logUser);

        // 8(999)999-99-99
        try {
            const response = await fetch("http://localhost:3000/loginUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(logUser),
            });

            const result = await response.json()

            if(result.message === "Неверный логин или пароль"){
                setError("Неверный логин или пароль")
                console.log(result.message);
                return
            }
            // console.log("Зашел");
            // alert("Вошли")
            navigate("/Applications")
            console.log(result);
            JSON.stringify(localStorage.setItem("idusers", result.id))
        } catch (error) {
            console.error(error);
        }

    }


    return (
        <Container >
            <h1>Авторизация</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text" placeholder="Логин" minLength={6} required pattern='[A-Za-z0-9]+' onChange={(e) => setLogin(e.target.value)} data-testid="login-login"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" minLength={8} required onChange={(e) => setPassword(e.target.value)} data-testid="login-password"/>
                </Form.Group>

                <Button variant="primary" type="submit" data-testid="login-submit">Войти </Button>
                <p> Ещё не зарегестрированы? {}
                    <a href='/Register'>Регистрация</a>
                </p>
            </Form>
        </Container>


    )

}

export default Login
