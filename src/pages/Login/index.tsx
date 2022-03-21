/* eslint-disable react/jsx-props-no-spreading */
// import jwtDecode from 'jwt-decode';
import { setCookie } from 'nookies';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/utils/ApiClient';
import { Container, FormContainer, InputGroup } from './styles';

interface Inputs {
  email: string;
  password: string;
}

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const { data } = await api.post('/auth/login', { email, password });
      setIsLoading(false);

      if (!data.token) {
        toast.error(data.message);
        return;
      }

      setCookie(null, 'token', data.token);

      // const userDecoded: any = jwtDecode(data.token as any);
      navigate(`/`);
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err.response.data.message);
    }
  };
  return (
    <Container>
      <FormContainer>
        <header className="header">
          <h2 className="title">Login</h2>
          <p className="description">
            Do not you have an account? <Link to="/register">Sign Up!</Link>
          </p>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <input
              type="text"
              placeholder="Email..."
              {...register('email', { required: true })}
            />
            {errors.email && <span>Field required</span>}
          </InputGroup>
          <InputGroup>
            <input
              type="password"
              placeholder="Passoword..."
              {...register('password', { required: true })}
            />
            {errors.password && <span>Field required</span>}
          </InputGroup>

          <button type="submit" disabled={isLoading}>
            Login
          </button>
        </form>
      </FormContainer>
    </Container>
  );
};
