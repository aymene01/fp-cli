export const SUCCESS = {
  STATUS: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
  },
}

export const ERROR = {
  STATUS: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  },
  AUTHORIZATION: {
    FORBIDDEN: 'You must be logged in to query this schema',
    TOKEN: {
      INVALID: 'The json web token must have a valid signature',
      UUID: 'The json has a invalid user identifier',
    },
  },
  VALIDATION: {
    USER: {
      WRONG: 'Sorry some informations are not good',
      EMAIL: {
        NOT_VALID: 'The email must have a valid format',
        NOT_EXIST: "The email doesn't exist",
      },
      PASSWORD: {
        HASH: "The server can't generate password hash",
        MISMATCH: 'The password and password confirmation mismatch',
        ONE_CAPITAL: 'The password must have at least one capital letter',
        ONE_NUMBER: 'The password must have at least one capital letter',
        MIN_LENGTH: (max: number): string => `The password must have at least ${max} characters`,
        NOT_VALID: 'The password is not valid',
      },
    },
    AUTHOR: {
      NOT_EXIST: "The author doesn't exist",
    },
    CHANNEL: {
      NOT_EXIST: "The channel doesn't exist",
    },
  },
  QUERY_ENGINE: {
    P2002: (meta: { target: string[] }): string =>
      `The ${meta.target.join(',')} already exist${meta.target.length < 1 ? 's' : ''}`,
  },
}
