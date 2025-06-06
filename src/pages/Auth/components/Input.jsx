const Input = ({ id, type = "text",name, label, placeholder, value, onChange }) => (
  <div className='mb-7'>
    <label htmlFor={id} className='mb-2 block text-sm text-start text-gray-900'>
      {label}
    </label>
    <input
      id={id}
      value={value}
            onChange={onChange}
            name={name}
      type={type}
      placeholder={placeholder}
      className='flex items-center w-full px-5 py-4 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-grey-700 bg-gray-200 text-dark-gray-900 rounded-2xl'
    />
  </div>
);

export default Input;
