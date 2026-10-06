import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import image from "../media-obr/image.png"

function Applications() {

    const [applications, setApplications] = useState([])
    const [rewiest, setRewiest] = useState({})


    const [error, setError] = useState("")
    const navigate = useNavigate()


    useEffect(() => {
        fetch("http://localhost:3000/applications")
            .then(res => res.json())
            .then(data => setApplications(data.application))
            .catch((err) => {
                console.log(err);
            })
    }, [])

    console.log(applications);
    // console.log(data.application);



    return (
        <Container fluid="md">

            <Row>
                <Col sm={12}>
                    <h1>Ваши заявки</h1>
                </Col>
            </Row>

            <Row>
                <Col sm={12}>
                    {applications.map((application) => {
                        return application.idusers == JSON.parse(localStorage.getItem("idusers")) ? (
                            <Card id='card' key={application.idapplications}>
                                <Card.Img variant="top" src={image} id="imgCard"/>
                                <Card.Title>{application.platform}</Card.Title>
                                <Card.Text as="div">
                                    <div><strong>Дата:</strong>{application.date}</div>
                                    <div><strong>Оплата:</strong>{application.payment} </div>
                                    <div><strong>Статус:</strong>{application.status}</div>
                                    <div><strong>Отзыв:</strong>
                                    {application.rewiest ? (application.rewiest) : <textarea data-testid="req-review"
                                        disabled={application.status !== "Завершено"}
                                        placeholder={application.status == "Завершено" ? ("Оставьте свой отзыв") : ("Оставить отзыв можно только после завершения мероприятия")}
                                        onBlur={(e) => {
                                            if (!e.target.value.trim()) return;

                                            fetch("http://localhost:3000/rewiest", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    idapplications: application.idapplications,
                                                    // idusers: localStorage.getItem("idusers"),
                                                    rewiest: e.target.value
                                                }),
                                            });

                                        }}
                                    >
                                    </textarea>}</div>
                                    <div><Button onClick={() => {
                                        fetch(`http://localhost:3000/applications/${application.idapplications}`,
                                            { method: "DELETE" })

                                    }}>Удалить завку</Button></div>
                                </Card.Text>





                            </Card>

                        ) : null
                    })
                    }

                </Col>
            </Row>


            <Button variant="primary" href='/ApplicationsForm'> Отправить заявку</Button>

            <a href='/Login'>Назад</a>



        </Container>
    )

}

export default Applications
