import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './collections-overview.styles.scss';

import CollectionPreview from "../collection-preview/collection-preview.component";

import { selectCollectionForPreview } from '../../redux/shop/shop.selectors';

const CollectionOverview = ({collections}) => (
    <div className="collections-overview">
        {
            collections.map(({ id, ...other }) => (
                <CollectionPreview key={id} {...other}></CollectionPreview>
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionOverview);