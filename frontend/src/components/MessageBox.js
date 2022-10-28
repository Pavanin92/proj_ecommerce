import { Alert } from 'bootstrap';

export default function MessageBox(props) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
}
