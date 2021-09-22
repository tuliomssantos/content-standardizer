import { ServiceError } from '../error'
import { ComponentDataType } from '../types'
import { Either } from '../utils'

export interface IComponentsRepository {
	getComponent(id: string): Promise<Either<ServiceError, ComponentDataType>>
}
