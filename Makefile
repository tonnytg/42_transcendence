all:
	docker-compose up --build -d

down: clean
	docker-compose down
	docker-compose rm -f

clean:
	rm -rf backend/transcendence/__pycache__
	rm -rf backend/transcendence/migrations
	rm -rf backend/transcendence/db.sqlite3