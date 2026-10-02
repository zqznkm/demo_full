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
        <Container >
            <h1>Отправить заявку</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Конференция</Form.Label>
                    <Form.Control as="select" defaultValue={""} required onChange={(e) => setPlatform(e.target.value)} >
                        <option value={""}>выберите конференцию</option>
                        <option value={"аудитория"}>аудитория</option>
                        <option value={"коворкинг"}>коворкинг</option>
                        <option value={"кинозал"}>кинозал</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Дата</Form.Label>
                    <Form.Control type="date" placeholder="Дата" required onChange={(e) => setDate(e.target.value)} data-testid="reg-password" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Оплата</Form.Label>
                    <Form.Control as="select" defaultValue={""} required onChange={(e) => setPayment(e.target.value)} >
                        <option value={""}>выберите оплату</option>
                        <option value={"при очном посещении"}>при очном посещении</option>
                        <option value={"переводом по системе СБП"}>переводом по системе СБП.</option>
                    </Form.Control>
                </Form.Group>


                <Button variant="primary" type="submit" data-testid="reg-submit"> Отправить</Button>

                <a href='/Applications'>Назад</a>

            </Form>
        </Container>
    )

}

export default ApplicationsForm
