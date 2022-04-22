import { useContext } from "react"
import { Form, Col, Row, Button } from "react-bootstrap"
import PlacesContext from "../utils/PlacesContext"

function ForgotPassword() {
  const { forgotPassword } = useContext(PlacesContext)

  return (
    <div className="ms-4">
      <h1>Forgot Password</h1>
      <Form className="mt-5" onSubmit={forgotPassword}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md="2">
            Email
          </Form.Label>
          <Col md="6">
            <Form.Control type="email" name="email" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="my-4">
          <Col md={{ span: 10, offset: 2 }}>
            <Button type="submit">Send Reset Password link</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ForgotPassword
