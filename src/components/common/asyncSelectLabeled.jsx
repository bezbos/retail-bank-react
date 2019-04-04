import React, {Component} from 'react';
import AsyncSelect from 'react-select/lib/Async';

class AsyncSelectLabeled extends Component {
    render() {
        const {label, value, onChange, loadOptions, name, note, ...args} = this.props;

        return (
            <div className="form-group">
                <label>{label}</label>
                <AsyncSelect
                    value={value}
                    onChange={onChange}
                    loadOptions={loadOptions}
                    name={name}
                    {...args}
                />
                <small className="form-text text-muted">{note}</small>
            </div>
        );
    }
}

export default AsyncSelectLabeled;