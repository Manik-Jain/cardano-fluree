# cardano-fluree

An easy approach to integrate FlureeDB with Cardano blockchain in order to store and retreive the metadata on FlureeDB as a sidechain.

# Pre-requisites
1. Java v11 or above, [Download](https://www.oracle.com/ca-en/java/technologies/javase-jdk11-downloads.html) 
2. Node v14 or above, [Download](https://nodejs.org/en/download/current/)
3. npm  v6 or above , [Download](https://www.npmjs.com/get-npm)
4. wget for Linux/Mac, [Download](https://formulae.brew.sh/formula/wget#default)

# FlureeDB installation steps
Please follow the steps to download FlureeDB instance from [here](https://docs.flur.ee/docs/1.0.0/getting-started/installation).

Once the instance is running in your machine, please verify that your FlureeDB instance is up and running at the specified port.
Usually it runs at 8080. Please verify the service port from fluree_sample.properties file.

# Running the code
Please clone the master branch for most recent released changes, and execute 

``` npm run dev ```

This will download all the required npm dependencies and perform a CRUD operation lifecycle with the FlureeDB instance.
Feel free to make changes to index.js for further interactions with DB.

# Copyright
AGPL License. All rights reserved.
