// https://stackoverflow.com/questions/6320113/how-to-prevent-form-resubmission-when-page-is-refreshed-f5-ctrlr
// When forms are submitted to avoid double entry on refresh or going back
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}
