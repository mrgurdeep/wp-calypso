/**
 * External dependencies
 */
import { expect } from 'chai';
import { spy } from 'sinon';

/**
 * Internal dependencies
 */
import { http } from 'state/data-layer/wpcom-http/actions';
import {
	requestEmailVerification,
} from '../';
import {
	EMAIL_VERIFY_REQUEST_SUCCESS,
	EMAIL_VERIFY_REQUEST_FAILURE,
} from 'state/action-types';

describe( 'send-email-verification', () => {
	describe( '#requestEmailVerification', () => {
		const dispatchSpy = spy();
		const nextSpy = spy();
		const dummyAction = { type: 'DUMMY' };

		requestEmailVerification( { dispatch: dispatchSpy }, dummyAction, nextSpy );

		it( 'should dispatch HTTP request to plans endpoint', () => {
			expect( dispatchSpy ).to.have.been.calledOnce;
			expect( dispatchSpy ).to.have.been.calledWith( http( {
				apiVersion: '1.1',
				method: 'POST',
				path: '/me/send-verification-email',
				onSuccess: { type: EMAIL_VERIFY_REQUEST_SUCCESS },
				onFailure: { type: EMAIL_VERIFY_REQUEST_FAILURE }
			} ) );
		} );

		it( 'should pass the original action along the middleware chain', () => {
			expect( nextSpy ).to.have.been.calledOnce;
			expect( nextSpy ).to.have.been.calledWith( dummyAction );
		} );
	} );
} );
