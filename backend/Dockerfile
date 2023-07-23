# Use the official Python image as the base image
FROM python:3.11.4

# Create a non-root user to run the application
RUN useradd -ms /bin/bash pyslarash
USER pyslarash

# Set the working directory inside the container
WORKDIR /app

# Copy the backend files to the container
COPY . /app

# Install system dependencies
USER root
RUN apt-get update && apt-get install -y --no-install-recommends netcat-openbsd


# Install pipenv inside the container
RUN pip install pipenv

# Install Python dependencies from Pipfile.lock
RUN pipenv install --system --deploy
USER pyslarash

# Copy the .env file to the container (assuming it's in the same directory as the Dockerfile)
COPY .env /app/.env

# Expose the required port (e.g., 5000 for Flask)
EXPOSE 5000

# Start the backend using "python app.py"
CMD ["python", "app.py"]
