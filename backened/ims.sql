create database ims;
use ims;

create table customer(cid varchar(10) primary key, name varchar(25) not null, dob date not null, gender varchar(10) not null, address varchar(50) not null, pincode int(6) not null, contact decimal(10,0) not null, mname varchar(25), fname varchar(25), email varchar(30) not null, password varchar(65) not null);

create table agent(aid varchar(10) primary key, name varchar(25) not null, gender varchar(10) not null, address varchar(50) not null, pincode int(6), contact decimal(10,0) not null, email varchar(30) not null, password varchar(65) not null);

create table policy(pid varchar(10) not null, name varchar(30) not null, duration int(3) not null, description varchar(500) not null, amount int(11) not null, ramount int(11) not null);

create table statements(tid varchar(10) primary key, cid varchar(10), pid varchar(10), amount int(11), status varchar(10) not null, duedate date not null, paydate date not null, time varchar(10) not null,foreign key(cid) references customer(cid),foreign key(pid) references policy(pid));

create table centre(cid varchar(10), pid varchar(10), aid varchar(10), amount int(11) default 0, primary key(cid,pid), foreign key(aid) references agent(aid), foreign key(cid) references customer(cid), foreign key(pid) references policy(pid));


/*Add data for all the tables using postman as id(primary key) is generated  through calling the express user defined API*/
 





