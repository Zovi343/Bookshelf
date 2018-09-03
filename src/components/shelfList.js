import React from 'react';
import { connect } from 'react-redux';


export class shelfList extends React.Component {
    render () {
        return (
            <div>
                <h3>Your Shelfs:</h3>
                <ol>
                    {
                        this.props.shelfs.map((shelf) => <li key={shelf.id}>{shelf.name}</li>)
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
