const Checkbox = ({ label, defaultChecked = false }) => (
  <label className='relative inline-flex items-center cursor-pointer select-none'>
    <input
      type='checkbox'
      defaultChecked={defaultChecked}
      className='sr-only peer'
    />
    <div className='w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer-checked:border-0 peer-checked:bg-purple-blue-500'>
      <img
        src='https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png'
        alt='tick'
      />
    </div>
    <span className='ml-3 text-sm font-normal text-grey-900'>{label}</span>
  </label>
);

export default Checkbox;
