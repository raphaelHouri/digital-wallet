# Digital Wallet

## Running the Project

To execute the project, follow these steps:

1. Navigate to the directory containing the Docker Compose file.

2. Ensure that Docker is installed on your computer.

3. Run the following commands:

   ```bash
   docker-compose build && docker-compose up
   ```

4. import "paybox - API documentation.postman_collection" file to postmen for having all the requests ready

## System Architecture
<img width="548" alt="image" src="https://github.com/raphaelHouri/digital-wallet/assets/58934116/90cb03b0-5a82-4f48-9240-74cb80ffab9f">

### Microservices

1. **Client MS**

   - **APIs:**
     - `getUserById`: Retrieve user data from the account MS ("getUsersData" in the users collection).
     - `getWalletDeposit`: Retrieve wallet deposit data from the account MS ("getWalletData" in the wallets collection).
     - `getTransactions`: Retrieve transactions with filters (transactionType, date range, userID) from the transactions MS (transactions collection).
     - `sendTransaction`: Send transaction details to Kafka (behind the scenes, add date field) in the transactions MS ("executeTransaction").

2. **Transactions MS**

   - `executeTransaction`: Listens to the Kafka topic for incoming transactions, validates, and executes them.
   - `getTransactions`: Retrieve transactions data with filters.

3. **Account MS**

   - `getUsersData`: Retrieve user data by IDs.
   - `getWalletData`: Retrieve wallet data by wallet IDs.

4. **Notifications MS**
   - `sendNotification`: Sends notifications (REST/Kafka/RabbitMQ/Redis) for transaction and other events.

### Database Collections

**One MongoDB instance for all collections:**

1. **Users Collection (accountMS only)**

   - `userID` (unique Mongo ID)
   - `mail` (string)
   - `ID` (Taz) - string
   - `name` (string)
   - `joinedAt` (date)
   - `phoneNumber` (string)
   - `singleWalletId` (string)
   - `groupedWalletIDs` (list of strings)

2. **Transactions Collection (transactionsMS only)**

   - `userId` (user that executed the transaction)
   - `amount`
   - `ID` (transaction)
   - `status` (pending, success, rejected)
   - `dateCreated`
   - `lastUpdateDate`
   - `fromWalletId`
   - `toWalletId`

3. **Wallets Collection (accountMS + transactionsMS)**
   - `walletID`
   - `userID` (if not grouped - string)
   - `isGroupedWallet` (boolean)
   - `userIDs` (if grouped - list of strings)
   - `groupAdmin` (userID)
   - `lastUpdate`
   - `lastTransactionId` (nullable)
   - `balance`:
     - `ils`
     - `usd`
     - `euro`

### Points of Improvements

1. Consider adding more event-based implementations.
2. Separate MongoDB databases into individual instances.
3. Consider creating a wallet microservice.
4. Create modes for scaling and descaling based on CPU.
5. Implement Kafka for `sendNotification` and `sendTransaction`.

## Folder Structure for a Microservice

```plaintext
src
├── config
│   ├── db.ts
├── controllers
│   └── user.controller.ts
├── models
│   └── user.model.ts
├── routes
│   └── user.route.ts
├── utils
│   └── logger.util.ts
├── app.ts
└── .env
```
