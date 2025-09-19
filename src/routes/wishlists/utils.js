export function validateWishlistForm(formInput) {
    let errorMesssage = null;
    let isValid = true;

    if (formInput.country_code.toUpperCase() === 'UK') {
        formInput.country_code = 'GB';
    }

    const locale = `${formInput.language_code}-${formInput.country_code}`;
    const isLocaleValid = Intl.DateTimeFormat.supportedLocalesOf(locale).length > 0;

    if (!isLocaleValid) {
        isValid = false;
        errorMesssage = `Country and language combination is not valid: ${locale}. It needs to be a valid locale.`
    }

    const emailRegex = "^[0-9a-z]+(?:[.][0-9a-z]+)*@[a-z0-9]{2,}(?:[.][a-z]{2,})+$";
    const isEmailValid = formInput.email.match(emailRegex);
    if (!isEmailValid) {
        isValid = false;
        errorMesssage = `Email address is not valid: ${formInput.email}.`
    }

    return [isValid, formInput, errorMesssage];
}