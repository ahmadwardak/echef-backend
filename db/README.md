

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