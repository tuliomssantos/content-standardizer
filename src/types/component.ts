import { AttributeType } from '.'

export type ComponentDataType = {
	id: string
	type: string
	value?: string
	children?: ComponentDataType[]
	attributes?: AttributeType
}
