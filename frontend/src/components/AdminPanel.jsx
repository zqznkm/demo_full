import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminPAnel() {

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

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Помещение <input type="text"
                                    placeholder="поиск...." 
                                    value={seach}
                                    onChange={(e)=>{setSeach(e.target.value)}}
                                    >
                                </input></th>
                                <th>Дата</th>
                                <th>Оптала</th>
                                <th>Статус</th>
                                <th>Отзыв</th>
                            </tr>
                        </thead>
                        <tbody>

                            {applications.filter((application)=>{
                                if(!seach) return true;
                                return application.platform && application.platform.toLowerCase().includes(seach.toLowerCase())
                            })
                            .map((application, index) => {
                                return (
                                    <tr key={application.idapplications}>
                                        <td data-testid="admin-row">{application.platform}</td>
                                        <td data-testid="admin-row">{application.date}</td>
                                        <td data-testid="admin-row">{application.payment}</td>
                                        <td data-testid="admin-row">{
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


                                        }</td>
                                        <td data-testid="admin-row">{application.rewiest || "НЕТ ОТЗЫВА"} </td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </Table>


                    {/* <Button variant="primary" href='/ApplicationsForm'> Отправить заявку</Button> */}

                    <a href='/Login'>Назад</a>
                </Col>
                <Col>
                </Col>
            </Row>


        </Container>
    )

}

export default AdminPAnel
