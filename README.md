# Example project testcafe vs browserstack
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\

### `yarn e2e:local`

Executes testcafe test against a local browser (dev server must be running => yarn start)

### `yarn e2e:browserstack`

Executes testcafe test against browserstack (dev server must be running => yarn start)

The following environment variables must be set:
BROWSERSTACK_ACCESS_KEY=YOUR_BROWSERSTACK_KEY BROWSERSTACK_USERNAME=YOUR_BROWSERSTACK_USERNAME
