#!/bin/bash

# Migrate database from SQLite3 to PostgreSQL
python src/manage.py makemigrations
python src/manage.py migrate

# Start Server
python src/manage.py runserver 0.0.0.0:8000
