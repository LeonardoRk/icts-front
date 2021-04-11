import { Component } from 'react'
import './tableHeader.css';

class TableHeader extends Component {

    render() {
        return (
            <thead>
                <tr>
                    {this.props.fields.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;