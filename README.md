# eChef-backend

## Prerequisites

Both for the back end and front end application check

* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)

For front-end go here:

[Front-end](https://github.com/ahmadwardak/echef-frontend)

Just for the backend application:

* mongodb [official installation guide](https://docs.mongodb.org/manual/administration/install-community/)

## Setup (before first run)

Go to the backend folder:
```
git clone https://github.com/ahmadwardak/echef-backend.git
cd echef-backend/
```

**Install node dependencies**

```
npm install
```

**Set up your database**

* The default configuration in config.js points to MongoDB Atlas (cloud version) of echef database which has initial data. Alternate option is to use the dumps provided in the backup folder to restore a local version of echef as explained below:

* Create a new directory where your database will be stored (inside the echef-backend root folder, create a folder db)
* Start the database server
```
mongod --dbpath db/
```

You can use dump to restore the initial data (provided in the backup folder) as sample using mongodump. Drop echef database if already exist in your local mongodb server.

```
mongo
show dbs
use echef
db.dropDatabase()

```
In terminal access backup folder and restore the dumps using the command:

```
mongorestore

```

**Set the environment variables**

This variables are based in your local configuration
```bash
export PORT=3000
export MONGODB_URI="mongodb://localhost:27017/echef"
export JWT_SECRET="Secret0fEcH3f"
```

## Start the project

```bash
npm start
```


## Additional (Optional) MongoDB backup/restore notes


**TO CONNECT TO REMOTE MONGODB USING TERMINAL**
OPEN A NEW TERMINAL WINDOW:
Connect to remote mongodb using mongo shell command:

```
mongo "mongodb+srv://admin:masterkey@cluster0-ozdd2.mongodb.net/echef?retryWrites=true&w=majority"
```

Command to show the remote database in terminal:

```
show dbs
```

**TO BACKUP MONGODB USING MONGODUMP IN TERMINAL**
Create a directory backup in desktop and access it in terminal 

OPEN A NEW TERMINAL WINDOW
Backup using the mongodump command:

```
mongodump --uri=mongodb+srv://admin:masterkey@cluster0-ozdd2.mongodb.net/echef?retryWrites=true&w=majority
```

This will create dumps folder in backup folder. The dumps will include a backup folder for the database “echef”. The backup files will .bson and .json files

**TO RESTORE MONGOD BACKUP TO LOCAL MONGODB USING TERMINAL**
OPEN A NEW TERMINAL WINDOW
Start local mongodb 

```
mongod --dbpath db/
```
This will start local mongoldb server (running)……

OPEN A NEW TERMINAL WINDOW
Connect to mongo shell using following command:

```
mongo
```

List database command:

```
show dbs
```

Drop database if exist

```
use echef
db.dropDatabase()
```

Go to the terminal window (of backup folder), write the restore command:

```
mongorestore
```