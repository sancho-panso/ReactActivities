import React from 'react'
import {FieldRenderProps} from 'react-final-form';
import {Form, FormFieldProps, Label} from 'semantic-ui-react';
import {DatePicker} from 'react-widgets'

interface IProps extends FieldRenderProps<Date>, FormFieldProps{}

const DateInput:React.FC<IProps> = ({
    input,
    width,
    placeholder,
    meta:{ touched, error},
    id,
    ...rest
})=> {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <DatePicker
                placeholder={placeholder}
                value={input.value || null}
                onChange={input.onChange}
                onBlur={input.onBlur}
                {...rest}
            />
            {touched && error && (<Label basic color='red'>{error}</Label>)}
        </Form.Field>
    )
}

export default DateInput
