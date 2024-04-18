# Automation Demo Exercise

This project is an automation exercise for testing the demo website [SauceDemo](https://www.saucedemo.com) using WebdriverIO with a BDD framework using TypeScript.

## Prerequisites
- Node.js installed
- WebdriverIO installed (`npm install @wdio/cli`)

## Setup Instructions
1. Clone this repository:

    ```
    git clone https://github.com/codename-water/webdriverio-bdd-tests.git
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Configure WebdriverIO by modifying `wdio.conf.ts` according to your environment and preferences.

## Test Execution
To execute the automated tests, run the following command:

```
npx wdio wdio.conf.ts
