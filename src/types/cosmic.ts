import { AttributeType } from '.'

export type CosmicContentRequest = {
  id: string
  bucket: string
  readKey: string
}

export type CosmicObject = {
  object: CosmicComponent
}

export type CosmicComponent = {
  id: string
  slug: string
  title: string
  content: string
  metadata: Metadata
}

type Metadata = {
  type: string
  value?: string
  attributes: AttributeType
  children?: Children[]
}

type Children = {
  child: CosmicComponent
}
