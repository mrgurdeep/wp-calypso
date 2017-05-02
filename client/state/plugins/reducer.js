/**
 * External dependencies
 */
import { combineReducersWithPersistence } from 'state/utils';

/**
 * Internal dependencies
 */
import wporg from './wporg/reducer';
import premium from './premium/reducer';
import installed from './installed/reducer';

export default combineReducersWithPersistence( {
	wporg,
	premium,
	installed
} );
