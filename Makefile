all:
	docker-compose up --build -d

down:
	docker-compose down
	docker volume rm 42_transcendence_backend_data
	docker volume rm 42_transcendence_postgres_data

re: down all