# What is PostgreSQL?

PostgresQL is an ACID-compliant Object Relational Database Management System (or ORDMS)

Let break this down! 

### ACID-compliant? A set of properties that must be satisfied

A (Atomicity)
- A transaction (can be made up of more than 1 part) must be treated as a single unit, which succeeds as a whole, or fails as a whole (including errors, power failures, and crashes)

C (Consistency)
- Only "valid" data is written to the database. Valid being it meets all the rules and constraints we set (this does not always make it correct). If a trasnsaction contains "Bad" data, the database reverts to its previous state

I (Isolation)
- Transactions are independently processed at the same time without interference. Does not guerentee order.

D (Durability)
- Once committed, a transaction will remain commited

### ORDBMS?

DBMS? (Databade Management System)
- Serves as an interface between our database and our application layer. It manages our data, our data engine (which allows for accessing, locking and modiying data) and the schema. 

OR (Object Relational)
- Hybrid between object-oriented model (OODB) and relational model (RDB)
- RDB as data is stored in relational database and manipulated and accessed using queries
- OODB as objects are stored in tables of objects rather than in tables of rows and support major OO features such as complex types, inheritance, agggreagation, mathods

 data is represented in the form of objectsas obje
In ORD, the basic approach is based on RDB, since the data is stored in a traditional database and manipulated and accessed using queries written in a query language like SQL. However, ORD also showcases an object-oriented characteristic in that the database is considered an object store, usually for software that is written in an object-oriented programming

Why PostgreSQL?
- Open-source
- Strong community (free support 24/7!)
- Solid third-party support (tools for desinging, managing, and using PostgreSQL)
- Extensible (Can write procedure, aka re-using SQL code)
- Objective (ORD capabilityies with support of features like nesting!)

Why not PostgreSQL?
- Performance (read-heavy operations can be less performnt than other dbs like MySQL)
- Hosting (Less popular, so finding service providers that offer managed PostgreSQL instances.)

When PostgreSQL?
- Data integrity
- Complex, custom procedures
- Integration
- Complex Designs (Most functionalities relative to other open-source RDBMS)

When not PostgreSQL?
- Speed (fast read speed req)
- Simple set ups
- Replication (a little more complex than counterparts)


## Setting up PostgreSQL on Mac

We will be using homebrew, a Mac package manager. 
If you have don't have homebrew run: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- `/usr/bin/ruby` -> MacOSC 10.7 has a pre-install ruby interpreter
- `-e` -> specifies script to run
- `"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` -> uses curl to make a web request and download the script at the given url

Install Postgres with homebrew: `brew install postgresql`
Check version: `postgres -V`

## Using and Configuring PostgreSQL

`psql postgres` -> psql is a utiliity that lets us carry out admin functions without using SQL commands (might need sudo) 
`psql postgres -U username` -> to use psql with specific user (note #=superuser >= non superuse)
`\q` to quit
`\du` -> users in db (when installed postgres auto makes a db user that matches your username)
`\password` -> set a password to our default user

###Creating a new role (roles help control permission):

Using Queries:
- `CREATE ROLE username WITH LOGIN PASSWORD 'quoted password' [OPTIONS];` -> can only read
- `ALTER ROLE username CREATEDB;`

Using psql CLI:
- `createuser patrick --createdb`

###Creating a new db:

Using Queries:
- `CREATE DATABASE db_name`
- `GRANT ALL PRIVILEGES ON DATABASE super_awesome_application TO paatrick; postgres=> \list`

## Useful psql tools:
`createuser`: creates a user
`createdb`: creates a database
`dropuser`: deletes a user
`dropdb`: deletes a database
`postgres`: executes the SQL server itself
`pg_dump`: dumps the contents of a single database to a file
`pg_dumpall`: dumps all databases to a file

## Useful psql commands:
`list`: list all dbs in Postgres
`connect`: connect to a db
`dt`: list tables in currently connected db

## Postico
- Postgres Client for OSX, or a GUI to manage both local and remote Postgres servers

Download at: https://eggerapps.at/postico/download/

Connecting to local db: select `New Favorite` add pw, and select **Show all Databases**, click `Done` and then `Connect`



