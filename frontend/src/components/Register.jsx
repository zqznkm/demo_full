import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

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

        const user = {
            login,
            password,
            fullName,
            phone,
            email
        }
        console.log(user);

        // 8(999)999-99-99
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const result = await response.json()
            console.log(result);
            // console.log("Добавлена");
            navigate("/Login")

        } catch (error) {
            console.error(error);
        }

    }


    return (
        <Container >
            <h1>Регистрация</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text"  placeholder="Логин" minLength={6} required pattern='[A-Za-z0-9]+' onChange={(e) => setLogin(e.target.value)} data-testid="reg-login" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" minLength={8} required onChange={(e) => setPassword(e.target.value)}  data-testid="reg-password"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control type="text" placeholder="ФИО" required pattern='[А-Яа-яёЁ\s]+' onChange={(e) => setFullName(e.target.value)} data-testid="reg-fullname"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control type="tel" placeholder="Телефон" required pattern='8\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}' onChange={(e) => setPhone(e.target.value)} data-testid="reg-phone" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Почта</Form.Label>
                    <Form.Control type="email" placeholder="Почта" required onChange={(e) => setEmail(e.target.value)}  data-testid="reg-email"/>
                </Form.Group>

                <Button variant="primary" type="submit" data-testid="reg-submit"> Создать пользователя </Button>
                <p> Уже есть аккаунт? {}
                    <a href='/Login'>Войти</a>
                </p>
            </Form>
        </Container>
    )

}

export default Register
