all:
	docker-compose up --build -d

down:
	docker-compose down

clean:
	docker-compose down --rmi local --volumes