import { InvalidComponentStructure } from '../error'
import { AttributeType, ComponentDataType } from '../types'
import { Either, left, right } from '../utils'

export class Component {
  id: string
  type: string
  value: string
  children: Component[]
  attributes: AttributeType

  private constructor(componentData: ComponentDataType) {
    this.id = componentData.id
    this.type = componentData.type

    if (componentData.value) {
      this.value = componentData.value
    }

    if (componentData.attributes) {
      this.attributes = componentData.attributes
    }

    if (componentData.children) {
      this.children = []
      componentData.children.forEach(component => {
        this.children.push(new Component(component))
      })
    }
  }

  static create(
    componentData: ComponentDataType
  ): Either<InvalidComponentStructure, Component> {
    if (!Component.validate(componentData)) {
      return left(new InvalidComponentStructure())
    }
    return right(new Component(componentData))
  }

  //deve validar a estrutura inteira inclusive childrens
  static validate(componentData: ComponentDataType): boolean {
    if (!componentData.id || !componentData.type) {
      return false
    }

    if (componentData.children) {
      if (!Array.isArray(componentData.children)) {
        return false
      }

      let hasError = false

      componentData.children.forEach(component => {
        const validateResult = Component.validate(component)
        if (!validateResult) {
          hasError = true
        }
      })

      if (hasError) {
        return false
      }
    }

    return true
  }
}
