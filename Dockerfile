# Use PHP with Apache
FROM php:8.2-apache

# Enable Apache mod_rewrite if needed (optional)
RUN a2enmod rewrite

# Copy app source to Apache document root
COPY src/ /var/www/html/

# Expose HTTP port
EXPOSE 80
