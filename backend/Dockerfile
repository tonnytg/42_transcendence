FROM python:latest

# Define directory to work
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files to the container
COPY . .

# Create a new user to run the application
RUN adduser --disabled-password --gecos '' appuser && \
    chown -R appuser:appuser /app

# Change to the new user
USER appuser

# Expose the port
EXPOSE 8000

# Run the application
CMD ["bash", "entrypoint.sh"]
