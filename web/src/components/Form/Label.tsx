// react
import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: string,
}
export default function Label(props: LabelProps) {
    return (
        <label
            {...props}
            className='font-semibold'>
            {props.children}
        </label>
    );
}