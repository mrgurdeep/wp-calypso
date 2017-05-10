/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { localize } from 'i18n-calypso';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import JetpackModuleToggle from 'my-sites/site-settings/jetpack-module-toggle';
import FormFieldset from 'components/forms/form-fieldset';
import FormSelect from 'components/forms/form-select';
import FormLabel from 'components/forms/form-label';
import CompactFormToggle from 'components/forms/form-toggle/compact';
import InfoPopover from 'components/info-popover';
import ExternalLink from 'components/external-link';
import {
	PLAN_JETPACK_BUSINESS,
	PLAN_JETPACK_BUSINESS_MONTHLY,
	PLAN_JETPACK_PREMIUM,
	PLAN_JETPACK_PREMIUM_MONTHLY,
} from 'lib/plans/constants';
import {
	isJetpackModuleActive,
	isJetpackModuleUnavailableInDevelopmentMode,
	isJetpackSiteInDevelopmentMode
} from 'state/selectors';
import { getSelectedSiteId } from 'state/ui/selectors';
import { getSitePlanSlug } from 'state/sites/selectors';
import { updateSettings } from 'state/jetpack/settings/actions';
import QueryJetpackConnection from 'components/data/query-jetpack-connection';

const MediaSettings = ( {
	fields,
	handleAutosavingToggle,
	onChangeField,
	isRequestingSettings,
	isSavingSettings,
	siteId,
	carouselActive,
	photonModuleUnavailable,
	selectedSiteId,
	translate
} ) => {
	const labelClassName = isSavingSettings || ! carouselActive ? 'is-disabled' : null;
	const isRequestingOrSaving = isRequestingSettings || isSavingSettings;

	return (
		<Card className="media-settings site-settings site-settings__module-settings">
			<QueryJetpackConnection siteId={ selectedSiteId } />

			<FormFieldset>
				<div className="media-settings__info-link-container site-settings__info-link-container">
					<InfoPopover position="left">
						<ExternalLink target="_blank" icon={ true } href="https://jetpack.com/support/photon" >
							{ translate( 'Learn more about Photon.' ) }
						</ExternalLink>
					</InfoPopover>
				</div>
				<JetpackModuleToggle
					siteId={ siteId }
					moduleSlug="photon"
					label={ translate( 'Speed up your images and photos with Photon' ) }
					description={ translate( 'Must be enabled to use tiled galleries.' ) }
					disabled={ isRequestingOrSaving || photonModuleUnavailable }
					/>
			</FormFieldset>

			<FormFieldset className="media-settings__formfieldset has-divider is-top-only">
				<div className="media-settings__info-link-container site-settings__info-link-container">
					<InfoPopover position="left">
						<ExternalLink target="_blank" icon={ true } href="https://jetpack.com/support/carousel" >
							{ translate( 'Learn more about Carousel.' ) }
						</ExternalLink>
					</InfoPopover>
				</div>
				<JetpackModuleToggle
					siteId={ siteId }
					moduleSlug="carousel"
					label={ translate( 'Transform standard image galleries into full-screen slideshows' ) }
					disabled={ isRequestingOrSaving }
					/>
				<div className="media-settings__module-settings site-settings__child-settings">
					<CompactFormToggle
						checked={ fields.carousel_display_exif || false }
						disabled={ isRequestingOrSaving || ! carouselActive }
						onChange={ handleAutosavingToggle( 'carousel_display_exif' ) } >
						{ translate( 'Show photo metadata in carousel, when available' ) }
					</CompactFormToggle>
					<FormLabel className={ labelClassName } htmlFor="carousel_background_color">
						{ translate( 'Background color' ) }
					</FormLabel>
					<FormSelect
						name="carousel_background_color"
						id="carousel_background_color"
						value={ fields.carousel_background_color || 'black' }
						onChange={ onChangeField( 'carousel_background_color' ) }
						disabled={ isRequestingOrSaving || ! carouselActive } >
						<option value="black" key="carousel_background_color_black">
							{ translate( 'Black' ) }
						</option>
						<option value="white" key="carousel_background_color_white">
							{ translate( 'White' ) }
						</option>
					</FormSelect>
				</div>
			</FormFieldset>

			<FormFieldset className="media-settings__formfieldset has-divider is-top-only">
				<div className="media-settings__info-link-container site-settings__info-link-container">
					<InfoPopover position="left">
						<ExternalLink target="_blank" icon href="https://jetpack.com/support/videopress/" >
							{ translate( 'Learn more about VideoPress.' ) }
						</ExternalLink>
					</InfoPopover>
				</div>
				<JetpackModuleToggle
					siteId={ siteId }
					moduleSlug="videopress"
					label={ translate( 'Fast, ad-free video hosting' ) }
					disabled={ isRequestingOrSaving }
				/>
			</FormFieldset>

		</Card>
	);
};

MediaSettings.propTypes = {
	carouselActive: PropTypes.bool.isRequired,
	isSavingSettings: PropTypes.bool,
	isRequestingSettings: PropTypes.bool,
	siteId: PropTypes.number.isRequired,
	handleAutosavingToggle: PropTypes.func.isRequired,
	onChangeField: PropTypes.func.isRequired,
	fields: PropTypes.object
};

export default connect(
	( state ) => {
		const selectedSiteId = getSelectedSiteId( state );
		const siteInDevMode = isJetpackSiteInDevelopmentMode( state, selectedSiteId );
		const sitePlanSlug = getSitePlanSlug( state, selectedSiteId );
		const moduleUnavailableInDevMode = isJetpackModuleUnavailableInDevelopmentMode( state, selectedSiteId, 'photon' );

		const isVideoPressAvailable = [
			PLAN_JETPACK_BUSINESS,
			PLAN_JETPACK_BUSINESS_MONTHLY,
			PLAN_JETPACK_PREMIUM,
			PLAN_JETPACK_PREMIUM_MONTHLY,
		].includes( sitePlanSlug );

		return {
			carouselActive: !! isJetpackModuleActive( state, selectedSiteId, 'carousel' ),
			isVideoPressAvailable,
			photonModuleUnavailable: siteInDevMode && moduleUnavailableInDevMode,
			selectedSiteId,
		};
	},
	{
		updateSettings
	}
)( localize( MediaSettings ) );
