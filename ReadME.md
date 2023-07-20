
Stockify Software Requirements Specification

1. Introduction
====================================================================================

1.1 Purpose

The purpose of this Software Requirements Document (SRD) is to define the requirements for the development of the Stockify web application. Stockify aims to provide individual investors and stock market enthusiasts with a user-friendly platform to manage their stock portfolios and stay updated with real-time data for stocks listed on the NASDAQ and NYSE stock exchange. This document outlines the system architecture and specifies the functional and non-functional requirements for the Stockify web app.

1.2 Scope

The Stockify web app will allow users to create accounts, manage their watchlist of NASDAQ and NYSE-listed stocks, and track their portfolio performance. The application will integrate with an external API to fetch real-time stock data for NASDAQ stocks. Users will be able to search for stocks, view detailed stock information. The system will provide a user-friendly interface with a responsive design, enabling access from desktop and mobile devices.

1.3 Definitions, Acronyms, and Abbreviations

- NASDAQ: The NASDAQ Stock Market, an American stock exchange that trades stocks of technology and growth companies.
- API: Application Programming Interface, a set of rules and protocols that allows different software applications to communicate with each other.
- SRD: Software Requirements Document, a document that specifies the functional and non-functional requirements of a software system.

2. System Requirements Specification
====================================================================================

2.1 Description

Stockify is a web application designed for individual investors and stock market 
enthusiasts who want to manage their stock portfolios and stay updated with real-time data for stocks listed on the NASDAQ stock exchange.

2.2 User Stories

1. As an investor, I want to create an account and log in to access my personalized portfolio.
2. As a user, I want to search for NASDAQ-listed stocks and add them to my watchlist.
3. As a user, I want to view real-time stock data for the stocks in my watchlist, including prices and percentage changes.
4. As an investor, I want to add NASDAQ stocks to my portfolio, specifying the number of shares held and purchase prices.
5. As a user, I want to track the current value of my portfolio based on real-time stock prices.
6. As a user, I want to visualize the performance of my portfolio over time through charts or graphs.
7. As a user, I want to edit or remove stocks from my watchlist and portfolio.
8. As an investor, I want to view detailed information about NASDAQ-listed stocks, such as company name, ticker symbol, sector, and recent news.

2.3 Existing Software Comparison

Currently, there are similar portfolio management platforms available, such as Yahoo Finance and TradingView. However, Stockify differentiates itself by focusing specifically on NASDAQ-listed stocks, providing a streamlined and user-friendly experience for investors interested in this market. Stockify aims to simplify the portfolio management process, offer real-time data updates, and provide a personalized dashboard for users to track their investments effectively.

2.4 Functional Requirements

1. User Registration and Authentication:
   - Users can create an account with their email and password or use third-party authentication providers (Facebook and Google).
   - Users can log in to access their personalized portfolio.
2. Watchlist Management:
   - Users can search for NASDAQ-listed stocks and add them to their watchlist.
   - Users can view real-time stock data for stocks in their watchlist.
3. Portfolio Management:
   - Users can add NASDAQ stocks to their portfolio, specifying the number of shares held and purchase prices.
   - Users can track the current value of their portfolio based on real-time stock prices.
   - Users can visualize the performance of their portfolio over time.
4. Stock Information:
   - Users can view detailed information about NASDAQ-listed stocks, including company name, ticker symbol, sector, and recent news.
5. User Access (Admin access)
   - Admin access will be created in the backend and the frontend will only show Admin Login on the landing page.
   - Admin can view each user's information, disable and enable users access.
   - Admin credentials: Email: adminuser@test.com Password: test@123

2.5 Non-functional Requirements

1. Usability:
   - The web app should have an intuitive and user-friendly interface.
   - The user interface should be responsive and accessible on different devices.
2. Performance:
   - The web app should provide real-time data updates for stock prices.
   - The system should handle concurrent user requests efficiently.
3. Security:
   - User authentication and sensitive data should be securely managed and stored.
   - Passwords should be hashed and stored securely in the database.
4. Scalability:
   - The web app should be scalable to accommodate a growing user base and increasing data volume.
   - Cloud hosting platforms should be utilized to ensure scalability and availability.
5. Integration:
   - The web app should integrate with an external API to fetch real-time stock data for NASDAQ stocks.
   - MongoDB will be integrated as the database for storing user information, watchlists, and portfolio data.

3. Conclusion

This Software Requirements Specification (SRS) provides an overview of the Stockify web app, focusing on managing portfolios and tracking real-time data for NASDAQ-listed stocks. The document outlines the system architecture, user stories, existing software comparison, and specifies the functional and non-functional requirements. It serves as a foundation for the development and implementation of the Stockify web app, ensuring that the final product meets the specified requirements and fulfills the needs of its users.

================================================================================
Expanded ReadME.

PLEASE NOTE:

Due to running out of time in my bootcamp I had to create a Minimun Vaible Product or prototype of the app which I can improve over time.

I also had to omit Facebook login because they require an App review which my take 10 days, I had already requested for an extension on my bootcamp.

===================

How To Use the App.

Prerequisites:
1. Node.js and npm should be installed on your machine.
2. MongoDB should be installed and running.

Setting up the backend (Express.js):
3. Inside the project directory, navigate to the stockify-backend.
4. Create a .env file
5. Open the `.env` file and add your enviromnent variables
   You can get an API ket from https://www.stockdata.org/ simply register and you will get an API key. The free account only has up to 100 API calls
6. Run the following command to install the dependencies:
   ```
   npm install
   ```
7. Once the installation is complete, start the backend server with the following command:
   ```
   npm start
   ```

Setting up the frontend (Next.js):
8. Open a new terminal window and navigate to the project directory.
9. Navigate to the stockify-frontend folder.
10. Run the following command to install the dependencies:
    ```
    npm install
    ```
11. Once the installation is complete, start the frontend development server with the following command:
    ```
    npm run dev
    ```

Testing the app:

12. Open a web browser and visit `http://localhost:3000` to access the Stockify app.

13. Test the various features and functionalities of the app, start by searching for a stock and then add for your portfolio or watchlist to be created.

=================

- Secure Storage of API Keys: All sensitive information, including API keys, is stored in a separate .env file. This file is not committed to the version control system, ensuring that the keys remain confidential and are not exposed to unauthorized users. 

- JWT for Route Protection: The app utilizes JSON Web Tokens (JWT) for route protection. When a user logs in, they receive a JWT token that is sent with subsequent requests to authenticate and authorize access to protected routes. 

- Next.js Authentication (next/auth): The app leverages the built-in authentication functionality provided by the Next.js framework through the next/auth package. This package simplifies the implementation of authentication mechanisms, including handling JWT tokens, managing sessions, and protecting routes. By utilizing this package, the app benefits from the security features and best practices implemented by Next.js.

==================

Third-Party API

stockdata.org is an API service that provides access to a wide range of financial market data. It offers developers and financial enthusiasts the ability to retrieve real-time and historical data for stocks, indices, commodities, currencies, and more.

===================

Testing

Backend

To run the backend tests ensure that:

- Ensure that you are in the stockify-backend directory.
- install jest and supertest (npm install jest supertest --save-dev).
- Run the tests with npm test.
- A total of 3 tests should run and pass.

Fontend

- Ensure that you are in the stockify-frontend directory.
- To set up Jest, install jest, jest-environment-jsdom, @testing-library/react, @testing-library/jest-dom (npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom).
- Add the following script in package.json
   "scripts": {
      "test": "jest"
   }
- Run the tests with npm test.
- A total tests of 2 should run and pass.

=============================