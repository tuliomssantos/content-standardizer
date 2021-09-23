import { Component } from '../entity/Component'
import { ServiceError, InvalidComponentStructure } from '../error'
import { IComponentsRepository } from '../interfaces'
import { CosmicContentRequest } from '../types'
import { Either, left, right } from '../utils'

export class GetComponent {
  constructor(public componentRepository: IComponentsRepository) {}

  async execute({
    id,
    bucket,
    readKey,
  }: CosmicContentRequest): Promise<
    Either<ServiceError | InvalidComponentStructure, Component>
  > {
    const componentDataOrError = await this.componentRepository.getComponent({
      id,
      bucket,
      readKey,
    })

    if (componentDataOrError.isLeft()) {
      return left(componentDataOrError.value)
    }

    const componentOrError = Component.create(componentDataOrError.value)

    if (componentOrError.isLeft()) {
      return left(componentOrError.value)
    }

    return right(componentOrError.value)
  }
}
