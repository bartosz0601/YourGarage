import React from 'react';
import { useField } from 'formik';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
    disabled?: boolean;
    onChange?: Function;
}

export default function MySelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select 
                search
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(e, d) => {
                    helpers.setValue(d.value);
                    if (props.onChange) {
                        props.onChange(d.value);
                    }
                }}  // E - event, d - data DropDownProps. 
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
                disabled={props.disabled}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}