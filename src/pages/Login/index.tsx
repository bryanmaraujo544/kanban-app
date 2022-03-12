/* eslint-disable react/jsx-props-no-spreading */
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Container, FormContainer, InputGroup } from './styles';

interface Inputs {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
              placeholder="type your name"
              {...register('email')}
            />
          </InputGroup>
          <InputGroup>
            <input
              type="text"
              placeholder="type your name"
              {...register('password')}
            />
          </InputGroup>

          <button type="submit">Login</button>
        </form>
      </FormContainer>
    </Container>
  );
};
