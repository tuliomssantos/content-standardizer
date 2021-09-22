import { CosmicService } from "./services";
import { GetComponent } from "./usecase";

export const getComponentFromCosmic = async (id: string) => {
  
    const cosmicRepository = new CosmicService()

    const getComponent = new GetComponent(cosmicRepository)

    const componentOrError = await getComponent.execute(id)
  
    if(componentOrError.isLeft()){
      throw new Error(componentOrError.value.message);
    }

    return componentOrError.value
};
