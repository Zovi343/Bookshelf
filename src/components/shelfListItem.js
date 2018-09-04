import React from 'react';
import { history } from '../routes/appRouter';

class ShelfListItem extends React.Component {
    onClick = () => {   
        history.push(`/shelf/${this.props.id}`);
    };
    render () {
        return (
            <li>
                <button onClick={this.onClick}>
                    {this.props.name}
                </button>
            </li>
        );
    };
};

export default ShelfListItem;