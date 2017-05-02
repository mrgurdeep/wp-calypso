/**
 * External dependencies
 */
import { combineReducersWithPersistence } from 'state/utils';

/**
 * Internal dependencies
 */
import {
	NPS_SURVEY_DIALOG_IS_SHOWING,
} from 'state/action-types';
import { createReducer } from 'state/utils';

export const isNpsSurveyDialogShowing = createReducer( false, {
	[ NPS_SURVEY_DIALOG_IS_SHOWING ]: ( state, { isShowing } ) =>
		isShowing !== undefined ? isShowing : state,
} );

export default combineReducersWithPersistence( {
	isNpsSurveyDialogShowing,
} );
