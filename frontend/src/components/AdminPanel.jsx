import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import image from "../media-obr/image.png"

function AdminPanel() {

    const [applications, setApplications] = useState([])
    const [seach, setSeach] = useState("")

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



    return (
        <Container fluid="md">
            <Row>
                <Col md={12}>
                    <h1>Все заявки</h1>
                    <input
                        type="text"
                        placeholder='фильтрация'
                        value={seach}
                        onChange={(e) => setSeach(e.target.value)}
                    ></input>
                </Col>
            </Row>

            <Row>
                <Col md={12}>

                    {applications.filter((application) => {
                        if (!seach) return true;
                        return application.platform && application.platform.toLowerCase().includes(seach.toLowerCase())
                    })
                        .map((application, index) => {
                            return (
                                <Card style={{ margin: "10px" }} key={application.idapplications}>
                                    <Card.Img variant="top" src={image} id="imgCard" />
                                    <Card.Title>{application.platform}
                                    </Card.Title>
                                    <Card.Text as="div">
                                        <div data-testid="admin-row"><strong>Дата:</strong>{application.date}</div>
                                        <div data-testid="admin-row"><strong>Оплата:</strong>{application.payment}</div>
                                        <div data-testid="admin-row"><strong>Статус:</strong>{
                                            <Form.Control as="select" data-testid="admin-status" defaultValue={"application.status"} onChange={(e) => {
                                                console.log(application.idapplications);
                                                fetch(`http://localhost:3000/applications/${application.idapplications}`, {
                                                    method: "PUT",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify({ status: e.target.value }),
                                                });

                                                // console.log(application);
                                                // console.log("Добавлена");
                                                // navigate("/A")

                                            }
                                            } >
                                                <option value={""}>{application.status}</option>
                                                <option value={"Мероприятие назначено"}>Мероприятие назначено</option>
                                                <option value={"Завершено"}>Завершено</option>
                                            </Form.Control>


                                        }</div>
                                        <div data-testid="admin-row"><strong>Отзыв:</strong>{application.rewiest || "НЕТ ОТЗЫВА"} </div>
                                    </Card.Text>
                                </Card>


                            )
                        }
                        )}
                </Col>
            </Row>

            <a href='/Login'>Назад</a>



        </Container >
    )

}

export default AdminPanel


