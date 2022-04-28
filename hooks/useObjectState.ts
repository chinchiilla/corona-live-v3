import { useState, SetStateAction } from "react";

export const useObjectState = <T>(initialValue: T): [T, (values: SetStateAction<any>, force?: boolean) => void] => {
    const [value, setValue] = useState<T>(initialValue);

    const setObjectValue = (values: SetStateAction<any>): void => {
        if (values == null) {
            setValue(values);
        } else {
            try {
                setValue((prev: any) => {
                    return { ...(prev || {}), ...values };
                });
            } catch (error) {
                setValue(values);
            }
        }
    };

    return [value, setObjectValue];
};
