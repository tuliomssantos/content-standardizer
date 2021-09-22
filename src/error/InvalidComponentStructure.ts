export class InvalidComponentStructure extends Error {
	constructor() {
		super(`Invalid component structure`)
		this.name = 'InvalidComponentStructure'
	}
}
