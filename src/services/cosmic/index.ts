import axios from 'axios'

import { Either, left, right } from '../../utils'
import { IComponentsRepository } from '../../interfaces'
import { ServiceError } from '../../error'

import {
  ComponentDataType,
  CosmicComponent,
  CosmicContentRequest,
  CosmicObjectResponse,
} from '../../types'

export class CosmicService implements IComponentsRepository {
  async getComponent({
    id,
    bucket,
    readKey,
  }: CosmicContentRequest): Promise<Either<ServiceError, ComponentDataType>> {
    try {
      const {
        data: { object },
      }: CosmicObjectResponse = await axios.get(
        `https://api.cosmicjs.com/v2/buckets/${bucket}/objects/${id}?pretty=true&read_key=${readKey}&props=slug,title,content,metadata,id`
      )

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
