all:
	docker-compose up --build -d

down:
	docker-compose down

clean:
	docker-compose down --rmi local --volumes

fclean: clean
	docker system prune --all --force

shell:
	@read -p "=> Enter service: " service; \
	docker-compose exec -it $$service /bin/sh

logs:
	docker-compose logs

ps:
	docker-compose ps

.PHONY: all down clean fclean shell logs ps
