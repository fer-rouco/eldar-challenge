import { useEffect, useState } from "react";

export default function InputField({ type, model, attr, value, label, onChange }) {
  // const [value, setValue] = useState('');

  // const onValueChange = () => {
  //   onChange();
  //   setValue(model[attr]);
  // };

  // useEffect(() => {
  //   if (attr) {
  //     setValue(model[attr]);
  //   }
  //   // return () => {
  //   //   setValue({});
  //   // };
  // }, [model, attr]);

  return (
    <div className='mb-3' >
      <label htmlFor={attr} className='form-label' >{label}</label>
      <input type={type} id={attr} className='form-control' value={value} onChange={onChange} ></input>
    </div>
  );
}
