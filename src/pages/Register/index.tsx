/* eslint-disable react/jsx-props-no-spreading */
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Container, FormContainer, InputGroup } from './styles';

interface Inputs {
  name: string;
  photoUrl: string;
  email: string;
  password: string;
}

export const Register = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <FormContainer>
        <header className="header">
          <h2 className="title">Register</h2>
          <p className="description">
            Already have an account? <Link to="/login">Sign In!</Link>
          </p>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <input
              type="text"
              placeholder="Type your name"
              {...register('name')}
            />
          </InputGroup>
          <InputGroup>
            <input
              type="text"
              placeholder="Enter Photo Image Url..."
              {...register('photoUrl')}
            />
          </InputGroup>
          <InputGroup>
            <input
              type="text"
              placeholder="Enter an email..."
              {...register('email')}
            />
          </InputGroup>
          <InputGroup>
            <input
              type="text"
              placeholder="Enter a password"
              {...register('password')}
            />
          </InputGroup>
          <button type="submit">Register</button>
        </form>
      </FormContainer>
    </Container>
  );
};
