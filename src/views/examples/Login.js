import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios.js';
import { baseUrl } from '../../baseUrl';
// Import necessary components from reactstrap
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col , Spinner , Alert} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../../AuthenticationProvider';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [responseAlert , setResponseAlert] = useState('')
  const [showAlert , setShowAlert] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, hasRole , revalidateAuth , setRevalidateAuth} = useAuth();


  useEffect(()=>{
    if(showAlert){
      setTimeout(()=>{
        setShowAlert(false)
        setShowAlert('')
      } , 3000)
    }
  } , [showAlert])

  const isValidEmail = (value) => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('')

    if (!isValidEmail(email)) {
      setError('Invalid email format');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('user/login',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      setLoading(false);

      console.log(response)
      if (response?.data?.status === true) {
        console.log('User Logged in', response?.data);
        
        localStorage.setItem('jwt' , response?.data?.jwt_token)
        navigate('/admin/*')
        setRevalidateAuth(!revalidateAuth)
        // Do something on successful login
      }

      if(response?.data?.status == false){
        setShowAlert(true);
        setResponseAlert(response?.data?.message)
      }
    } catch (error) {
      setLoading(false);
      console.log(error);

      // Handle specific error cases and set appropriate error message
      if (error?.response?.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-2">
          <div className="text-muted text-center mt-2 mb-3">
            <LockIcon style={{fontSize : "2.5rem" , color : '#5e72e4'}} />
            </div>
            <div className="text-muted text-center mt-2 mb-3">
              <large>Sign In </large>
            </div>
            
            {
            showAlert && (
              <Alert color="danger">
                {responseAlert}
            </Alert>
            )
          }
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => {setError('') ;setEmail(e.target.value)}}
                  />
                </InputGroup>
                {error && <div className="text-danger">{error}</div>}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {setError('') ; setPassword(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id="customCheckLogin"
                  type="checkbox"
                />
              </div>
              <div className="text-center">
                {loading ? (
                  <Spinner color="primary" />
                ) : (
                  <Button className="my-4" color="primary" type="button" onClick={handleLogin}>
                    Sign in
                  </Button>
                )}
              </div>
            </Form>
          </CardBody>
          
        </Card>
        {/* <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
              <small>Create new account</small>
            </a>
          </Col>
        </Row> */}
      </Col>
    </>
  );
};

export default Login;
