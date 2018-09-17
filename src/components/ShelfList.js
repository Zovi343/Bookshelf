import React from 'react';
import { connect } from 'react-redux';

import ShelfListItem from './ShelfListItem';

export class shelfList extends React.Component {
    render () {
        return (
            <div className="shelf-list">
                <div className="box-h"><h3>Your Shelfs</h3></div>
                <ol>
                    {
                        this.props.shelfs.map((shelf) => <ShelfListItem key={shelf.id} id={shelf.id} name={shelf.name} history={this.props.history}/>)
                    }
                </ol>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    shelfs: state.shelfs
});

export default connect(mapStateToProps)(shelfList);
