import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Table, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Applications() {

    const [applications, setApplications] = useState([])

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
                <Col sm={12}>

                    <h1>Ваши заявки</h1>

                    <Table striped bordered hover data-testid="req
list">
                        <thead>
                            <tr>
                                <th>Конференция</th>
                                <th>Дата</th>
                                <th>Оптала</th>
                                <th>Статус</th>
                                <th>Отзыв</th>
                            </tr>
                        </thead>
                        <tbody>

                            {applications.map((application, index) => {
                                return application.idusers === JSON.parse(localStorage.getItem("idusers")) ? (
                                    <tr key={application.idapplications}>
                                        <td>{application.platform}</td>
                                        <td>{application.date}</td>
                                        <td>{application.payment}</td>
                                        <td>{application.status}</td>
                                        <td>{application.rewiest || <textarea data-testid="req-review"></textarea> }</td>
                                    </tr>
                                ) : null
                            })
                            }
                        </tbody>
                    </Table>


                    <Button variant="primary" href='/ApplicationsForm'> Отправить заявку</Button>

                    <a href='/Login'>Назад</a>
                </Col>

                <Col>

                </Col>
            </Row>

        </Container>
    )

}

export default Applications
