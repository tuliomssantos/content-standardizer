# Content Standardizer

Receive content from different sources and serve it to other applications in a standardized way.



## Usage
### With Cosmicjs
To get content from cms Cosmicjs you will need to provide component id, bucket slug and read key.

Your components in Cosmicjs must be created in a specific way.

[How to create structured content in Cosmicjs](docs/create-content-in-cosmicjs.md)

```js
try {
    const component = await getContentFromCosmic({
      id: '...', //edit this
      bucket: '...', //edit this
      readKey: '...' //edit this
    })

    // ...
  } catch (error) {
    //...
  }
```

## Commands
```bash
 npm start # runs the project in watch mode
 npm build # bundles the package to the dist folder
 npm test # runs your tests using Jest and React Testing Library
 npm commit # commit with Commitizen
 npm release # generates a new release with changelog
```

