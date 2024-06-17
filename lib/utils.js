export function getParameterFromUrl(url, parameterName) {
    const urlParts = url.split('/');
    const paramIndex = urlParts.indexOf(parameterName);
    if (paramIndex !== -1 && paramIndex + 1 < urlParts.length) {
        return urlParts[paramIndex + 1];
    }
    return null;
}
