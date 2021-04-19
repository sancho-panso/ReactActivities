import React from 'react'
import {FieldRenderProps} from 'react-final-form';
import {Form, FormFieldProps, Label} from 'semantic-ui-react';
import {TimeInput} from 'react-widgets'

interface IProps extends FieldRenderProps<Date>, FormFieldProps{}

const DateInput:React.FC<IProps> = ({
    input,
    width,
    time=false,
    date=false,
    placeholder,
    meta:{ touched, error},
    id,
    ...rest
})=> {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <TimeInput
                placeholder={placeholder}
                value={input.value || null}
                onChange={input.onChange}
                {...rest}
            />
            {touched && error && (<Label basic color='red'>{error}</Label>)}
        </Form.Field>
    )
}

export default DateInput


