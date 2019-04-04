/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

import React, {Component} from 'react';
import {firstToLowerCase, removeWhitespace} from '../../utils/strings';

/**
 * @description An input component that contains the <code>&#60;input&#62;</code>, <code>&#60;label&#62;</code> and <code>&#60;small&#62;</code> elements wrapped with a <code>&#60;div class="form-group"&#62;</code> element.
 * @property value - Value in the input box.
 * @property label - Used as the <code>&#60;label&#62;</code> text and for <code>&#60;input&#62;</code> <code>name</code> and <code>id</code> properties. Also used to construct the default <code>placeholder</code> property text.
 * @property onChange - Event handler for when the value inside the <code>&#60;input&#62;</code> element is changed.
 * @property placeholder - Placeholder text. By default a placeholder text is constructed by using the <code>label</code> prop value.
 * @property note - Small text under the input field. Empty by default.
 * @property args - Any additional prop arguments passed to this component.
 */
class Input extends Component {
    render() {
        const {value, label, name, onChange, placeholder, note, error, ...args} = this.props;

        // We make the first character lower case and remove all whitespace.
        const propName = removeWhitespace(
            firstToLowerCase(label)
        );

        return (
            <div className="form-group">
                <label htmlFor={name || (propName + 'Input')}>{label}</label>
                <input value={value}
                       onChange={onChange}
                       id={name || (propName + 'Input')}
                       name={name || propName}
                       placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
                       className="form-control"
                       {...args}
                />
                <small className="form-text text-muted">{note}</small>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        );
    }
}

export default Input;