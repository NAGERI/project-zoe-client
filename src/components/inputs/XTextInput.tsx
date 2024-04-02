import * as React from 'react';
import { useField } from 'formik';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { hasValue } from './inputHelpers';

interface IProps {
  name: string;
  isHidden?: boolean;
}

const XTextInput = ({
  name,
  isHidden = false,
  margin = 'normal',
  ...props
}: TextFieldProps & IProps) => {
  const [field, meta, helpers] = useField({ name });

  const [value, setValue] = React.useState(field.value || ''); // Store the value in state
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (field.value !== value) {
      setValue(field.value || '');
    }
  }, [field.value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    helpers.setValue(newValue); // Update Formik's field value
  };

  const error = hasValue(meta.error) ? meta.error : undefined;
  const showError = Boolean(error && meta.touched);
  if (isHidden) {
    return <input type="hidden" name={field.name} value={field.value} onChange={field.onChange} />;
  }  
  return (
    <TextField
      {...field}
      {...props}
      margin={margin}
      fullWidth
      error={showError}
      helperText={showError && error}
      value={value}
      onChange={handleChange}
      inputRef={inputRef}
      autoComplete="nope"
    />
  );
};

export default XTextInput;
