const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
export const auth = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://hardfork.eu.auth0.com/.well-known/jwks.json`,
    }),

    // Validate the audience and the issuer.
    audience: 'https://api.todo.hardfork.io',
    issuer: [`https://hardfork.eu.auth0.com/`],
    algorithms: ['RS256'],
})
