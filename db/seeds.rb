require 'pry'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



u = User.create(email:"a@b.c",password:"12341234",password_confirmation:"12341234")
# u = User.create(email:"b@b.c",password:"12341234",password_confirmation:"12341234")
m = Subject.create(name:"math")
b = Subject.create(name:"biology")
Note.create(user:u,subject:m,name:"Hard",content:"remember it now")
Note.create(user:u,subject:m,name:"Very Hard",content:"remember this too")
Note.create(user:u,subject:b,name:"Hard too",content:"remember")
