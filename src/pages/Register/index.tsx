/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/utils/ApiClient';
import { Container, FormContainer, InputGroup } from './styles';

interface Inputs {
  name: string;
  photoUrl: string;
  email: string;
  password: string;
}

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    photoUrl,
    email,
    password,
  }) => {
    setIsLoading(true);
    const noPhotoUrl = 'https://i.stack.imgur.com/l60Hf.png';
    const { data } = await api.post('/auth/register', {
      name,
      profileImageUrl: photoUrl || noPhotoUrl,
      email,
      password,
    });
    setIsLoading(false);

    if (!data.user) {
      toast.error(data.message);
      return;
    }
    navigate('/login');
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
              placeholder="Name... *"
              {...register('name', { required: true, maxLength: 128 })}
            />
            {errors.name && <span>This field is required</span>}
          </InputGroup>
          <InputGroup>
            <input
              type="text"
              placeholder="Profile Image Url..."
              {...register('photoUrl')}
            />
          </InputGroup>
          <InputGroup>
            <input
              type="email"
              placeholder="Email... *"
              {...register('email', { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </InputGroup>
          <InputGroup>
            <input
              type="password"
              placeholder="Password... *"
              {...register('password', { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </InputGroup>
          <button type="submit" disabled={isLoading}>
            Register
          </button>
        </form>
      </FormContainer>
    </Container>
  );
};
