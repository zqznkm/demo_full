import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ApplicationsForm() {

    const [platform, setPlatform] = useState("")
    const [date, setDate] = useState("")
    const [payment, setPayment] = useState("")

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

        const application = {
            id: localStorage.getItem("idusers"),
            platform,
            date,
            payment
        }
        console.log(application);

        // 8(999)999-99-99
        try {
            const response = await fetch("http://localhost:3000/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(application),
            });

            const result = await response.json()

            console.log(result);
            // console.log("Добавлена");
            // navigate("/A")

        } catch (error) {
            console.error(error);
        }

    }


    return (
        <Container>

            <h1>Отправить заявку</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Помещение</Form.Label>
                    <Form.Control as="select" defaultValue={""} required onChange={(e) => setPlatform(e.target.value)} data
                        testid="req-room">
                        <option value={""}>выберите помещение</option>
                        <option value={"Аудитория"}>Аудитория</option>
                        <option value={"Коворкинг"}>Коворкинг</option>
                        <option value={"Кинозал"}>Кинозал</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Дата</Form.Label>
                    <Form.Control type="date"  data-testid="req-date" placeholder="Дата" required onChange={(e) => setDate(e.target.value)} data-testid="reg-password" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Оплата</Form.Label>
                    <Form.Control as="select"  data-testid="req-payment" defaultValue={""} required onChange={(e) => setPayment(e.target.value)} >
                        <option value={""}>выберите оплату</option>
                        <option value={"При очном посещении"}>При очном посещении</option>
                        <option value={"Переводом по системе СБП"}>Переводом по системе СБП.</option>
                    </Form.Control>
                </Form.Group>


                <Button variant="primary" data-testid="req-submit"  type="submit" data-testid="reg-submit"> Отправить</Button>

                <a href='/Applications'>Назад</a>

            </Form>


        </Container>
    )

}

export default ApplicationsForm
