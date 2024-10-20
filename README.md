# Agira

![Agira](./public/agira-website.png)

**Agira** is a revolutionary application designed to directly connect farmers and consumers, aiming to transform the agriculture industry with a comprehensive farm listing system and blockchain incentives. The application leverages modern web technologies and blockchain services to provide a seamless and efficient experience for both farmers and consumers.

## Tech Stack

- **Frontend**: Next.js (TypeScript, React)
- **Styling**: TailwindCSS
- **Backend Services**: Juno (Blockchain-as-a-Service for ICP)
- **Authentication**: ICP Authentication (Passkey)

## Why Juno?

Juno stands out as a game-changer for decentralized application development by offering an accessible and efficient alternative to traditional ICP workflows. Unlike Azle, Juno simplifies the development and deployment of dApps on ICP by providing a suite of plug-and-play services, similar to Firebase but tailored for blockchain. This approach lowers the barrier to entry and accelerates development, making it an ideal choice for our project.

## Project Setup

To get started with Agira, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/agira-dapp.git
   cd agira-dapp
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Build the Project**

   ```bash
   npm run build
   ```

4. **Login to Juno**

   ```bash
   juno login
   ```

5. **Deploy to Juno**

   ```bash
   juno deploy
   ```

6. **Update Canister ID**

   - Open the `juno.config.ts` file in your project.
   - Replace the placeholder canister ID with your own canister ID from Juno.
   - Save the file.

   **Example:**

   ```typescript
   import { defineConfig } from "juno";

   export default defineConfig({
     satellite: {
       id: "your-own-canister-id-here",
       source: "out",
     },
   });
   ```

7. **Create Collections in Juno**

   - Go to the [Juno website](https://juno.build).
   - Create a collection named `orders`.
   - Create a collection named `cart`.
   - Create a collection named `products`.
   - Create a collection named `farmers`.

8. **Read the Juno Documentation**

   For more information on how to use Juno, visit the [Juno Documentation](https://internetcomputer.org/docs/current/developer-docs/web-apps/frameworks/juno).

## Canister ID

- **Canister ID**: mdw7w-piaaa-aaaal-ajoma-cai from `juno.config.ts`.
- **Website**: [Agira on ICP](https://mdw7w-piaaa-aaaal-ajoma-cai.icp0.io/)

## Features

### Consumer Side

- **Complete CRUD Operations**: Allows consumers to create, read, update, and delete their orders and cart items.

### Farmer Side

- **Product Management**: Farmers can now add products, manage orders, and fully access the dashboard. The wallet tab is still a work in progress (WIP).

## Known Issues

- **Redeployment Required**: Every time a product is added, the dApp needs to be redeployed due to a problem with Next.js and `@dfinity/agent`. This is discussed in detail in a [pull request](https://github.com/krlsdgzmn/agira-dapp/pull/2) by the creator of Juno.

  The PR outlines several issues related to static site generation (SSG) dynamic routing and agent-js compatibility in Next.js. Key points include:

  - The need for static export and the limitations of using `generateStaticParams` with agent-js.
  - The contradiction between the development and production behaviors in Next.js.
  - A workaround involving the creation of a script that populates a static JSON file with product data.

  The PR also suggests that building the dApp whenever data changes might be the best approach to avoid runtime issues. Special thanks to the creator of Juno for his contributions and insights.

  This issue has been raised on the [DFINITY forum](https://forum.dfinity.org/t/agent-js-does-not-work-in-next-js-ssg/34090), where discussions are ongoing for a potential solution.

## Project Description

**Agira** is dedicated to revolutionizing the agriculture industry by facilitating direct connections between farmers and consumers. With its farm listing system and blockchain-based incentives, Agira strives to provide mutual benefits for both farmers and consumers, fostering a more efficient and transparent agricultural marketplace.

## Contributing

If you would like to contribute to Agira, please follow the standard GitHub flow:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Special Thanks

A special thanks to **peterpeterparker**, the creator of Juno, for providing insights and solutions to overcome some of the challenges faced with dynamic routing in Next.js and the `@dfinity/agent` library.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Presentation

Watch the presentation of Agira: [Watch Video](https://drive.google.com/file/d/1Os4k1JXVrFNdYu59lcHFIarooiPegJwv/view?usp=sharing)

## Team Members

- Alyhanna Faith Guinto - Project Manager
- John Karlos De Guzman - Developer
- Ivan Gonzales - Multimedia Specialist
- Axl Louis Coronel - Presenter
