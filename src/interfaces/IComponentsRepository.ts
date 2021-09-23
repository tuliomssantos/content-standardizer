import { ServiceError } from '../error'
import { ComponentDataType, CosmicContentRequest } from '../types'
import { Either } from '../utils'

export interface IComponentsRepository {
  getComponent({
    id,
    bucket,
    readKey,
  }: CosmicContentRequest): Promise<Either<ServiceError, ComponentDataType>>
}
