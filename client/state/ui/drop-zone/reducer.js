/**
 * External dependencies
 */
import { combineReducersWithPersistence } from 'state/utils';

/**
 * Internal dependencies
 */
import {
	DROPZONE_SHOW,
	DROPZONE_HIDE
} from 'state/action-types';

import { createReducer } from 'state/utils';

// TODO(biskobe) - Can be improved with `keyedReducer` instead of state spread.
const isVisible = createReducer( {},
	{
		[ DROPZONE_SHOW ]: ( state, { dropZoneName } ) => ( {
			...state,
			[ dropZoneName ]: true,
		} ),
		[ DROPZONE_HIDE ]: ( state, { dropZoneName } ) => ( {
			...state,
			[ dropZoneName ]: false,
		} ),
	}
);

export default combineReducersWithPersistence( {
	isVisible,
} );
