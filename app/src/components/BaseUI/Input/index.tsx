import React, { forwardRef, createRef } from 'react';

// type InputElement = HTMLInputElement;
// type InputChangeEvent = React.ChangeEvent<InputElement>;

// interface Props {
//   id?: string;
//   style?: { [key: string]: string | number | undefined };
//   name?: string;
//   for?: string;
//   label?: string;
//   type?: string;
//   value?: any;
//   autoComplete?: string;
//   error?: boolean;
//   helperText?: string | boolean;
//   placeholder?: string;
//   autoFocus?: boolean;
//   onBlur?: Function;
//   onChange?: Function;
// }

type Props = any;

export default function InputField(props: Props) {
  // const defaultProps: Props = {
  //   id: props.name,
  //   for: props.name,
  //   type: 'text',
  //   autoComplete: '',
  //   value: '',
  //   name: '',
  //   label: '',
  //   ...props,
  // };

  // const labelAttribs = {

  // };

  // const inputAttribs = {
  //   id: defaultProps.id,
  //   name: defaultProps.name,
  //   for: defaultProps.for,
  //   type: defaultProps.type,
  //   helperText: defaultProps.helperText,
  //   placeholder: defaultProps.placeholder,
  // };

  return (
    <>
      {/* { defaultProps.label === '' ? <label>label</label> : null } */}
      {/* <input { ...inputAttribs }/> */}
      <input type="text" />
    </>
  );
}
