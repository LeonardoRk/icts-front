import { Component } from 'react'
import './tableBody.css';
import Options  from '../Options'

class TableBody extends Component {

    setYesNo(index) {
        this.props.setYesNoVisible(index);
    }

    openInfo() {

    }

    render() {
        return (
            <tbody>
                {this.props.items.map((item, index) => (
                    <tr key={index} >
                        <td>{item.id}</td>
                        <td className="hover" onClick={alert}>{item.nome}</td>
                        <td>
                            <Options index={index} setYesNo={this.setYesNo.bind(this)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableBody;