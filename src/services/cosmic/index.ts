import { ComponentDataType, CosmicComponent, CosmicObject } from '../../types'
import { Either, left, right } from '../../utils'
import { IComponentsRepository } from '../../interfaces'
import { ServiceError } from '../../error'
import { cosmic } from '../../config'

export class CosmicService implements IComponentsRepository {
	async getComponent(
		id: string
	): Promise<Either<ServiceError, ComponentDataType>> {
		try {
			const { object }: CosmicObject = await cosmic.getObject({
				id,
			})

			const cosmicCompoent = this.mapContent(object)

			return right(cosmicCompoent)
		} catch (error) {
			return left(new ServiceError(error.status, error.message))
		}
	}

	private mapContent(cosmicComponent: CosmicComponent): ComponentDataType {
		const outComponent: ComponentDataType = {
			id: cosmicComponent.id,
			type: cosmicComponent.metadata.type,
		}

		if (cosmicComponent.metadata.value) {
			outComponent['value'] = cosmicComponent.metadata.value
		}

		if (cosmicComponent.metadata.attributes) {
			const { classname, ...rest } = cosmicComponent.metadata.attributes
			outComponent['attributes'] = {
				...rest,
				className: classname || '',
			}
		}

		if (cosmicComponent.metadata.children) {
			outComponent['children'] = []

			cosmicComponent.metadata.children.forEach(({ child }) => {
				outComponent.children.push(this.mapContent(child))
			})
		}

		return outComponent
	}
}
