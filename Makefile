drop-create:
	@echo "======== Drop Database ========"
	yarn sequelize-cli db:drop --env=$(env)
	@echo "==============================="
	@echo "======== Create Database ========"
	yarn sequelize-cli db:create --env=$(env)
	@echo "================================="

init:
	@echo
	yarn sequelize-cli db:seed --seed=$(name).js

init-all:
	@echo "======== Init Seed ========"
	yarn sequelize-cli db:seed:all --env=$(env)
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
	yarn sequelize-cli db:migrate --env=$(env)

all: 
	make drop-create env=$(env)
	make migrate env=$(env)
	make init name=20210424092040-demo-interest_tag

test_init:
	make drop-create env=test
	make migrate env=test
	make init-all env=test