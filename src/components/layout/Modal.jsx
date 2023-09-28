import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './Modal.module.css';

// function with object destructuring --> {children} = props.children
function Modal({ children }) {
  const navigate = useNavigate();
  function closeHandler() {
    // can also be achieved by using '..' to go back to the parent route
    navigate('/');
  }
  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open className={`${classes.modal} py-3 px-3 text-white bg-dark`}>
            {children}
      </dialog>
    </>
  );
}

export default Modal;