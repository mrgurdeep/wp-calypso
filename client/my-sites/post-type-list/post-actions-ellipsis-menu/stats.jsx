/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import PopoverMenuItem from 'components/popover/menu-item';
import { getSiteSlug } from 'state/sites/selectors';
import { getPost } from 'state/posts/selectors';

function PostActionsEllipsisMenuStats( { translate, siteSlug, postId, status, isStatsActive } ) {
	if ( ! isStatsActive || 'publish' !== status ) {
		return null;
	}

	return (
		<PopoverMenuItem href={ `/stats/post/${ postId }/${ siteSlug }` } icon="stats-alt">
			{ translate( 'Stats' ) }
		</PopoverMenuItem>
	);
}

PostActionsEllipsisMenuStats.propTypes = {
	globalId: PropTypes.string,
	translate: PropTypes.func.isRequired,
	siteSlug: PropTypes.number,
	postId: PropTypes.number,
	status: PropTypes.string,
	isStatsActive: PropTypes.bool
};

export default connect( ( state, ownProps ) => {
	const post = getPost( state, ownProps.globalId );
	if ( ! post ) {
		return {};
	}

	return {
		siteSlug: getSiteSlug( state, post.site_ID ),
		postId: post.ID,
		status: post.status,
		isStatsActive: true // [TODO]: This should be made accurate by detecting active status of Jetpack "stats" module
	};
} )( localize( PostActionsEllipsisMenuStats ) );
