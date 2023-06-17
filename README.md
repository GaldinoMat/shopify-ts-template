# Shopify Node App Template with TypeScript and ESLint

This is a custom template created from the base Shopify Node app template, with the addition of TypeScript and ESLint. It provides all the features and functionality of the base template, while also incorporating TypeScript for static type checking and ESLint for code linting.

## Features

- Built on the Shopify Node app template, providing a solid foundation for building Shopify apps.
- Includes TypeScript for static type checking, improving code reliability and maintainability.
- Incorporates ESLint for code linting, ensuring consistent code style and identifying potential issues.
- Provides ESLint scripts for linting the app:
  - `lint:front` - Runs ESLint on the frontend code.
  - `lint:back` - Runs ESLint on the backend code.

## Getting Started

To use this template, follow these steps:

1. Clone this repository or use it as a template for your own repository.
2. Install the required dependencies using your preferred package manager. For example, if using yarn:

   ```bash
   yarn install
3. Set up your Shopify partner account and create a store for testing.

4. Configure any necessary environment variables for your app.

5. Start the development server using the appropriate command:

    ```bash
    yarn dev
This will launch the app in development mode.

## ESLint Configuration

ESLint is configured with rules and settings to ensure consistent code quality and style. The configuration file `.eslintrc.json` contains the ESLint configuration for both the frontend and backend code. You can customize the ESLint rules and settings according to your project requirements.

## Original Template
This custom template is based on the base Shopify Node app template. If you need to refer to the features and functionality provided by the base template, please visit the [original template documentation](https://github.com/Shopify/shopify-app-template-node).

## License
This project is licensed under the [MIT License](https://github.com/GaldinoMat/shopify-ts-template/blob/main/LICENSE.md). Feel free to use and modify this template to suit your needs.