import { Link } from "react-router-dom";

const FormFooter = () => (
  <>
    <p className='text-sm my-4 leading-relaxed text-gray-900'>
      Not registered yet?{" "}
      <Link to="/signup" className='font-bold text-gray-700'>
        Create an Account
      </Link>
    </p>
  </>
);

export default FormFooter;
