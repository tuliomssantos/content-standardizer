import cosmicjs from 'cosmicjs'

const Cosmic = cosmicjs()

export const cosmic = Cosmic.bucket({
	slug: process.env.COSMIC_SLUG,
	read_key: process.env.COSMIC_READ_KEY,
	//	write_key: process.env.COSMIC_WRITE_KEY || 'your-bucket-write-key',
})
