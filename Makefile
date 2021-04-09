drop-create:
	@echo "======== Drop Database ========"
	yarn sequelize-cli db:drop 
	@echo "==============================="
	@echo "======== Create Database ========"
	yarn sequelize-cli db:create
	@echo "================================="

init:
	@echo "======== Init Seed ========"
	yarn sequelize-cli db:seed:all
	@echo "==========================="

generate-model:
	@echo "======== Generate Model $(name)s ========>"
	yarn sequelize-cli model:generate --name $(name)s --attributes $(file_name)_id:uuid 
	@echo "=======================================>"

generate-seed:
	@echo "======== Generate Seed $(name)s ========>"
	yarn sequelize-cli seed:generate --name $(name)
	@echo "=============================================>"

migrate:
	@echo "======== MIGRATE ========"
	yarn sequelize-cli db:migrate

all: 
	make drop-create
	make migrate
	make init