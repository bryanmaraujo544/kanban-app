import { Container } from './styles';

interface TaskProps {
  id: string;
  content: string;
  label: string;
}

export function Task({ id, content, label }: TaskProps) {
  console.log(id, label);
  return (
    <Container label={label}>
      <p>{content}</p>
      <div className="footer">
        <div className="tag" />
      </div>
    </Container>
  );
}
