export class ServiceError extends Error {
  constructor(status: number, message: string) {
    super(message)

    switch (status) {
      case 400: {
        this.name = 'BadRequest'
        break
      }
      case 401: {
        this.name = 'Unauthorized'
        break
      }
      case 402: {
        this.name = 'PaymentRequired'
        break
      }
      case 403: {
        this.name = 'Forbidden'
        break
      }
      case 404: {
        this.name = 'NotFound'
        break
      }
      case 429: {
        this.name = 'TooManyRequests'
        break
      }
      default: {
        this.name = 'CosmicInternalServerError'
      }
    }
  }
}
