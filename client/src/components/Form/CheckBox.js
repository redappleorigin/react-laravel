import React from 'react';

import { Label } from './';

const CheckBoxWrapper = ({ children, ...wrapper_props }) => (
    <div class="checkbox" { ...wrapper_props }>
        { children }
    </div>
);

const CheckBox = ({ label, wrapper, ...checkbox_props }) => {
    const checkbox = (
        <input
            type="checkbox"
            { ...checkbox_props }
        />
    );

    const label_props = (label && label.props) || {};
    const wrapper_props = (wrapper && wrapper.props) || {};

    // console.log('okay');
    //
    // return null;

    if (!!label) {
        return (
            <CheckBoxWrapper { ...wrapper_props }>
                <Label { ...label_props }>
                    { checkbox }
                    { label.value }
                </Label>
            </CheckBoxWrapper>
        );
    }

    return (
        <CheckBoxWrapper { ...wrapper_props }>
            { checkbox }
        </CheckBoxWrapper>
    );
};

export default CheckBox;
