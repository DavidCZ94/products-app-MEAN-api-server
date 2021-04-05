const boom = require('@hapi/boom');

function scopesValidationHamdler(allowedScopes) {
    return function (req, res, next) {
        if( !req.user || (req.user && !req.user.scopes) ){
            next(boom.unauthorized('Missing scopes'));
        }

        const hasAcces = allowedScopes
            .map(allowedScopes => req.user.scopes.includes(allowedScopes))
            .find(allowed => Boolean(allowed));
        if(hasAcces){
            next();
        }else{
            next(boom.unauthorized('Insufficient scopes'));
        }
    }
}

module.exports = scopesValidationHamdler;