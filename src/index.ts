import { CosmicService } from './services'
import { CosmicContentRequest } from './types'
import { GetComponent } from './usecase'

export const getContentFromCosmic = async ({
  id,
  bucket,
  readKey,
}: CosmicContentRequest) => {
  const cosmicRepository = new CosmicService()

  const getComponent = new GetComponent(cosmicRepository)

  const componentOrError = await getComponent.execute({ id, bucket, readKey })

  if (componentOrError.isLeft()) {
    throw new Error(componentOrError.value.message)
  }

  return JSON.parse(JSON.stringify(componentOrError.value))
}
