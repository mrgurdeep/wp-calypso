/**
 * External dependencies
 */
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';
import config from 'config';

class AccountRecoveryErrorMessage extends Component {
	getErrorMessage = () => {
		const {
			translate,
			error,
		} = this.props;

		switch ( error.name ) {
			case 'RestInvalidKeyError':
				return translate( "We've failed to validate with the given code. " +
					'Please double check if the code is correct.' );

			// The error messages from our backend are quite descriptive in this case. e.g.
			// "You've recently used this password", "Password must be at least 6 characeters.", etc.
			// Thus I'm using it directly here.
			case 'RestBadPasswordError':
				return error.message;
		}

		return translate(
			"We're having trouble connecting to our servers at the moment. " +
			'Please try again later. If the problem persists, please {{a}}contact us{{/a}}.',
			{ components: {
				a: <a href={ config( 'login_url' ) + '?action=recovery' } target="_blank" rel="noopener noreferrer" />
			} }
		);
	}

	render = () => {
		const errorMsg = this.getErrorMessage();

		return <p className="account-recovery-error-message__text">{ errorMsg }</p>;
	}
}

export default localize( AccountRecoveryErrorMessage );
