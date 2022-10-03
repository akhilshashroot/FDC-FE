
var url ="";
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = 'https://docsdev.fdcservers.net/server'
  } else {
    url = 'https://docsdev.fdcservers.net/server'
  }

export const BACKEND_URL = url 